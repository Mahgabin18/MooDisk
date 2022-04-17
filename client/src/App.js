//import logo from './logo.svg';
import React from "react";
// import { useState } from 'react'
// import './App.css'; 
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import WordSearch from "./components/WordSearch";
import QuerySearch from "./components/querySearch";
import Home from "./components/Home/home"
export default function App() {
return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/wordsearch" element={<WordSearch/>} />
        <Route path={`/main`} element={<MainPage />} />
        <Route path="/main2" element={<Home />} />
        <Route path = "/query" element = {<QuerySearch/>}/>

      </Routes>
    </BrowserRouter>
  );
} 



// function App() {
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
// 	const [password, setPassword] = useState('')
  
//   async function registerUser(event){
//     event.preventDefault()
//     const response = await fetch('http://localhost:1337/api/register',{
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         name,
//         email,
//         password,
//       }),
//     })
//     const data = await response.json()
//     console.log(data)
//   }
//   return (
//     <div>
//       <h1>Register</h1>   
//       <form onSubmit={registerUser}>
//         <input
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         type="text"
//         placeholder="Name"
//          /><br/>
//         <input
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         type="email"
//         placeholder="Email"
//          /><br/>
//         <input
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         type="password"
//         placeholder="Password"
//          /><br/>
//          <input type="submit" value="Register" />
//       </form>
        
//         <a href="./wordsearch.js" target="_blank">
//         <Button> Link Button </Button>
// </a>
      
//      </div>
//   );
// }

// export default App;
