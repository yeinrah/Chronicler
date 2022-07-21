import React from 'react';
import './App.css';
import { Navbar, MeetingFooter } from './Containers';
import { SignUp, SignIn, FindEmail, FindPw, ConfirmNewPw } from './Pages';

function App() {
  return (
    <div className="App">
      <Navbar />
      <FindEmail />
      <MeetingFooter />
    </div>
  );
}

export default App;
