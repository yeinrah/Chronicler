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
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<MainNonLog />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/findemail" element={<FindEmailCard />} />
        <Route path="/findpw" element={<FindPwCard />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {/* <MeetingRoom /> */}
    </div>
  );
}

export default App;
