import * as React from 'react';
export declare var isMountedRef: React.RefObject<unknown>;
export declare var navigationRef: any;
export declare function jwtInterceptor(): void;
export declare function errorInterceptor(): void;
export declare const axiosService: {
    get: typeof get;
    post: typeof post;
    patch: typeof patch;
    Delete: typeof Delete;
    put: typeof put;
    download: typeof download;
};
declare function get(url: string): Promise<import("axios").AxiosResponse<any, any>>;
declare function post(url: any, params: any): Promise<import("axios").AxiosResponse<any, any>>;
declare function patch(url: any, params: any): Promise<import("axios").AxiosResponse<any, any>>;
declare function put(url: any, params: any): Promise<import("axios").AxiosResponse<any, any>>;
declare function Delete(url: any): Promise<import("axios").AxiosResponse<any, any>>;
declare function download(url: string, responseType?: any): Promise<import("axios").AxiosResponse<any, any>>;
export declare function send(params: {
    configType: string;
    baseurl: string;
    method: string;
    url: string;
    obj: any;
    responseType?: string;
}): Promise<any>;
export {};
