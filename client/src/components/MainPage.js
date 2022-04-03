import ReactDOM from "react-dom";
import React, { Fragment, useEffect, useState } from "react";
import "./styling/MainPage.css";
import { createApi } from "unsplash-js";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

//heyy
//testing

const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: "p55OV837XTRngIgJA4phnnQHufPJowmk9Fq7vXaCYes"
});

// This will show the actual photo component and it takes 'photo' as a paremeter which will be given once you click search
const PhotoComp = ({ photo }) => {
  const { user, urls } = photo;

  return (
    /*
      Fragments allow you to write cleaner, readable and maintainable code. They are not a replacement for divs in your HTML, but they offer a better approach to structuring and rendering your markup if you’re using unnecessary divs in your code.
      You can avoid issues that break your layouts or potentially optimize your markup rendering time using fragments. However, you should only use them when needed. If you need a wrapper to your JSX for styling, use a div instead. 
    */
    <Fragment>
      <div>
        <img className="img" src={urls.regular} />
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

const Body = () => {
  // FROM THE GUIDE: https://www.digitalocean.com/community/tutorials/how-to-build-a-photo-search-app-with-react-using-the-unsplash-api#step-5-setting-state-using-search-query
  // this is tied to the Search Box inputs
  const [query, setQuery] = useState("");
  // FROM DEMO CODE: https://stackblitz.com/edit/unsplash-js-javascript?file=src%2Findex.js
  // this is for the searching the photos with unsplash and the data will be linked to 'photo' in the Body render with .map
  const [data, setPhotosResponse] = useState(null);

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
        setPhotosResponse(result);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }

  // needed to actually load things in?
  // DO NOT call the useEffect React Hook inside the return render ; can only be called in the function component aka up here
  // SHOUTOUT STACKOVERFLOW: https://stackoverflow.com/questions/62248741/how-to-apply-useeffect-based-on-form-submission-in-react
  // "If you want fetch data onload of your functional component, you may use useEffect like this :"
  useEffect(() => {
    searchPhotos();
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
      <>
        <div>
          {/* from GUIDE */}
          <form className="form" onSubmit={handleSubmit}>
            <label className="label" htmlFor="query">
              {" "}
              📷
            </label>
            <input
              type="text"
              name="query"
              className="input"
              placeholder={`Try "dog" or "apple"`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="button">
              Search
            </button>
          </form>
        </div>
        {/* from DEMO */}
        <div className="feed">
          <ul className="columnUl">
            {data.response.results.map((photo) => (
              <li key={photo.id} className="li">
                <PhotoComp photo={photo} />
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
};

const MainPage = () => {
  return (
    <main className="root">
      <Body />
    </main>
  );
};
export default MainPage;