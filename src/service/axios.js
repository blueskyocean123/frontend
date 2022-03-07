import axios from 'axios';
import store from '../store'

// axios.defaults.baseURL = 'http://localhost:3000';
// const instance = axios.create({
//   baseURL: 'http://localhost:4036',
//   timeout: 1000
// })

// Add a request interceptor
axios.interceptors.request.use(async function (config) {
  // Do something before request is sent
  config.headers['x-access-token'] = localStorage.getItem('accessToken');
  config.headers['x-refresh-token'] = localStorage.getItem('refreshToken');
  config.headers['Content-Type'] = 'application/json';

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, async function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  console.log('에러일 경우', error);
  const errorAPI = error.config;
  if(error.response.status === 401 && errorAPI.retry === undefined && localStorage.getItem('accessToken') != null && localStorage.getItem('refreshToken') != null) {
    errorAPI.retry = true;
    console.log('토큰이 이상한 오유일 경우');
    await store.dispatch('refreshToken');
    return await axios(errorAPI);
  }
  return Promise.reject(error);
});

export default axios;