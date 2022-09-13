import axios from 'axios';
import * as React from 'react';
import { getDataFromAsync } from './storageUtils';

export var isMountedRef = React.createRef();
export var navigationRef: any = React.createRef();
 
let defaultConfig: object = {
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
export function jwtInterceptor() {
  instance.interceptors.request.use(async (request) => {
    let app = getDataFromAsync('app');
    if (app && app.jwt_token) {
      request.headers
        ? (request.headers.Authorization = `Bearer ${app.jwt_token}`)
        : (request.headers = { 'Accept-Encoding': `*` });
    }
    return request;
  });
}

export function errorInterceptor() {
  instance.interceptors.response.use(undefined, async (error) => {
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
      alert(`${response.status}`)
    }

    const errorMessage = response.data;
    return errorMessage;
  });
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
};
async function get(url: string) {
  let source = axios.CancelToken.source();
  let timer = setTimeout(() => {
    source.cancel();
  }, 60 * 1000);
  let response = await instance.get(url, {
    cancelToken: source.token,
  });
  clearTimeout(timer);
  return response;
}
async function post(url: any, params: any) {
  let source = axios.CancelToken.source();
  console.log('before timer', new Date());
  let timer = setTimeout(() => {
    console.log('in timer', new Date());
    source.cancel();
  }, 60 * 1000);
  let response = await instance.post(url, params, {
    cancelToken: source.token,
  });
  clearTimeout(timer);
  return response;
}
async function patch(url: any, params: any) {
  let source = axios.CancelToken.source();
  let timer = setTimeout(() => {
    source.cancel();
  }, 60 * 1000);
  let response = await instance.patch(url, params, {
    cancelToken: source.token,
  });
  clearTimeout(timer);
  return response;
}
async function put(url: any, params: any) {
  let source = axios.CancelToken.source();
  let timer = setTimeout(() => {
    source.cancel();
  }, 60 * 1000);
  let response = await instance.put(url, params, {
    cancelToken: source.token,
  });
  clearTimeout(timer);
  return response;
}
async function Delete(url: any) {
  let source = axios.CancelToken.source();
  let timer = setTimeout(() => {
    source.cancel();
  }, 60 * 1000);
  let response = await instance.delete(url, {
    cancelToken: source.token,
  });
  clearTimeout(timer);
  return response;
}
export function send(params: {
  configType: string;
  baseurl: string;
  method: string;
  url: string;
  obj: any;
}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    let Url;
    var Params;
    if (!params || typeof params != 'object') {
      throw new Error('params is undefined or not an object');
    }
    switch (params.method) {
      case 'GET':
        Url = params.baseurl + params.url;
        get(Url)
          .then((result) => {
            console.log('resulttt', result);
            resolve(result);
          })
          .catch((err) => {
            console.log(err);

            let error = errorInterceptor();
            reject(error);
          });

        break;
      case 'POST':
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
      case 'PATCH':
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
      case 'PUT':
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
      case 'DELETE':
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
      default:
        break;
    }
  });
}
