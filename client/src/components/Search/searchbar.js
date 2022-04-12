import React, { Component } from 'react'
import searchQuery from './searchQuery'
import { createApi } from "unsplash-js";
const handleSubmit = (e) => {
    e.preventDefault();
    // searchPhotos();
};
const api = createApi({
    // Don't forget to set your access token here!
    // See https://unsplash.com/developers
    accessKey: "p55OV837XTRngIgJA4phnnQHufPJowmk9Fq7vXaCYes"
  });

export default class searchbar extends Component {
    
    render() {
    return (
      <div>searchbar
          



      </div>
      
    )
  }
}

