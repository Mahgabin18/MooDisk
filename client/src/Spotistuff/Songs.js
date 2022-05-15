import React, { memo, useMemo } from "react";
// import "../Css/Songs.css";
import axios from "axios";

const Songs = memo((props) => {
  let curTracks;
  //console.log("SongsComponent");
  document.getElementsByClassName(
    "SearchPlaylist"
  )[0].style.visibility = useMemo(() => "visible", [
    props.playlists.current.listOfPlaylistsFromAPI
  ]);

  const search = (rows, query) => {
    return rows.filter(
      (row) => row.track.name.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

  function setColor(artist, name) {
    if (
      props.tracks.selectedTrack.name === name &&
      props.tracks.selectedTrack.artists[0].name === artist
    ) {
      return "SongsButtonSelected";
    }
    return "SongsButton";
  }

  const clickSong = (e) => {
    if (!props.playing) props.setPlaying(true);
    if (e.target.id === props.tracks.selectedTrack.id) {
      axios(`https://api.spotify.com/v1/me/player/seek?position_ms=${0}`, {
        method: "PUT",
        headers: { Authorization: "Bearer " + props.logInfo }
      });
    } else {
      props.setTracks({
        selectedTrack: search(props.dispPlaylist, props.query)[e.target.value]
          .track,
        listOfTracksFromApi: props.dispPlaylist
      });
      props.playlistTrack.current = props.playlists.current.selectedPlaylist;
    }
  };

  const deleteSong = (e) => {
    axios(
      `https://api.spotify.com/v1/playlists/${props.playlists.current.selectedPlaylist}/tracks`,
      {
        method: "DELETE",
        headers: { Authorization: "Bearer " + props.logInfo },
        data: { tracks: [{ uri: e.currentTarget.value }] }
      }
    ).then(async (_) => {
      curTracks = await props.getPlaylist(
        0,
        curTracks,
        props.playlists.current.selectedPlaylist
      );
      props.setDispPlaylist(curTracks);
      if (
        props.playlistTrack.current === props.playlists.current.selectedPlaylist
      ) {
        props.setTracks({
          selectedTrack: props.tracks.selectedTrack,
          listOfTracksFromApi: curTracks
        });
      }
    });
  };

  return (
    <div className="SongsTable">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      {search(props.dispPlaylist, props.query).length === 0 && (
        <li className="NotFound">'{props.query}' does not exist</li>
      )}
      <table>
        <tbody>
          {search(props.dispPlaylist, props.query).map(
            (item, idx) =>
              item.track.available_markets.length > 0 && (
                <tr key={idx}>
                  {
                    <td className="ButtonsParent">
                      <button
                        className={setColor(
                          item.track.artists[0].name,
                          item.track.name
                        )}
                        id={item.track.id}
                        onClick={clickSong}
                        value={idx}
                      >
                        {" "}
                        {item.track.name}
                      </button>
                      <button
                        className="DelButton"
                        onClick={deleteSong}
                        value={item.track.uri}
                      >
                        <i className="fa fa-trash"></i>
                        {/* <div className="DelMesage">&nbsp;Delete</div> */}
                      </button>
                    </td>
                  }
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
});

export default Songs;
