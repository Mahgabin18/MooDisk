import React, {useReducer, useState} from 'react'
import { useNavigate, Link} from "react-router-dom";

function setQuery (string){
    console.log("setting up qeur")
}

const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value
    }
}

export default function Form() {
  const [formData, setFormData] = useReducer(formReducer, {})
//   const [Happy, setHappy] = useState("")
//   const [Sad, setSad] = useState("")
//   const [Mad, setMad] = useState("")
//   const [Excited, setExcited] = useState("")
//   const [Lonely, setLonely] = useState("")
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
    }, 3000);
  }
  const handleChange = event => {
    setFormData({
        name: event.target.name,
        value: event.target.value,
    //   Happy: event.target.Happy,
    //   Sad: event.target.Sad,
    //   Mad: event.target.Mad,
    //   Excited: event.target.Excited,
    //   Lonely: event.target.Lonely,

    });
  }
//   const onSubmit = ()=>{
//     alert("form submitted")  
//   };

    return (
    <div>
       
       <form onSubmit = {handleSubmit}>
           <label>
               <input type = "checkbox" 
               name = "Happy"
               onChange = {handleChange}
               
               />
               Happy
           </label>
           <br></br>
           <label>
               <input type = "checkbox"
               name = "Sad"
               onChange = {handleChange}
               
               />
               Sad
                
           </label>
           <br></br>
           <label>
               <input type = "checkbox"
                name = "Mad"
                onChange = {handleChange}
                
               />
                Mad
           </label>
           <br></br>
           <label>
               <input type = "checkbox"
               name = "Excited"
               onChange = {handleChange}

               />
                Excited
           </label>
           <br></br>
           <label>
               <input type = "checkbox"
               name = "Lonely"
               onChange = {handleChange}
               
               />
                Lonely
           </label>
           <br></br>
           <Link to="/main" className="btn btn-primary">Save</Link>

       </form>
        


        
    </div>
  
  )
}
