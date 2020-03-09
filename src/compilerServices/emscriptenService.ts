/* Copyright 2018 Mozilla Foundation
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { CompilerService, ServiceInput, ServiceOutput, Language, InputFile } from "./types";
import { sendRequestJSON, ServiceTypes } from "./sendRequest";
import { decodeBinary } from "./utils";
import { StringDecoder } from "string_decoder";

interface IFileContent {
  name: string;
  data?: string;
  type?: "text" | "binary";
}

interface ICompileResult {
  files: IFileContent[];
}

export class EmscriptenService implements CompilerService {

  async compile(input: ServiceInput): Promise<ServiceOutput> {
    const files = Object.values(input.files);
    const [fileRef] = Object.keys(input.files);
    const inputFile = Object.keys(input.files);
    const File = function(inputFile: string[], files: InputFile[]) {
      const compileFile = [];
      for (let i = 0; i < inputFile.length; i++) {
        const f = {
          type: inputFile[i].split(".").slice(-1)[0],
          name: inputFile[i].split("/").slice(-1)[0],
          options: input.options,
          src: files[i].content,
        };
        compileFile.push(f);
      }
      return compileFile;
    };
    const project = {
      output: "wasm",
      compress: true,
      files: File(inputFile, files)
    };
    const result = await sendRequestJSON(project, ServiceTypes.Emscripten);

    let console;
    if (result.tasks && result.tasks.length > 0) {
      console = result.tasks[0].console;
    }

    const items: any = {};
    if (result.success) {
      const output = JSON.parse(result.output) as ICompileResult;
      const textDecoder = new TextDecoder("utf8");

      for (let i = 0; i < output.files.length; i++) {
        const file = output.files[i];
        const content = await decodeBinary(file.data);

        if (file.type === "text") {
          const text = textDecoder.decode(content);
          items[file.name] = { content: text, fileRef, console };
        } else {
          items[file.name] = { content, fileRef, console };
        }
      }
    }

    return {
      success: result.success,
      console: result.message,
      items,
    };
  }
}
