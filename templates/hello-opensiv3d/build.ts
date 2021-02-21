import * as gulp from "gulp";
import { Service, project } from "@wasm/studio-utils";

gulp.task("build", async () => {
  const data = await Service.compileFiles([
    project.getFile("src/main.cpp"),
    ], "cpp", "wasm", "-Wall -std=c++17 -O2 -include-pch /include/OpenSiv3D/Siv3D.O2.pch -I/include/OpenSiv3D -I/include/OpenSiv3D/ThirdParty -s SIDE_MODULE=1");
  const outWasm = project.newFile("src/main.wasm", "wasm", true);
  outWasm.setData(data["a.wasm"]);
});

gulp.task("default", ["build"], async () => {});
