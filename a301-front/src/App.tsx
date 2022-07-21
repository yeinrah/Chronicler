import React from 'react';
import './App.css';
import { Navbar } from './Containers';
import { SignUp, SignIn } from './Pages';

function App() {
  return (
    <div className="App">
      <Navbar />
      <SignUp />
    </div>
  );
}

export default App;
