import axios from 'axios';
const accessToken: any = localStorage.getItem('access-token');
const userInfoUpdateImage = axios.create({
  // baseURL: `www.naver.com`,
  baseURL: `http://${window.location.hostname}:8080`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'access-token': accessToken,
  },
});
export default userInfoUpdateImage;
