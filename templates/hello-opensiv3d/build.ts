import * as gulp from "gulp";
import { Service, project } from "@wasm/studio-utils";

gulp.task("build", async () => {
  const data = await Service.compileFiles([
    project.getFile("src/main.cpp"),
    ], "cpp", "wasm", "-Wall -std=c++17 -O2 -include-pch /include/OpenSiv3D/Siv3D.O2.pch -I/include/OpenSiv3D -I/include/OpenSiv3D/ThirdParty -s MAIN_MODULE=1 -s FORCE_FILESYSTEM=1 -s ALLOW_MEMORY_GROWTH=1 -s FULL_ES3=1 -s USE_GLFW=3");
  const outWasm = project.newFile("src/main.wasm", "wasm", true);
  outWasm.setData(data["a.wasm"]);
  const outJS = project.newFile("src/main.js", "javascript", true);
  outJS.setData(data["wasm_bindgen.js"]);
});

gulp.task("default", ["build"], async () => {});

gulp.task("project:load", async () => {
  logLn("Downloading Siv3D.wasm...");
  const siv3DWasmFile = project.newFile("src/Siv3D.wasm", "wasm", true);
  const siv3DWasm = await (await fetch("https://siv3d-assets.kamenokosoft.com/lib/Siv3D.wasm")).arrayBuffer();
  siv3DWasmFile.setData(siv3DWasm);
  logLn("Successfully Downloaded Siv3D.wasm");
});
