import React, { useState, Component } from "react";
import { useNavigate, Link} from "react-router-dom";
import Unsplash, { toJson } from "unsplash-js"; //unplash api import 
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import MainPage from './MainPage';
import './styling/WordSearch.css';

//import Link, { LinkedComponent } from 'valuelink';
//import { Input } from 'valuelink/tags';


//const valueArray = []; //initialize empty array



//export default function WordSearch() 
class WordSearch extends Component
{
    //  Checkboxes = () => {
    //   const [wordInfo, setWordInfo] = useState("");
    //   const word = '';
    // }

    // create an array state to store the word form data
    //  [wordInfo, setWordInfo] = useState([]);
    // word = '';

    //  addEntryClick = () => {
    //   setWordInfo([...wordInfo, word]);
    // };

    // ref from: https://www.positronx.io/react-checkbox-tutorial-handle-multiple-checkboxes-values/
    // 1) set Checkbox initial state of options
    state = {
        isHappy: false,
        isSad: false,
        isMad: false,
        isExcited: false, 
        isLonely: false,
        isDisgust: false,
        isPeaceful: false,
        isScared: false,
        isCrazy: false,
        isHungry: false,
        isEnergetic: false,
    };
    // 2) React Checkboxes define onChange Methods 
     onChangeHappy = (event) => {
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
     onChangeDisgust = () => {
        this.setState(initialState => ({
          isDisgust: !initialState.isDisgust,
        }));

     }
     onChangePeaceful = () => {
        this.setState(initialState => ({
          isPeaceful: !initialState.isPeaceful,
        }));

     }
     onChangeScared = () => {
        this.setState(initialState => ({
          isScared: !initialState.isScared,
        }));

     }
     onChangeCrazy = () => {
        this.setState(initialState => ({
          isCrazy: !initialState.isCrazy,
        }));

     }
     onChangeHungry = () => {
        this.setState(initialState => ({
          isHungry: !initialState.isHungry,
        }));

     }
     onChangeEnergetic = () => {
        this.setState(initialState => ({
          isEnergetic: !initialState.isEnergetic,
        }));

     }

      HandleClick = () =>{ 
      let navigate = useNavigate();
      let path = `main`; 
      navigate(path);
    };
    
    
    
    //  3) Submit 
     onSubmit = (e) => {
      e.preventDefault();
      
      // if (this.state.isHappy === true){
      //   word = 'happy';
      //   addEntryClick();
      // }

      console.log("submitted")
      console.log(this.state);
      console.log(this.wordInfo);
      // useNavigate('/main')
      // let navigate = useNavigate();
      // this.props.navigate("/main");
    };
     
      // const navigate = useNavigate();
    // PerformNav = () => {  
    //   this.props.navigate("/main");
    // }
    
     
      

      //render step 
      render() {

        // const navigate = useNavigate();


        return (
          <div className="App">
            <h1>What are You Feeling?</h1>
            <form className="word-form" onSubmit={this.onSubmit}  > 
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
                    // value = {wordInfo.sad}
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
                    // value = {wordInfo.mad}
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
                    // value = {wordInfo.excited}
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
                    // value = {wordInfo.lonely}
                  />
                  Lonely
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox"
                    checked={this.state.isDisgust}
                    onChange={this.onChangeDisgust}
                    className="form-check-input"
                    // value = {wordInfo.lonely}
                  />
                  Disgust
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox"
                    checked={this.state.isPeaceful}
                    onChange={this.onChangePeaceful}
                    className="form-check-input"
                    // value = {wordInfo.lonely}
                  />
                  Peaceful
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox"
                    checked={this.state.isScared}
                    onChange={this.onChangeScared}
                    className="form-check-input"
                    // value = {wordInfo.lonely}
                  />
                  Scared
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox"
                    checked={this.state.isCrazy}
                    onChange={this.onChangeCrazy}
                    className="form-check-input"
                    // value = {wordInfo.lonely}
                  />
                  Crazy
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox"
                    checked={this.state.isHungry}
                    onChange={this.onChangeHungry}
                    className="form-check-input"
                    // value = {wordInfo.lonely}
                  />
                  Hungry
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox"
                    checked={this.state.isEnergetic}
                    onChange={this.onChangeEnergetic}
                    className="form-check-input"
                    // value = {wordInfo.lonely}
                  />
                  Energetic
                </label>
              </div>
              <div className="form-group">
                {/* <button className="btn btn-success">
                  Save
                </button> */}
                {/* <button className = "btn" onClick={this.handleClick}>
                  Save
                </button> */}
                {/* button that links to the main page using link library  */}
                <Link 
                  to={"/main"} 
                  state={this.state}
                  className="btn btn-primary">Save</Link>
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