//import logo from './logo.svg';
import React from "react";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./styling/Login.css"

function Login() {
  const navigate = useNavigate();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
  useEffect(() => {
    document.body.style.backgroundColor =" #f399ff";
  })
  async function registerUser(event){
    event.preventDefault()
    const response = await fetch('http://localhost:1337/api/register',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
    const data = await response.json()
    console.log(data)
    window.location.href = '/wordsearch'
    
  }

  
  return (
    <div>
      <h1>New here?</h1>   
      <div className="reggg">
      <form onSubmit={registerUser}>
        <input id="textboxid"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Name"
         /><br/>
        <input id="textboxid"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
         /><br/>
        <input id="textboxid"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
         /><br/>
         <input type="submit" value="Register" className="m"/>
      </form>
      <img class="suncloud"src={require("../images/suncloud.png") }/>
      {/* BUTTON TO GO NAVIGATE TO THE WORD SEARCH PAGE & MAIN*/}
      <p >
        <button className="v" onClick={() => navigate("/login") }>Login</button>
      </p>
      <p>
        <button className="z" onClick={() => navigate("/userpage")}>User Page</button>
      </p>
     </div>
     </div>
  );
}

export default Login;
