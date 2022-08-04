import axios from 'axios';
const destroySessionApi = axios.create({
  // baseURL: `www.naver.com`,
  baseURL: `http://localhost:4443`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});
export default destroySessionApi;
