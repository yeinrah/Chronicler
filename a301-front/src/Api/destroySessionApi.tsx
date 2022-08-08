import axios from 'axios';
let url = '';
if (window.location.hostname === 'localhost') {
  url = `http://localhost:4443`;
} else {
  url = `http://${window.location.hostname}`;
}
const destroySessionApi = axios.create({
  // baseURL: `www.naver.com`,
  baseURL: url,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});
export default destroySessionApi;
