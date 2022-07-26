import axios from 'axios';
const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSJ9.kgmQCJdeoGuhqU968BICtotdsRwlq_-qZXNH5OdjUEE';
const userInfoUpdatePassword = axios.create({
  // baseURL: `www.naver.com`,
  baseURL: `http://localhost:8080`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'access-token': accessToken,
  },
});
export default userInfoUpdatePassword;
