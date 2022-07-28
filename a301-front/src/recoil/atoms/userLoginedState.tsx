import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();
const userLoginedState = atom({
  key: 'userLogined',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
export default userLoginedState;
