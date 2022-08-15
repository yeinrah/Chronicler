import axios from 'axios';
let url = '';
if (window.location.hostname === 'localhost') {
  url = `http://localhost:8080/api`;
} else {
  url = `http://${window.location.hostname}/api`;
}
const requestEmailCode = axios.create({
  // baseURL: `www.naver.com`,
  baseURL: url,
  timeout: 3000000000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});
export default requestEmailCode;
