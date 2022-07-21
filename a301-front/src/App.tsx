import React from 'react';
import './App.css';
import { Navbar } from './Containers';
import { SignUp, SignIn, FindEmail, FindPw, ConfirmNewPw } from './Pages';

function App() {
  return (
    <div className="App">
      <Navbar />
      <FindEmail />
    </div>
  );
}

export default App;
