export declare function useConsole(): {
    createGroup: {
        (...data: any[]): void;
        (...label: any[]): void;
    };
    endGroup: {
        (): void;
        (): void;
    };
    logMsg: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
};
