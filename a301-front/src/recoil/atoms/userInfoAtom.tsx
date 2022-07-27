import { atom } from 'recoil';
const userInfoState = atom({
  key: 'uid',
  default: '{}',
});
export default userInfoState;
