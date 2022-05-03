import React, {useRef, memo} from 'react';
import '../Css/Login.css';

const Login =memo(props=>{
  const token=useRef();
//  console.log("In Login");

  const submit=e =>{
    e.preventDefault();
    if(token.current){
      props.setLoggedIn(token.current);
    }
    else{
      props.setCred("wrong");
    }
  }

  return (
    <div className="Login">
      <h1>Login</h1>
      <form onSubmit = {e => submit(e)}>
        <label className="TokenLabel">Enter spotify token below (get it from {" "}
          <a href="https://beta.developer.spotify.com/documentation/web-playback-sdk/quick-start/#authenticating-with-spotify">
            here
          </a>):
        </label>
        <br/>
        <input className="TokenInput" type="text" placeholder="spotify token" onChange={e=> token.current=e.target.value} defaultValue =''/>
        <br/><br/>
        <button type = "submit" id="submit-button">Submit</button>
      </form>
      {props.cred==="wrong" &&
        <div className="Wrong">Invalid token, please try again</div>
      }
    </div>
  );
});

export default Login;
