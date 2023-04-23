import React from 'react'
import Register from './Register'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  Navigate
} from "react-router-dom";
import Login from './Login';
import App from './App';
import Lead from './Lead';
const Demo=()=>{
  
    return(
        <Router>
            <Routes>
              <Route path='/' element={<Register></Register>}></Route>
             <Route path='/login' element={<Login></Login>}></Route>
             <Route path='/home' element={<Protected><App></App></Protected>}></Route>
             <Route path='/lead' element={<Protected><Lead></Lead></Protected>}></Route>
            </Routes>
        </Router>
    )
}
export default Demo
export function Protected({children}){
  if(localStorage.getItem('pos-user')){
    return children
  }
  else{
    return <Navigate to="/login"></Navigate>
  }
}