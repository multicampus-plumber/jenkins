import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from'./components/Navbar';
import Home from'./pages/Home';
import Jaso from'./pages/Jaso';
import Interview from'./pages/Interview';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
function App() { 
 
    return (
      <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          
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
