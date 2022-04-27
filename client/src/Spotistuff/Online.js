import React, {useState, useEffect, memo, useRef} from 'react';
import '../Css/Online.css';
import axios from 'axios';

const Online = memo(props=> {
  //console.log("Online Component");
  const [open, setOpen]=useState(false);
  const [onlineClicked, setOnlineClicked]=useState(false);
  const addingTrack=useRef();
  const userInfo=useRef();
  let curTracks;

  useEffect(()=> {
    //console.log("In useEffect")
    axios('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {'Authorization' : 'Bearer ' + props.logInfo}
      })
      .then((response) => {
        userInfo.current=response.data;
      })
  },[props.logInfo]);

  useEffect(() => {
    const handleClickInside = event=>{
      if(open && props.inputRef.current.contains(event.target)){
        setOpen(false);
      }
      else if(props.inputRef.current.contains(event.target)){
        setOnlineClicked(true);
      }
      else if (document.activeElement.className!=="AddButton"){
        setOnlineClicked(false);
        if(open){
          setOpen(false);
        }
      }
    }
    document.addEventListener("click", handleClickInside);
    return () => {
      document.removeEventListener("click", handleClickInside);
    };
  }, [open])

  const addSongClicked=async addingId=>{
    let addSong=false;
    curTracks = await props.getPlaylist(0, curTracks, addingId);
    for(const item of curTracks){
      if(item.track.uri===addingTrack.current){
        alert("Song already in the playlist")
        break;
      }
      else if(item===curTracks[curTracks.length-1]){
        addSong=true;
      }
    }
    if(addSong){
      curTracks=null;
      axios(`https://api.spotify.com/v1/playlists/${addingId}/tracks`, {
        method: "POST",
        headers: {'Authorization' : 'Bearer ' + props.logInfo},
        data: { "uris": [addingTrack.current]}
      })
      .then (async _ => {
        curTracks = await props.getPlaylist(0, curTracks, addingId);
        if(addingId===props.playlists.current.selectedPlaylist){
          props.setDispPlaylist(curTracks);
          if(props.playlistTrack.current===props.playlists.current.selectedPlaylist){
            props.setTracks({selectedTrack: props.tracks.selectedTrack, listOfTracksFromApi: curTracks});
          }
        }
        else if(props.playlistTrack.current===addingId){
          props.setTracks({selectedTrack: props.tracks.selectedTrack, listOfTracksFromApi: curTracks});
        }
      })
    }
  }

  const seePlaylists=e=>{
    document.getElementById("PopUp").style.marginTop=e.currentTarget.id+"px";
    if(!open || (addingTrack.current && addingTrack.current===e.currentTarget.value)){
      setOpen(!open);
    }
    addingTrack.current=e.currentTarget.value;
  }

  const addTheSong=e=> {
    addSongClicked(e.target.id);
  };

  return (onlineClicked && props.songs ?(
    <div className="AboveOnline">
      <div className= "Online">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/ >
        {typeof props.songs ==="object" ?
          props.songs.tracks.items.map((item, idx) =>
            <div className="AddParent" key={idx}><button id={idx*23+57} value = {item.uri} onClick={seePlaylists} className="AddButton">
              <i className="fa fa-plus"></i><div className="AddMessage" >&nbsp;Add to playlist</div></button>{item.name}: {item.artists[0].name}</div>) :
          <div> '{props.songs}' does not exist </div>}
      </div>
      <div id ="PopUp" className="PopUp">
      {open && props.playlists.current.listOfPlaylistsFromAPI.map((item, idx) => userInfo.current.display_name===item.owner.display_name &&
        <button className="AddToPlay" key={idx} id = {item.id} onClick={addTheSong}>{item.name}</button>
      )}
      </div>
    </div>): null
  );
})
export default Online;
