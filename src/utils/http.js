/**
 *
 * 通用http调用类
 * 默认情况下此类已在Global中注册， 代码中可直接调用 $http
 *
 * 演示代码
 options 参数可不传，options 默认值为
 {
    showLoading： true,   // 是否再发送请求时显示等待符;  如不需要显示，或需要自定义等待则可传false
    showError: true       // 是否在出现错误时，提示错误信息;  如需要自定义错误信息，则可传false
 }

 // Get请求
 $http.get(url, params, options);
 -- 例子
 $http.get('/api/name', {id: 100});
 $http.get('/api/name', {id: 100}, {showLoading: false});

 // Post请求
 $http.post(url, params, options);
 -- 例子
 $http.post('/api/name/update', {id: 100, name:'dev'});

 // Post Form请求 (此方法目前只有登录中用到，其它地方可暂时不用）
 $http.postForm(url, params, options);
 -- 例子
 $http.postForm('/api/login', {account: 'admin', password:'123456'});

 */

'use strict';

import axiosDefault from 'axios';
import { Message } from 'element-ui'
import store from '@/store'
import $vx from '@/utils/vx';

var axios = axiosDefault.create(
  {
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 5000                  // 请求超时时间
  }
);
// request拦截器
axios.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    config.headers['X-Token'] = $vx.localStorage.getItem('token') // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  // console.log(error) // for debug
  Promise.reject(error)
});
import NProgress from 'nprogress'
var _ = require('underscore');
var MAX_RETRIEVE_COUNT = 3;
var noop = () => {};

var $httpHelper = {
  wrapHostForUrl(url) {
    // return ( url.indexOf('/') == 0 )? config.api.host + url : url;
    return url;
  },

  setDefaultHeaders(options) {
    var defaultHeader = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-Requested-By': 'ms',
      'Accept-Language': 'zh-CN'
      // 'X-Requested-By': 'VueClient'
      //'X-MobileAPI-SessionToken': null,
      //'X-CSRF-Token': null,
      //'X-Basebit-UserId': null,
      //'Accept-Language': 'zh-CN'

    }

    if (options.method && options.method.toLowerCase() != 'get') {
      options.headers = options.headers || {};
      options.headers['Accept'] =  options.headers['Accept'] || 'application/json';
      options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
    }
    options.headers = _.extend(defaultHeader, options.headers);
    options.credentials = 'same-origin';  // 保证传送cookie
    return options;
  },

  setAuthorizationHeader(options) {
    options.headers = options.headers || {};
    return options;
  },

  setDefaultBody(options) {
    if (options.method && options.method.toLowerCase() != 'get') {
      options.body = options.body || {};
      if (options.headers['Content-Type'].toLowerCase() == 'application/json') {
        options.body = JSON.stringify(options.body);
      }
    }
    return options;
  },

  paramify(obj) {
    var str = '';
    for (var key in obj) {
      if (str != '') {
        str += '&';
      }
      str += key + '=' + obj[key];
    }
    return str;
  }
};


class Http {

  status(response) {
    //console.log(response)
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    }else if(response.status == 404){
      throw 'Api not found'
    }
    throw response;
  };
  //
  // json(response) {
  //   return response.json();  //attention: response.json() returns a promise but not a json object
  // };

  request(options) {

    // console.log(options)
    // $log.debug('$http start ', url, options.body);
    options = options ? options : {};
    options.retrieveCount = (options.retrieveCount || 0) + 1;
    options.showLoading = (options.showLoading == null)?true:options.showLoading;
    options.showError = (options.showError == null)?true:options.showError;
    options.skipToken = options.skipToken || false;
    options.skipUser = options.skipUser || false;
    options = $httpHelper.setDefaultHeaders(options);
    options = $httpHelper.setDefaultBody(options);

    var url = $httpHelper.wrapHostForUrl(options.url);

    return new Promise((resolve, reject) =>{
      resolve = resolve || noop;
      reject = reject || noop;

      options = $httpHelper.setAuthorizationHeader(options);

      if(options.showLoading){
        NProgress.start();
      }

      axios.request(options)
      // .then(this.status)
        .then((result) => {
          if(options.showLoading){
            NProgress.done();
          }
          // return resolve(result);
          if(result.status == 200){
            var rspData = result.data;
            if( rspData && rspData.hasOwnProperty('status')){
              if(rspData.status == 200){
                resolve(rspData);
              }else if(rspData.status == 0){
                alert(rspData.msg)
                store.dispatch('LogOut').then(() => {
                  location.reload()// 为了重新实例化vue-router对象 避免bug
                })
              } else{
                reject(rspData);
              }
            }else{
              resolve(rspData)
            }

          }
        })
        .catch((error) => {
          if(options.showLoading){
            NProgress.done();
          }

          let errRst = {status: 1, msg: 'error'};
          if(_.isString(error)){
            errRst = {status: 1, msg: error};
          } else if (error.status || error.msg) {
            errRst = error;
          } else if (error.code && error.code === "ECONNABORTED"){
            errRst = {status: error.code, msg:"连接超时"}; //TBD
          } else {
            try {
              let rsp = error.response;
              if(rsp && rsp.data && rsp.data.msg){
                errRst = rsp.data;
              } else if(rsp && rsp.statusText) {
                errRst = {status: error.errcode, msg:error.statusText};
              }
            } catch (e) {
              errRst = {status: 9999, msg:JSON.stringify(error)};
            }
          }

          if(options.showError){
            //$ui.showError(errRst.message);
          }

          reject(errRst);

        });
    })
  };

  get(url, params, options) {
    options = options ? options : {};
    options.method = 'GET';
    options.url = url;
    options.params = params;

    return this.request(options);
  };

  post(url, data, options) {
    options = options ? options : {};
    options.method = 'POST';
    options.url = url;
    options.params = data;
    return this.request(options);
  };

  put(url, data, options) {
    options = options ? options : {};
    options.method = 'PUT';
    options.url = url;
    options.data = data;
    return this.request(options);
  };

  patch(url, data, options) {
    options = options ? options : {};
    options.method = 'PATCH';
    options.url = url;
    options.data = data;
    return this.request(options);
  };

  delete(url, options) {
    options = options ? options : {};
    options.method = 'DELETE';
    options.url = url;
    return this.request(options);
  };

  postForm(url, data, options) {
    options = options ? options : {};
    options.method = 'POST';
    options.headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    options.url = url;
    options.data = $httpHelper.paramify(data);
    return this.request(options);
  };

};

export default new Http;

