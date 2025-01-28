import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import { searchSpotify, authenticateSpotify, createPlaylist, addTracksToPlaylist, refreshAccessToken, isTokenExpired } from "../../utils/spotify";
 
import "../../styles/style.css";

const App = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState("Ma Playlist");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let accessToken = localStorage.getItem("access_token");

    if (!accessToken || isTokenExpired()) {
      console.warn("Token manquant ou expiré. Tentative de rafraîchissement...");
      accessToken = await refreshAccessToken();
      if (!accessToken) {
        console.error("Impossible de rafraîchir le token. Veuillez vous réauthentifier.");
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
      tracks: playlist
    };

    try {
      const playlistId = await createPlaylist(playlistData);
      const trackUris = playlist.map(track => `spotify:track:${track.id}`);
      await addTracksToPlaylist(playlistId, trackUris);
      console.log('Morceaux ajoutés à la playlist avec succès');
    } catch (error) {
      console.error('Erreur lors de la création de la playlist ou de l\'ajout des morceaux:', error);
    }
  };

  return (
    <div className="app-container p-12 p-4 bg-gradient-to-r from-blue-300 to-blue-700 min-h-screen">
      <div className="search-container mb-10">
        <h1 className="text-2xl font-bold text-center text-white mb-20 mt-10">Recherche de musique</h1>
        <SearchBar search={search} setSearch={setSearch} handleSubmit={handleSubmit} />
      </div>
      <div className="main-container flex flex-col lg:flex-row md:flex-col justify-between gap-10 mt-4">
        <div className="w-full  md lg:w-6/10">
          <SearchResults results={results} onAdd={addTrack} />
        </div>
        <div className="w-full md: lg:w-4/10">
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
  );
};

export default App;