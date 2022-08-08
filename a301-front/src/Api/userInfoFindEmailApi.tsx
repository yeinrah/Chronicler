import axios from 'axios';
const userInfoFindEmailApi = axios.create({
  // baseURL: `www.naver.com`,
  baseURL: `http://${window.location.hostname}:8080`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});
export default userInfoFindEmailApi;
