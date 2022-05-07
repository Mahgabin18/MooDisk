import ReactDOM from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import "./styling/MainPage.css";
import { createApi } from "unsplash-js";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Emotions from '../models/Emotions';

//heyy
//testing

const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: "p55OV837XTRngIgJA4phnnQHufPJowmk9Fq7vXaCYes"
});

const setImageFavoriteStatus = (id, photo) => {
  const local = localStorage.getItem("favoriteImages"); 

  if(local.length === 0) photo.liked_by_user = false;
  else{
    const images = JSON.parse(local);
    if(images.findIndex(image => image.id === id) != -1){
      photo.liked_by_user = true;
    } else{
      photo.liked_by_user = false;
    }
  }
}

const getLikedPhotos = () => {
  const local = localStorage.getItem("favoriteImages"); 
  if(local.length === 0){
    return [];
  } else{
    return JSON.parse(local);
  }
}

// This will show the actual photo component and it takes 'photo' as a paremeter which will be given once you click search
const PhotoComp = ({ photo }) => {
  
  const { user, urls, id } = photo;
  const [isAnimating, setOnHoldState] = useState(false);
  let likedPhotos = getLikedPhotos();
  setImageFavoriteStatus(id, photo); 
  const [isClicked, setClickedState] = useState(photo.liked_by_user);
  
  // setImageFavoriteStatus(id, photo);

  function handleLikeClick(id, photo){
    setOnHoldState(false);
    if(!isClicked){
      if(!likedPhotos.includes(id)){
        likedPhotos.push({id: id, urls: photo.urls, user: photo.user, liked_by_user: true});
      }
      photo.liked_by_user = true;
      setClickedState(true);
    } else if(isClicked){
      likedPhotos = likedPhotos.filter(lPhoto => lPhoto.id !== id);
      photo.liked_by_user = false;
      setClickedState(false);
    }
    localStorage.setItem('favoriteImages', JSON.stringify(likedPhotos));
  }

  function handleMouseHold(){
    if(!isAnimating) setOnHoldState(true);
  }

  return (
    /*
      Fragments allow you to write cleaner, readable and maintainable code. They are not a replacement for divs in your HTML, but they offer a better approach to structuring and rendering your markup if you’re using unnecessary divs in your code.
      You can avoid issues that break your layouts or potentially optimize your markup rendering time using fragments. However, you should only use them when needed. If you need a wrapper to your JSX for styling, use a div instead. 
    */
    <Fragment>
      <div className="image-text-container">
        <div className="image-like-container">
          <img className="img" src={urls.regular} />
          <button className="feed-button" onMouseDown={handleMouseHold} onClick={() => handleLikeClick(id, photo)}>
            {
              !photo.liked_by_user?
              <img
                className={"white-outline feed-logo " + (isAnimating? 'logo-holding': '')}
                src={require("../images/whiteoutline.png")}
              />
              :
              <img
                className={"feed-logo " + (isAnimating? 'logo-holding': '')}
                src={require("../images/redheart.png")}
              />
            }
          </button>
        </div>
        <a
          className="credit"
          target="_blank"
          href={`https://unsplash.com/@${user.username}`}
        >
          {user.name}
        </a>
      </div>
    </Fragment>
  );
};

const Body = (props) => {
  // FROM THE GUIDE: https://www.digitalocean.com/community/tutorials/how-to-build-a-photo-search-app-with-react-using-the-unsplash-api#step-5-setting-state-using-search-query
  // this is tied to the Search Box inputs
  const [query, setQuery] = useState("");
  // FROM DEMO CODE: https://stackblitz.com/edit/unsplash-js-javascript?file=src%2Findex.js
  // this is for the searching the photos with unsplash and the data will be linked to 'photo' in the Body render with .map
  const [data, setPhotosResponse] = useState(null);
  const navigate = useNavigate();
  // useEffect(() => {
  //   async function searchPhotos() {
  //     api.search 
  //       .getPhotos({ query: query, orientation: "landscape" })
  //       .then((result) => {
  //         setPhotosResponse(result);
  //       })
  //       .catch(() => {
  //         console.log("something went wrong!");
  //       });
  //   }
  //   searchPhotos();
  // }, [query]);

  // MIXTURE OF GUIDE+DEMO+GOOGLEThis calls the api to search for the photos with the search query input
  // make sure this is only called once in the 'onSubmit' so it can only search when the form is submitted
  async function searchPhotos() {
    api.search
      .getPhotos({ query: query, orientation: "landscape" })
      .then((result) => {
        setPhotosResponse(result.response.results);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }

  async function initializeEmotions(emotion){
    let data = []; 
    await api.search
    .getPhotos({ query: emotion, orientation: "landscape" })
    .then((result) => {
      data = result.response.results;
    })
    .catch(() => {
      console.log("something went wrong!");
    });
    return data;
  }

  async function randomShuffleArray(inputArr){
    let shuffledArr = await inputArr
      .map(value => ({value, sort: Math.random()}))
      .sort((a,b) => a.sort - b.sort)
      .map(({ value }) => value);

    return shuffledArr;
  }


  // needed to actually load things in?
  // DO NOT call the useEffect React Hook inside the return render ; can only be called in the function component aka up here
  // SHOUTOUT STACKOVERFLOW: https://stackoverflow.com/questions/62248741/how-to-apply-useeffect-based-on-form-submission-in-react
  // "If you want fetch data onload of your functional component, you may use useEffect like this :"
  useEffect(async () => {
    if(props?.emotions){
      let prevResult = [];
      for(const emotion of props.emotions){
        let newResult = await initializeEmotions(emotion);
        prevResult = prevResult.concat(newResult.filter((item) => 
          prevResult.findIndex((result) => result.id == item.id) < 0
        ));
      }
      prevResult = await randomShuffleArray(prevResult);
      setPhotosResponse(prevResult);
    }
  }, []);
  // "And you want your fetch call to be triggered with button click :"
  const handleSubmit = (e) => {
    e.preventDefault();
    searchPhotos();
  };

  // from DEMO
  if (data === null) {
    return <div>Loading...</div>;
  } else if (data.errors) {
    return (
      <div>
        <div>{data.errors[0]}</div>
        <div>PS: Make sure to set your access token!</div>
      </div>
    );
  } else {
    return (
      <div className="main-page-container">
          {/* from GUIDE */}
          <div className="main-page-header">
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-flex">
                <input
                  type="text"
                  name="query"
                  className="input"
                  placeholder={`Try "dog" or "apple"`}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <label className="label" htmlFor="query">
                  {" "}
                  📷
                </label>
              </div>
              <button type="submit" className="button">
                Search
              </button>
            </form>
            <button className="button-favorite button" onClick={() => navigate("/favorites")}>
              Favorites
            </button>
          </div>
        {/* from DEMO */}
        <div className="feed">
          {data.map((photo) => (
            <div key={photo.id} className="li">
              <PhotoComp photo={photo} />
            </div>
          ))}
        </div>
      </div>
    );
  }
};

const MainPage = () => {
  const {state} = useLocation();
  const [words, changeWords] = useState();

  useEffect(async () => {
    await convertStateToSearchTerms(state);
  }, [])

  const convertStateToSearchTerms = async (boolStates) => {
    if(!boolStates) boolStates = {};
    let boolArr = Object.keys(boolStates)?.map(key => {
      return {[key]: boolStates[key]};
    });
    let wordArr = [];
    await boolArr.forEach(element => {
      if (element.isHappy)
        wordArr.push(Emotions.happy);
      else if (element.isSad)
        wordArr.push(Emotions.sad);
      else if (element.isMad)
        wordArr.push(Emotions.mad);
      else if (element.isExcited)
        wordArr.push(Emotions.excited);
      else if (element.isLonely)
        wordArr.push(Emotions.lonely);
      else if (element.isDisgust)
        wordArr.push(Emotions.disgust);
      else if (element.isPeaceful)
        wordArr.push(Emotions.peaceful);
      else if (element.isScared)
        wordArr.push(Emotions.scared);
      else if (element.isCrazy)
        wordArr.push(Emotions.crazy);
      else if (element.isHungry)
        wordArr.push(Emotions.hungry);
      else if (element.isEnergetic)
        wordArr.push(Emotions.energetic);
    });

    changeWords(wordArr);
  }

  return (
    <main className="root">
      {words && words.length != 0 && <Body emotions={words}/>}
      {words && words.length === 0 && <Body emotions={[]}/>}
    </main>
  );
};
export {MainPage, PhotoComp};
