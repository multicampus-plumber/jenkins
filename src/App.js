import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from'./components/Navbar';
import Home from'./pages/Home'; // 추가 된 내용
import Jaso from'./pages/Jaso';
import Resume from'./pages/Resume';

function App() {

    return (
      <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          
          <Route path='/jaso' element={<Jaso />} />
          <Route path='/resume' element={<Resume />} />
        </Routes>
      </Router>
      </>
    );
}
export default App;