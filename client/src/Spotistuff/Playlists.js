import React, { memo } from "react";
// import "../Css/Playlists.css";

const Playlists = memo((props) => {
  //console.log("Playlist Component")
  let curTracks;

  const dropdownChanged = async (e) => {
    console.log(props.playlists);
    props.playlists.current = {
      selectedPlaylist: e.target.value,
      listOfPlaylistsFromAPI: props.playlists.current.listOfPlaylistsFromAPI
    };
    curTracks = await props.getPlaylist(0, curTracks, e.target.value);
    props.setDispPlaylist(curTracks);
  };

  return (
    <div className="Playlists">
      <label className="PlaylistLabel">Playlist: </label>
      <select className="PlaylistsContent" onChange={dropdownChanged}>
        {!props.playlists.current.selectedPlaylist && (
          <option key={0}>Select...</option>
        )}
        {props.playlists.current.listOfPlaylistsFromAPI.map((item, idx) => (
          <option key={idx + 1} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Playlists;
