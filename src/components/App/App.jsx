import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import { searchSpotify, authenticateSpotify } from "../../utils/spotify";

const App = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState("Ma Playlist");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("access_token"); // Vérifier le token d'accès

    if (!accessToken) {
      console.error("Le token d'accès est manquant. Veuillez vous authentifier.");
      await authenticateSpotify();
      return; // Sortir de la fonction si l'utilisateur n'est pas authentifié
    }

    const data = await searchSpotify(search);
    setResults(data);
  };

  // Ajouter une chanson à la playlist si l'id de la musique n'y est pas déjà
  const addTrack = (track) => {
    if (!playlist.find((savedTrack) => savedTrack.id === track.id)) { 
      setPlaylist([...playlist, track]);
    }
  };

  // Retirer une chanson de la playlist
  const removeTrack = (track) => {
    setPlaylist(playlist.filter((savedTrack) => savedTrack.id !== track.id)); // On garde que les musiques dont l'id est différent de l'id de la musique que l'on souhaite retirer
  };

  // Modifier le nom de la playlist
  const handleNameChange = (newName) => {
    setPlaylistName(newName);
  };

  return (
    <div>
      <h1>Recherche de musique</h1>
      <SearchBar search={search} setSearch={setSearch} handleSubmit={handleSubmit} />
      <SearchResults results={results} onAdd={addTrack} />
      <Playlist
        playlist={playlist}
        onRemove={removeTrack}
        playlistName={playlistName} // Passe le nom à Playlist
        onNameChange={handleNameChange} // Passe la fonction pour modifier le nom
      />
    </div>
  );
};

export default App;