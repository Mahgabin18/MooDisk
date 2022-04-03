import React, { useState, Component } from "react";
import { useNavigate } from "react-router-dom";
import Unsplash, { toJson } from "unsplash-js"; //unplash api import 
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

// export default function WordSearch() 
class WordSearch extends Component
{

    // ref from: https://www.positronx.io/react-checkbox-tutorial-handle-multiple-checkboxes-values/
    // 1) set Checkbox initial state of options
    state = {
        isHappy: false,
        isSad: false,
        isMad: false,
        isExcited: false, 
        isLonely: false
    };
    // 2) React Checkboxes define onChange Methods 
    onChangeHappy = () => {
        this.setState(initialState => ({
          isHappy: !initialState.isHappy,
        }));
     }
     
     onChangeSad = () => {
        this.setState(initialState => ({
          isSad: !initialState.isSad,
        }));
     }
     
      onChangeMad = () => {
        this.setState(initialState => ({
          isMad: !initialState.isMad,
        }));
     }
     
     onChangeExcited = () => {
        this.setState(initialState => ({
          isExcited: !initialState.isExcited,
        }));
     }
     onChangeLonely = () => {
        this.setState(initialState => ({
          isLonely: !initialState.isLonely,
        }));
     }

    //  3) Submit 
    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        // let navigate = useNavigate();
        // this.props.navigate("/main");
      }
     
      // const navigate = useNavigate();
    // PerformNav = () => {  
    //   this.props.navigate("/main");
    // }
      

      //render step 
      render() {

        // const navigate = useNavigate();

        return (
          <div className="App">
            <h2>What are You Feeling?</h2>
            <form onSubmit={this.onSubmit}>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox"
                    checked={this.state.isHappy}
                    onChange={this.onChangeHappy}
                    className="form-check-input"
                  />
                  Happy
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox"
                    checked={this.state.isSad}
                    onChange={this.onChangeSad}
                    className="form-check-input"
                  />
                  Sad
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox"
                    checked={this.state.isMad}
                    onChange={this.onChangeMad}
                    className="form-check-input"
                  />
                  Mad
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox"
                    checked={this.state.isExcited}
                    onChange={this.onChangeExcited}
                    className="form-check-input"
                  />
                  Excited
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox"
                    checked={this.state.isLonely}
                    onChange={this.onChangeLonely}
                    className="form-check-input"
                  />
                  Lonely
                </label>
              </div>
              <div className="form-group">
                <button className="btn btn-success">
                  Save
                </button>
              </div>
            </form>
             {/* BUTTON TO GO NAVIGATE TO THE MAIN PAGE */}
            {/* <p>
                <button onClick={() => this.props.navigate("/main")}>Go to MAIN</button>
            </p> */}
            {/* <p>
              <button onClick={this.props.navigate("/main")}>
                MAIN PAGE
              </button>
            </p> */}
          </div>
        );
      }
    }

// function WithNavigate(props) {
//   let navigate = useNavigate();
//   return <WordSearch {...props} navigate={navigate} />
// }

export default WordSearch;


    // const [query, setQuery] = useState("");
    // console.log(query);
//     const searchPhotos = async (e) => 
//     {
//         e.preventDefault();
//         console.log("Submitting the Form")
//     };



//  function WordSearch() {
//     const [checked, setChecked] = React.useState(false);

//     const handleChange = () => {
//         setChecked(!checked);
//     }

//     const unsplash = new Unsplash({
//         accessKey: "your_Access_Key",
//       }
//     );

//     const [state, setState] = React.useState();


    // const [word, setWord] = useState("");
    // console.log(word);


    // render() {
    //     return (
    //     //  className="Words">
    //          className="heading-container">
    //             className="title">What are you Feeling?</h1> 
    //         v>
    //          className="words-container">
    //             m onSubmit={this.onSubmit}>
    //                  className="form-check">
    //                     el className="form-check-label">
    //                     ut type="checkbox"
    //                         ked={this.state.isHappy}
    //                         ange={this.onChangeHappy}
    //                         sName="form-check-input"
                        
    //                     y
    //                     bel>
    //                 v>
    //                  className="form-check">
    //                     el className="form-check-label">
    //                     ut type="checkbox"
    //                         ked={this.state.isSad}
    //                         ange={this.onChangeSad}
    //                         sName="form-check-input"
                        
                        // 
    //                     bel>
    //                 v>
    //                  className="form-check">
    //                     el className="form-check-label">
    //                     ut type="checkbox"
    //                         ked={this.state.isMad}
    //                         ange={this.onChangeMad}
    //                         sName="form-check-input"
                        
                        // 
    //                     bel>
    //                 v>
    //                  className="form-check">
    //                     el className="form-check-label">
    //                     ut type="checkbox"
    //                         ked={this.state.isExcited}
    //                         ange={this.onChangeExcited}
    //                         sName="form-check-input"
                        
    //                     ted
    //                     bel>
    //                 v>
    //                  className="form-check">
    //                     el className="form-check-label">
    //                     ut type="checkbox"
    //                         ked={this.state.isLonely}
    //                         ange={this.onChangeLonely}
    //                         sName="form-check-input"
                        
    //                     ly
    //                     bel>
    //                 v>
    //                  className="form-group">
    //                     ton className="btn btn-success">
                        // 
    //                     tton>
    //                 v>
    //             rm>
    //             BUNCH OF CHECKBOXES WITH WORDS TO SELECT and also a SUBMIT BUTTON to send the results and stuff 
    //             m>
    //                 >
    //                     ckbox 
    //                         l="happy :)"
    //                         e={checked}
    //                         ange={handleChange}
                        
    //                 v> 
    //                  v>
    //                     ton type="submit">Submit</button>
    //                 v> 
    //                 s "My Value" checked? {checked.toString()}</p>
    //             rm> */}
    //                 </div>
                
    //                 // </div>
    //         );
    //     }
    // }
    
//export default WordSearch;

// const Checkbox = ({ label, value, onChange }) => {
//     return (
//       <label>
//         <input type="checkbox" checked={value} onChange={onChange} />
//         {label}
//       </label>
//     );
//   };



  // return (//does that <> do something? 
  //   <>  
  //     <form className="form">
  //       <label className="label" htmlFor="query">
  //         {" "}
  //         📷
  //       </label>
  //       <input
  //         type="text"
  //         name="query"
  //         className="input"
  //         placeholder={`Try "dog" or "apple"`}
  //         value={query}
  //         onChange={(e) => setQuery(e.target.value)}
  //       />
  //       <button type="submit" className="button">
  //         Search
  //       </button>
  //     </form>
  //   </>
  // );
// }

/* import React, { useState } from "react";

function WordSearch() {
    
return (
 <div>
 </div>
);
}
export default WordSearch;  */
// export default WordSearch;