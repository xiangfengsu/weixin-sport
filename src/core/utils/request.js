import axios from "axios";
import Vue from "vue";
import qs from "qs";
import { Toast } from "vant";
import router from "@/core/common/router";
import { parseLoactionSearch } from "../utils/utils";
Vue.use(Toast);

const { VUE_APP_DOMAIN } = process.env;
const domain = VUE_APP_DOMAIN;
const codeMessage = {
  200: "服务器成功返回请求的数据",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据,的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器",
  502: "网关错误",
  503: "服务不可用，服务器暂时过载或维护",
  504: "网关超时"
};

function checkStatus(response) {
  const { status, statusText } = response;
  if (status > 300) {
    const errortext = codeMessage[status] || statusText;
    console.log("error");
  }

  if (status <= 504 && status >= 500) {
    router.push({
      path: "/exception/500"
    });
    return;
  }
  if (status >= 404 && status < 422) {
    router.push({
      path: "/exception/404"
    });
    return;
  }
  if (status === 401) {
    router.push({
      path: "/user/login"
    });
  }
}
export default function request(url, options = {}) {
  const defaultOptions = {
    withCredentials: true
  };
  const code = parseLoactionSearch() ;
  console.log("code", code);

  if (!options.method || (options.method && options.method.toLocaleUpperCase() === "GET")) {
    const { params = {} } = options;
    Object.assign(options, {
      params: { ...params, ...code }
    });
  } else if (!options.method || (options.method && options.method.toLocaleUpperCase() === "POST")) {
    const { data = {}, headers = {} } = options;
    const formaterData = { ...data, ...code };
    Object.assign(options, {
      data: qs.stringify(formaterData),
      headers: { ...headers, "Content-Type": "application/x-www-form-urlencoded" }
    });
  }

  const newOptions = {
    ...defaultOptions,
    ...options
  };
  return axios({
    url: `api${url}`,
    baseURL: domain,
    ...newOptions
  })
    .then((response = {}) => {
      const { data = {} } = response;
      const { code, msg } = data;
      if (code !== 100) {
        if (code === 401) {
          router.push({
            path: "/user/login"
          });
        } else {
          Toast.fail(msg);
        }
      }
      return data;
    })
    .catch(e => {
      if (e.response) {
        checkStatus(e.response);
      }
    });
}
