import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();
const showNavState = atom({
  key: 'nav',
  default: 'true',
  effects_UNSTABLE: [persistAtom],
});
export default showNavState;
