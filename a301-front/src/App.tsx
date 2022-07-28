import React from 'react';
import { Route, Routes } from 'react-router';
import './App.css';

import {
  SignUp,
  SignIn,
  FindEmail,
  FindPw,
  ConfirmNewPw,
  MainLogined,
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
import MRTest from './Pages/MRTest/MRTest';
function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<MainNonLog />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/findemail" element={<FindEmailCard />} />
        <Route path="/findpw" element={<FindPwCard />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/MeetingRoom" element={<MeetingRoom />} />
        <Route path="/MRTest" element={<MRTest />} />
      </Routes>
    </div>
  );
}

export default App;
