//import useState hook to create menu collapse state
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import ImageUploading from "react-images-uploading";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent
} from "react-pro-sidebar";

//import icons from react icons
import {
  FaList,
  FaRegHeart,
  FaSearch,
  FaPause,
  FaPlay,
  FaStepBackward,
  FaStepForward,
  FaStop
} from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle
} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";

//import spotistuff components
import Playlists from "../Spotistuff/Playlists";
import Songs from "../Spotistuff/Songs";
import Details from "../Spotistuff/Details";
import Search from "../Spotistuff/Search";
import LoginS from "../Spotistuff/Login";
import SearchAndSearchRes from "../Spotistuff/SearchAndSearchRes";

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./styles.css";

export default function User() {
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  //FROM OUR USER FILE:
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  //console.log("In App");
  const [logInfo, setLogInfo] = useState("");
  const [cred, setCred] = useState();
  const playlists = useRef({
    selectedPlaylist: "",
    listOfPlaylistsFromAPI: []
  });
  const [dispPlaylist, setDispPlaylist] = useState();
  const [tracks, setTracks] = useState({
    selectedTrack: "",
    listOfTracksFromApi: ""
  });
  const [playing, setPlaying] = useState(true);
  const [qPlaylist, setQPlaylist] = useState("");
  const playlistTrack = useRef();
  //const params = getHashParams();
  useEffect(() => {
    if (logInfo) {
      //spotifyWebApi.setAccessToken(logInfo);
      axios("https://api.spotify.com/v1/me/playlists", {
        method: "GET",
        headers: { Authorization: "Bearer " + logInfo }
      })
        .then((response) => {
          playlists.current = { listOfPlaylistsFromAPI: response.data.items };
          setCred("right");
        })
        .catch((_) => {
          setCred("wrong");
        });
    }
  }, [logInfo]);

  const getPlaylist = async (offset, curTracks, val) => {
    await axios(
      `https://api.spotify.com/v1/playlists/${val}/tracks?offset=${offset}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + logInfo }
      }
    ).then((response) => {
      if (curTracks) {
        curTracks.push(...response.data.items);
      } else {
        curTracks = response.data.items;
      }
      if (response.data.items.length === 100) {
        curTracks = getPlaylist(offset + 100, curTracks, val);
      }
    });
    return curTracks;
  };

  return (
    <>
      <div id="header">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>{menuCollapse ? "user" : "username"}</p>
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps
                }) => (
                  // write your building UI
                  <div className="hi">
                    <button
                      style={isDragging ? { color: "red" } : null}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      Click or Drop here
                    </button>
                    &nbsp;
                    {imageList.map((image, index) => (
                      <div key={index} className="image-item">
                        <img src={image.data_url} alt="" width="100" />
                        <div className="image-item__btn-wrapper">
                          <button onClick={() => onImageUpdate(index)}>
                            Update
                          </button>
                          <button onClick={() => onImageRemove(index)}>
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ImageUploading>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              {/* <MenuItem icon={<FaList />}>Playlist</MenuItem> */}
              {/* <SubMenu title="button attempt" icon={<FaList />}>
                <MenuItem>Component 1</MenuItem>
                <MenuItem>Component 2</MenuItem>
              </SubMenu> */}
            </Menu>
            {!cred || cred === "wrong" ? (
              <LoginS setLoggedIn={setLogInfo} cred={cred} setCred={setCred} />
            ) : (
              <>
                <MenuItem>
                  <Search
                    class="SearchPlaylist"
                    placeh="Search playlist"
                    setQuery={setQPlaylist}
                  />
                </MenuItem>
                <MenuItem>
                  <SearchAndSearchRes
                    logInfo={logInfo}
                    playlists={playlists}
                    getPlaylist={getPlaylist}
                    playlistTrack={playlistTrack}
                    setTracks={setTracks}
                    tracks={tracks}
                    setDispPlaylist={setDispPlaylist}
                  />
                </MenuItem>
                <MenuItem>
                  <Playlists
                    playlists={playlists}
                    setDispPlaylist={setDispPlaylist}
                    getPlaylist={getPlaylist}
                  />
                </MenuItem>
                <div className="Box">
                  <MenuItem>
                    {dispPlaylist && (
                      <Songs
                        logInfo={logInfo}
                        playlists={playlists}
                        tracks={tracks}
                        setTracks={setTracks}
                        playlistTrack={playlistTrack}
                        dispPlaylist={dispPlaylist}
                        setDispPlaylist={setDispPlaylist}
                        query={qPlaylist}
                        getPlaylist={getPlaylist}
                        playing={playing}
                        setPlaying={setPlaying}
                      />
                    )}
                  </MenuItem>
                </div>
              </>
            )}
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem>
                {tracks.selectedTrack && (
                  <Details
                    access_token={logInfo}
                    tracks={tracks}
                    setTracks={setTracks}
                    playlistTrack={playlistTrack}
                    playing={playing}
                    setPlaying={setPlaying}
                  />
                )}
              </MenuItem>
              {/* <MenuItem icon={<FiLogOut />}>Logout</MenuItem> */}
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
      <div id="main">
        <h1>hi</h1>
      </div>
    </>
  );
}
