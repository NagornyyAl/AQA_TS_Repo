export interface ConfigFile {
    api: {
        officialJokeApi: {
            baseUrl: string;
        };
    };
    request: {
        timeoutMs: number;
    };
}
