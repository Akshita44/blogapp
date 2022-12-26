import './App.css';
import Navbar from "./Navbar"
import Home from "./Home" 
import Singlepost from "./Singlepost"
import Write from './write';
import Settings from './Settings';
import Login from "./Login"
import Register from './register';
import React, { useEffect, useReducer, useState } from 'react';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import reducer,{ initialState } from './reducer';
export const Context=React.createContext()

function App() {
  const check=async()=>{
        const res=await fetch("/auth/getdata",{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        });
        if(res.status === 200)
        {
          const d=await res.json()
          console.log(d);
          dispatch({
            type:"Login",
            payload:d
          })            
        }
        dispatch({
          type:"Set",
          payload: {add:document.URL}
        })
}
useEffect(()=>{
    check();
},[])
const [state,dispatch]=useReducer(reducer,initialState)
const [isLoading,setisLoading]=useState(false)
console.log(state);
  return (
    <>
    <Context.Provider value={{state,dispatch,isLoading,setisLoading}}>
    <Router>
    <Navbar/>
    <Switch>
    <Route exact path="/">
        <Home/>
        </Route>
        <Route exact path="/write">
          <Write/>
        </Route>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path="/register">
          <Register/>
        </Route>
        <Route exact path="/about">
          <Settings/>
        </Route>
        <Route exact path="/singlepost/:id">
          <Singlepost/>
        </Route>
      </Switch>
    </Router>
    </Context.Provider>
    </>
  );
}

export default App;
