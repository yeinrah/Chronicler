import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();
const userInfoState = atom({
  key: 'uid',
  default: '{}',
  effects_UNSTABLE: [persistAtom],
});
export default userInfoState;
