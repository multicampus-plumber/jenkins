import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from'./components/Navbar';
import Home from'./pages/Home';
import Jaso from'./pages/Jaso';
import Interview from'./pages/Interview';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
function App() { 
  const [mode, setMode] = useState("");

  console.log(mode)
  console.log(setMode)

  useEffect(() => {
    fetch("http://a825e3f9329ee47d493b753be8a74e7f-1673472404.ap-northeast-2.elb.amazonaws.com/authcheck")
      .then((res) => res.json())
      .then((json) => {        
        if (json.isLogin === "True") {
          setMode("WELCOME");
        }
        else {
          setMode("LOGIN");
        }
      });
  }, []); 
 
    return (
      <>
      <Router>
        <Navbar mode={mode} />
        <Routes>
          <Route exact path='/' element={<Home/>} />
          
          <Route path='/jaso' element={<Jaso />} />
          <Route path='/interview' element={<Interview />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
      </Router>
      </>
    );
}
export default App;
