import React from 'react';
import { Route, Routes } from 'react-router';
import './App.css';

import Navbar from './Containers/Navbar/Navbar';
import MainLogined from './Pages/MainLogined/MainLogined';
import MainNonLog from './Pages/MainNonLog/MainNonLog';
import MyPage from './Pages/MyPage/MyPage';
import { SignUp, SignIn, FindEmail, FindPw, ConfirmNewPw } from './Pages';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<MainNonLog />} />
        <Route path="/signup" element={<SiginUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
