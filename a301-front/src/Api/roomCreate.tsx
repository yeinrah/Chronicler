import axios from 'axios';
const accessToken: any = localStorage.getItem('access-token');
const roomCreate = axios.create({
  // baseURL: `www.naver.com`,
  baseURL: `http://localhost:8080`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'access-token': accessToken,
  },
});
export default roomCreate;