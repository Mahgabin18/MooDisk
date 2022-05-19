import { useEffect, useState } from 'react'
import "./Login.css"


function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  useEffect(() => {
    document.body.style.backgroundColor =" #f399ff";
  })
  
  async function loginUser(event){
    event.preventDefault()
    const response = await fetch('http://localhost:1337/api/login',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    const data = await response.json()
    if (data.user) {
			localStorage.setItem('token', data.user)
			window.location.href = '/userpage'
		} else {
			alert('Please check your username and password')
		}
  }
  return (
    <div className="allz">
    
      <h1>Welcome Back!</h1>   
      <div className="loginz">
      <form onSubmit={loginUser}>
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
         <div className="ns">
         <input type="submit" value="Login" className="n"/>
         </div>
      </form>
      <img class="cloud"src={require("../images/cloud.png") }/>
      <img class="sun"src={require("../images/sun.png") }/>
      
  </div>
     </div>
  );
}

export default App;
