import React from 'react'
import Login from './Components/Login/Login'
import SignupPage from './Components/signup/SignupPage';
import todolist from "./Components/to-do-list/Todolist"
import {BrowserRouter, Route, Routes} from 'react-router-dom';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes> 
        <Route path = "/login" exact Component={Login}></Route>
        <Route path = "/signup" exact Component={SignupPage}></Route>
        <Route path = "/application" exact Component={todolist}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App