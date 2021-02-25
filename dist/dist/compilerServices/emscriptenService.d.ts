import { CompilerService, ServiceInput, ServiceOutput } from "./types";
export declare class EmscriptenService implements CompilerService {
    compile(input: ServiceInput): Promise<ServiceOutput>;
}
