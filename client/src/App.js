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
import { MainPage } from "./components/MainPage";
import WordSearch from "./components/WordSearch";
import QuerySearch from "./components/querySearch";
import Home from "./components/Home/home"
import FavoritesPage from "./components/FavoritesPage";
export default function App() {
  
  if(!localStorage.getItem('favoriteImages')){
    localStorage.setItem('favoriteImages', '');
  } else if(typeof(JSON.parse(localStorage.getItem('favoriteImages'))) != 'object'){
    localStorage.setItem('favoriteImages', '');
  } else{
    let images = JSON.parse(localStorage.getItem('favoriteImages'));
    if(images[0].urls === undefined || images[0].id === undefined || images[0].user === undefined){
      localStorage.setItem('favoriteImages', '');
    }
  }

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/wordsearch" element={<WordSearch/>} />
          <Route path={`/main`} element={<MainPage />} />
          <Route path="/main2" element={<Home />} />
          <Route path = "/query" element = {<QuerySearch/>}/>
          <Route path="/favorites" element={<FavoritesPage />}> </Route>
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
