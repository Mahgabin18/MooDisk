import React, { useState, useRef, memo, useCallback } from "react";
import Online from "./Online";
import Search from "./Search";

import axios from "axios";

const SearchAndSearchRes = memo((props) => {
  const [searchRes, setSearchRes] = useState();
  const inputRef = useRef();

  const changeSearchRes = useCallback(
    (query) => {
      if (query) {
        axios(
          `https://api.spotify.com/v1/search?limit=15&type=track&q=${query}`,
          {
            method: "GET",
            headers: { Authorization: "Bearer " + props.logInfo }
          }
        ).then((response) => {
          if (response.data.tracks.items.length) {
            setSearchRes(response.data);
          } else {
            setSearchRes(query);
          }
        });
      } else {
        setSearchRes(null);
      }
    },
    [searchRes]
  );

  return (
    <>
      <Search
        class="SearchOnline"
        placeh="Search for a song..."
        inputRef={inputRef}
        changeSearchRes={changeSearchRes}
      />
      <Online
        songs={searchRes}
        logInfo={props.logInfo}
        playlists={props.playlists}
        getPlaylist={props.getPlaylist}
        playlistTrack={props.playlistTrack}
        setTracks={props.setTracks}
        tracks={props.tracks}
        setDispPlaylist={props.setDispPlaylist}
        inputRef={inputRef}
      />
    </>
  );
});

export default SearchAndSearchRes;
