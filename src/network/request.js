import axios from "axios";

export function request(config){
  //创建实例
  const instance = axios.create({
    baseURL:'http://152.136.185.210:7878/api/hy66',
    timeout:5000
  })
  //axios的拦截器
  //什么时候会用到拦截器？----1.比如config中一些不符合服务器的要求
  //2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标
  //3.某些网络请求，比如登录（token）,必须携带一些特殊的信息
  //请求拦截
  // instance.interceptors.request.use(config => {
  //   console.log(config);
  //   return config//必须返回,否则config被拦截后，无法拿到config
  // },err => {
  //   console.log(err)
  // })
  //响应拦截
  // instance.interceptors.response.use(res => {
  //   return res.data
  // },err=>{
  //   console.log(err)
  // })
  //instance(config)本身返回Promise
  return instance(config)
}
