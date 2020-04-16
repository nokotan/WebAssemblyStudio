/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/publicdomain/zero/1.0/ */

const sendRequestJSON = jest.fn();
const decodeBinary = jest.fn();

jest.mock("../../src/compilerServices/sendRequest", () => ({
  sendRequestJSON,
  ServiceTypes: { Emscripten: 3 }
}));

jest.mock("../../src/compilerServices/utils", () => ({
  decodeBinary: decodeBinary.mockImplementation((args) => args)
}));

import { EmscriptenService } from "../../src/compilerServices/emscriptenService";

describe("Tests for emscriptenService", () => {
  afterAll(() => {
    jest.unmock("../../src/compilerServices/sendRequest");
    jest.unmock("../../src/compilerServices/utils");
  });
  it("should compile C/Cpp -> Wasm", async () => {
    const console = { log: jest.fn() };
    sendRequestJSON.mockImplementation(() => ({
      success: true,
      output:
        `{ "files": [
            { "name": "a.wasm", "data": "out", "type": "binary" },
            { "name": "a.js", "data": "out", "type": "text" }
        ] }`,
      tasks: [{ file: "a.c", console }],
      message: "response-message"
    }));
    const emscriptenService = new EmscriptenService();
    const input = { files: { "a.c": { content: "a" }}, options: "options"};
    const output = await emscriptenService.compile(input);
    expect(sendRequestJSON).toHaveBeenCalledWith({
      output: "wasm",
      compress: true,
      files: [{ type: "c", name: "a.c", options: "options", src: "a" }],
      link_options: "options"
    }, 3);
    expect(decodeBinary).toHaveBeenCalledTimes(2);
    expect(decodeBinary).toHaveBeenCalledWith("out");
    expect(output).toEqual({
      success: true,
      items: {
        "a.wasm": { content: "out" },
        "a.js": { content: "out" },
        "a.c": { fileRef: "a.c", console }
      },
      console: "response-message"
    });
  });
  it("should handle errors during compilation", async () => {
    decodeBinary.mockClear();
    sendRequestJSON.mockImplementation(() => ({ success: false, message: "error", tasks: [] }));
    const emscriptenService = new EmscriptenService();
    const input = { files: { "a.c": { content: "a" }}, options: "options"};
    const output = await emscriptenService.compile(input);
    expect(decodeBinary).not.toHaveBeenCalled();
    expect(output).toEqual({
      success: false,
      items: {},
      console: "error"
    });
  });
  it("should compile C/Cpp -> Wasm when trying to compile more than one file", async () => {
    decodeBinary.mockClear();
    sendRequestJSON.mockImplementation(() => ({
      success: true,
      output:
        `{ "files": [
            { "name": "a.wasm", "data": "out", "type": "binary" },
            { "name": "a.js", "data": "out", "type": "text" }
        ] }`,
      tasks: [{ file: "a.c", console }, { file: "b.c", console }],
      message: "response-message"
    }));
    const emscriptenService = new EmscriptenService();
    const input = { files: { "a.c": { content: "a" },  "b.c": { content: "b" }}, options: "options" };
    const output = await emscriptenService.compile(input);
    expect(sendRequestJSON).toHaveBeenCalledWith({
      output: "wasm",
      compress: true,
      files: [
        { type: "c", name: "a.c", options: "options", src: "a" },
        { type: "c", name: "b.c", options: "options", src: "b" }
      ],
      link_options: "options"
    }, 3);
    expect(decodeBinary).toHaveBeenCalledTimes(2);
    expect(decodeBinary).toHaveBeenCalledWith("out");
    expect(output).toEqual({
      success: true,
      items: {
        "a.wasm": { content: "out" },
        "a.js": { content: "out" },
        "a.c": { fileRef: "a.c", console },
        "b.c": { fileRef: "b.c", console },
      },
      console: "response-message"
    });
  });
});
