import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Playlist from "./Playlist";
import Header from "./Header";
import {
  searchSpotify,
  createPlaylist,
  addTracksToPlaylist,
  refreshAccessToken,
  isTokenExpired,
} from "../utils/spotify";

import "../../public/style.css";

const App = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState("Ma Playlist");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let accessToken = localStorage.getItem("access_token");

    if (!accessToken || isTokenExpired()) {
      console.warn(
        "Token manquant ou expiré. Tentative de rafraîchissement..."
      );
      accessToken = await refreshAccessToken();
      if (!accessToken) {
        console.error(
          "Impossible de rafraîchir le token. Veuillez vous réauthentifier."
        );
        return;
      }
    }

    const data = await searchSpotify(search);
    setResults(data);
  };

  const addTrack = (track) => {
    if (!playlist.find((savedTrack) => savedTrack.id === track.id)) {
      setPlaylist([...playlist, track]);
    }
  };

  const removeTrack = (track) => {
    setPlaylist(playlist.filter((savedTrack) => savedTrack.id !== track.id));
  };

  const handleNameChange = (newName) => {
    setPlaylistName(newName);
  };

  const handleCreatePlaylist = async () => {
    const playlistData = {
      name: playlistName,
      tracks: playlist,
    };

    try {
      const playlistId = await createPlaylist(playlistData);
      const trackUris = playlist.map((track) => `spotify:track:${track.id}`);
      await addTracksToPlaylist(playlistId, trackUris);
      console.log("Morceaux ajoutés à la playlist avec succès");
    } catch (error) {
      console.error(
        "Erreur lors de la création de la playlist ou de l'ajout des morceaux:",
        error
      );
    }
  };

  return (
    <>
      <Header />
      <div className="app-container  md:px-12 px-4 bg-[var(--tertiary-color)] min-h-screen">
        <div className="search-container mb-10">
          <SearchBar
            search={search}
            setSearch={setSearch}
            handleSubmit={handleSubmit}
          />
        </div>
        <div className="main-container flex flex-col lg:flex-row md:flex-col justify-center xl:gap-24 mt-20 lg:gap-10 gap-20 mt-4">
          <div className=" max-w-[1000px]  lg:w-[60%] ">
            <SearchResults results={results} onAdd={addTrack} />
          </div>
          <div className=" max-w-[1000px] lg:w-[40%]">
            <Playlist
              playlist={playlist}
              onRemove={removeTrack}
              playlistName={playlistName}
              onNameChange={handleNameChange}
              onSave={handleCreatePlaylist}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
