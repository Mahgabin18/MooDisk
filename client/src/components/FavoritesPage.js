import ReactDOM from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import { PhotoComp } from "./MainPage";
import "./styling/FavoritesPage.css";

const getLikedPhotos = () => {
  const local = localStorage.getItem("favoriteImages"); 
  if(local.length === 0){
    return [];
  } else{
    return JSON.parse(local);
  }
}


const FavoritesPage = () => {

  let data = getLikedPhotos();

  return (
    <div className="favorites-container">
      
      <div className="favorites-header-container">
        <div className="favorites-header">Favorites</div> 
        <div className="favorites-subtitle">Photos that you have liked.</div>
      </div>

      <div className="feed">
          {data.map((photo) => (
            <div key={photo.id} className="li">
              <PhotoComp photo={photo} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default FavoritesPage;