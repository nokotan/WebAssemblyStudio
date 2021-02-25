export interface IConfig {
    serviceUrl: string;
    clang: string;
    rustc: string;
    cargo: string;
    emscripten: string;
    templates: {
        [name: string]: string;
    };
}
export default function getConfig(): Promise<IConfig>;
