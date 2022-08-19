import React from 'react';
import { Route, Routes } from 'react-router';
import './App.css';

import {
  SignUp,
  SignIn,
  FindEmail,
  FindPw,
  ConfirmNewPw,
  MainNonLog,
  MyPage,
  MeetingRoom,
} from './Pages';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import {
  Navbar,
  MeetingFooter,
  FindEmailCard,
  FindPwCard,
  VideoPlayer,
} from './Containers';
import { useRecoilState } from 'recoil';
import showNavState from './recoil/atoms/showNavState';
import InitialPage from './Components/InitialPage';
function App() {
  const [isShownNavState, setIsShownNavState] =
    useRecoilState<any>(showNavState);
  return (
    <div className="App">
      {isShownNavState ? <Navbar /> : ''}
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/main" element={<MainNonLog />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/findemail" element={<FindEmailCard />} />
        <Route path="/findpw" element={<FindPwCard />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/MeetingRoom" element={<MeetingRoom />} />
      </Routes>
    </div>
  );
}

export default App;
