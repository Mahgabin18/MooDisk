import React, { useState, useEffect, memo, useRef } from "react";
// import "../Css/Details.css";
import axios from "axios";
import Script from "react-load-script";
import { detect } from "detect-browser";
const browser = detect();

const Details = memo((props) => {
  //console.log("Details Component");
  const [player, setPlayer] = useState();
  const duration = useRef();
  const device = useRef();

  window.onSpotifyWebPlaybackSDKReady = () => {
    setPlayer(
      new window.Spotify.Player({
        // Spotify is not defined until
        name: "Spotify Web Player", // the script is loaded in
        getOAuthToken: (cb) => {
          cb(props.access_token);
        }
      })
    );
  };

  const request = (device) => {
    axios(`https://api.spotify.com/v1/me/player/play?device_id=${device}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.access_token
      },
      data: {
        context_uri: "spotify:playlist:" + [props.playlistTrack.current],
        offset: { uri: "spotify:track:" + props.tracks.selectedTrack.id }
      }
    });
  };

  useEffect(() => {
    if (player && browser.name !== "safari") {
      player.on("player_state_changed", (state) => {
        if (state) {
          duration.current = state.duration;
        }
      });
      player.connect();
      player.getCurrentState().then((state) => {
        if (state) {
          if (
            state.track_window.current_track.name !==
              props.tracks.selectedTrack.name ||
            state.track_window.current_track.artists[0].name !==
              props.tracks.selectedTrack.artists[0].name
          ) {
            request(device.current);
          }
        }
      });
      player.addListener("ready", ({ device_id }) => {
        device.current = device_id;
        request(device_id);
      });
      const interval = setInterval(() => {
        player.getCurrentState().then((state) => {
          if (state) {
            if (
              state.track_window.current_track.name !==
                props.tracks.selectedTrack.name ||
              state.track_window.current_track.artists[0].name !==
                props.tracks.selectedTrack.artists[0].name
            ) {
              props.setTracks({
                selectedTrack: state.track_window.current_track,
                listOfTracksFromApi: props.tracks.listOfTracksFromApi
              });
            }
            //console.log("Check state")
            document.getElementById("seekbar").value =
              state.position / state.duration;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  const compute = (_) => {
    let count = 0;
    for (const elem of props.tracks.listOfTracksFromApi.entries()) {
      if (props.tracks.selectedTrack.id === elem[1].track.id) {
        return count;
      }
      count++;
    }
    return -1;
  };

  const onPrevClick = (_) => {
    if (
      props.tracks.listOfTracksFromApi[0].track.name ===
      props.tracks.selectedTrack.name
    ) {
      player.seek(0);
    } else {
      let index = compute();
      if (index > -1) {
        props.setTracks({
          selectedTrack: props.tracks.listOfTracksFromApi[index - 1].track,
          listOfTracksFromApi: props.tracks.listOfTracksFromApi
        });
      } else {
        player.previousTrack();
      }
    }
  };

  const onPlayClick = (_) => {
    if (props.playing) props.setPlaying(false);
    else props.setPlaying(true);
    player.togglePlay();
  };

  const onNextClick = (_) => {
    let index = compute();
    if (
      props.tracks.listOfTracksFromApi[
        props.tracks.listOfTracksFromApi.length - 1
      ].track.id === props.tracks.selectedTrack.id ||
      index === -1
    ) {
      player.nextTrack();
    } else {
      props.setTracks({
        selectedTrack: props.tracks.listOfTracksFromApi[index + 1].track,
        listOfTracksFromApi: props.tracks.listOfTracksFromApi
      });
    }
  };

  const position = (e) => {
    player.seek(duration.current * e.target.value);
  };

  const volume = (e) => {
    axios(
      "https://api.spotify.com/v1/me/player/volume?volume_percent=" +
        Math.round(e.target.value * 100),
      {
        method: "PUT",
        headers: { Authorization: "Bearer " + props.access_token }
      }
    );
  };

  return (
    <div className="SongDetails">
      <Script url="https://sdk.scdn.co/spotify-player.js" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <img
        className="Image"
        src={props.tracks.selectedTrack.album.images[0].url}
        alt={props.tracks.selectedTrack.artists[0]}
      ></img>
      <div>
        <label className="Name">{props.tracks.selectedTrack.name}</label>
      </div>
      <div>
        <label className="Artist">
          {props.tracks.selectedTrack.artists[0].name}
        </label>
      </div>
      <div>
        <input
          type="range"
          className="Seekbar"
          id="seekbar"
          min="0"
          max="1"
          step="0.001"
          defaultValue="0"
          onChange={position}
        />
      </div>
      <button className="Toggle" onClick={onPrevClick}>
        <i className="fa fa-backward"></i>
      </button>
      <button className="Pause" id="Pause" onClick={onPlayClick}>
        {props.playing ? (
          <i className="fa fa-pause"></i>
        ) : (
          <i className="fa fa-play"></i>
        )}
      </button>
      <button className="Toggle" onClick={onNextClick}>
        <i className="fa fa-forward"></i>
      </button>
      <div className="Volume">
        <i className="fa fa-volume-up"></i>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          defaultValue="1"
          onChange={volume}
        />
      </div>
    </div>
  );
});

export default Details;
