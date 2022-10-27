"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = exports.axiosService = exports.errorInterceptor = exports.jwtInterceptor = exports.navigationRef = exports.isMountedRef = void 0;
const axios_1 = __importDefault(require("axios"));
const React = __importStar(require("react"));
const storageUtils_1 = require("./storageUtils");
exports.isMountedRef = React.createRef();
exports.navigationRef = React.createRef();
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
let instance = axios_1.default.create(defaultConfig);
let config = "standardConfig";
function jwtInterceptor() {
    instance.interceptors.request.use((request) => __awaiter(this, void 0, void 0, function* () {
        let app = (0, storageUtils_1.getDataFromAsync)('app');
        if (app && app.jwt_token) {
            request.headers && config == "standardConfig"
                ? (request.headers.Authorization = `Bearer ${app.jwt_token}`)
                : (request.headers = { "Accept-Encoding": `*` });
        }
        return request;
    }));
}
exports.jwtInterceptor = jwtInterceptor;
function errorInterceptor() {
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
exports.errorInterceptor = errorInterceptor;
// async function jwt_Initialize(token: any) {
//   await saveDataToAsync(storageParentKeys.app, 'jwt_token', token);
// }
exports.axiosService = {
    get,
    post,
    patch,
    Delete,
    put,
    download
};
function get(url) {
    return __awaiter(this, void 0, void 0, function* () {
        let source = axios_1.default.CancelToken.source();
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
        let source = axios_1.default.CancelToken.source();
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
        let source = axios_1.default.CancelToken.source();
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
        let source = axios_1.default.CancelToken.source();
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
        let source = axios_1.default.CancelToken.source();
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
function send(params) {
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
exports.send = send;
//# sourceMappingURL=serviceRequest.js.map