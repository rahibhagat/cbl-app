var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
import * as React from 'react';
import { getDataFromAsync } from './storageUtils';
export var isMountedRef = React.createRef();
export var navigationRef = React.createRef();
let defaultConfig = {
    // timeout: 30000, //100000,
    headers: {
        'Authorization': ``,
        'Accept': 'application/json',
        'X-Ca-Key': '24580493',
        'headerName': 'consoleClientHeaderName',
        'X-Ca-Stage': 'RELEASE',
        'Accept-Encoding': `*`,
    },
};
let instance = axios.create(defaultConfig);
let config = "standardConfig";
export function jwtInterceptor() {
    instance.interceptors.request.use((request) => __awaiter(this, void 0, void 0, function* () {
        let app = getDataFromAsync('app');
        if (app && app.jwt_token) {
            request.headers && config == "standardConfig"
                ? (request.headers.Authorization = `Bearer ${app.jwt_token}`)
                : (request.headers = { "Accept-Encoding": `*` });
        }
        return request;
    }));
}
export function errorInterceptor() {
    instance.interceptors.response.use(undefined, (error) => __awaiter(this, void 0, void 0, function* () {
        const { response } = error;
        if (!response) {
            // network error
            console.error(error);
            return;
        }
        if ([401, 403].includes(response.status)) {
            // auto logout if 401 or 403 response returned from api
            // accountService.logout();
            // await RefreshToken();
            alert(`${response.status}`);
        }
        const errorMessage = response.data;
        return errorMessage;
    }));
}
// async function jwt_Initialize(token: any) {
//   await saveDataToAsync(storageParentKeys.app, 'jwt_token', token);
// }
export const axiosService = {
    get,
    post,
    patch,
    Delete,
    put,
    download
};
function get(url) {
    return __awaiter(this, void 0, void 0, function* () {
        let source = axios.CancelToken.source();
        let timer = setTimeout(() => {
            source.cancel();
        }, 60 * 1000);
        let response = yield instance.get(url, {
            cancelToken: source.token,
        });
        clearTimeout(timer);
        return response;
    });
}
function post(url, params) {
    return __awaiter(this, void 0, void 0, function* () {
        let source = axios.CancelToken.source();
        console.log('before timer', new Date());
        let timer = setTimeout(() => {
            console.log('in timer', new Date());
            source.cancel();
        }, 60 * 1000);
        let response = yield instance.post(url, params, {
            cancelToken: source.token,
        });
        clearTimeout(timer);
        return response;
    });
}
function patch(url, params) {
    return __awaiter(this, void 0, void 0, function* () {
        let source = axios.CancelToken.source();
        let timer = setTimeout(() => {
            source.cancel();
        }, 60 * 1000);
        let response = yield instance.patch(url, params, {
            cancelToken: source.token,
        });
        clearTimeout(timer);
        return response;
    });
}
function put(url, params) {
    return __awaiter(this, void 0, void 0, function* () {
        let source = axios.CancelToken.source();
        let timer = setTimeout(() => {
            source.cancel();
        }, 60 * 1000);
        let response = yield instance.put(url, params, {
            cancelToken: source.token,
        });
        clearTimeout(timer);
        return response;
    });
}
function Delete(url) {
    return __awaiter(this, void 0, void 0, function* () {
        let source = axios.CancelToken.source();
        let timer = setTimeout(() => {
            source.cancel();
        }, 60 * 1000);
        let response = yield instance.delete(url, {
            cancelToken: source.token,
        });
        clearTimeout(timer);
        return response;
    });
}
function download(url, responseType) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield instance.get(url, {
            responseType: responseType,
        });
        return response;
    });
}
export function send(params) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        let Url;
        var Params;
        config = params.configType;
        if (!params || typeof params != 'object') {
            throw new Error('params is undefined or not an object');
        }
        switch (params.method) {
            case "GET":
                Url = params.baseurl + params.url;
                get(Url)
                    .then((result) => {
                    console.log("resulttt", result);
                    resolve(result);
                })
                    .catch((err) => {
                    console.log(err);
                    let error = errorInterceptor();
                    reject(error);
                });
                break;
            case "POST":
                Url = params.baseurl + params.url;
                Params = params.obj;
                post(Url, Params)
                    .then((result) => {
                    resolve(result);
                })
                    .catch((err) => {
                    console.log(err);
                    let error = errorInterceptor();
                    reject(error);
                });
                break;
            case "PATCH":
                Url = params.baseurl + params.url;
                Params = params.obj;
                patch(Url, Params)
                    .then((result) => {
                    resolve(result);
                })
                    .catch((err) => {
                    console.log(err);
                    let error = errorInterceptor();
                    reject(error);
                });
                break;
            case "PUT":
                Url = params.baseurl + params.url;
                Params = params.obj;
                put(Url, Params)
                    .then((result) => {
                    resolve(result);
                })
                    .catch((err) => {
                    console.log(err);
                    let error = errorInterceptor();
                    reject(error);
                });
                break;
            case "DELETE":
                Url = params.baseurl + params.url;
                Delete(Url)
                    .then((result) => {
                    resolve(result);
                })
                    .catch((err) => {
                    console.log(err);
                    let error = errorInterceptor();
                    reject(error);
                });
                break;
            case "DOWNLOAD":
                Url = params.url;
                download(Url, params === null || params === void 0 ? void 0 : params.responseType)
                    .then((result) => {
                    resolve(result);
                })
                    .catch((err) => {
                    console.log(err);
                    let error = errorInterceptor();
                    reject(error);
                });
                break;
            default:
                break;
        }
    }));
}
//# sourceMappingURL=serviceRequest.js.map