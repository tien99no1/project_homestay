import React from 'react';
import './App.css';
import Layout from './components/layout/';
import Home from './pages/Home';
import Login from './pages/Login';
import Guide from './pages/Guide';
import Host from './pages/Host';
import SignUp from './pages/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
   
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Layout/>}>
          <Route path='' element={<Home/>}/>
        </Route>
        
        <Route path='/Guide' element={<Guide/>}/>
        <Route path='/Host' element={<Host/>}/>
        <Route path='/SignIn' element={<SignUp/>}/>
        <Route path='/Login' element={<Login/>}/>
      
      </Routes>
        

    </BrowserRouter>
  )
}

export default App;
