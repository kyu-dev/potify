import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import { searchSpotify, authenticateSpotify, createPlaylist, addTracksToPlaylist, refreshAccessToken } from "../../utils/spotify";
import './App.css'; // Importer le CSS pour le composant App

const App = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState("Ma Playlist");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      console.error("Le token d'accès est manquant. Veuillez vous authentifier.");
      await authenticateSpotify();
      return;
    }

    // Vérifier si le token est expiré et le rafraîchir si nécessaire
    accessToken = await refreshAccessToken();
    if (!accessToken) {
      console.error("Impossible de rafraîchir le token. Veuillez vous réauthentifier.");
      return;
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

  const handleCreatePlaylist = async () => {
    const playlistData = {
      name: playlistName,
      tracks: playlist // Assurez-vous que cela ne contient que des IDs ou des données valides
    };

    try {
      const playlistId = await createPlaylist(playlistData); // Crée la playlist et obtient l'ID
      const trackUris = playlist.map(track => `spotify:track:${track.id}`); // Formate les URIs des morceaux
      await addTracksToPlaylist(playlistId, trackUris); // Ajoute les morceaux à la playlist
      console.log('Morceaux ajoutés à la playlist avec succès');
    } catch (error) {
      console.error('Erreur lors de la création de la playlist ou de l\'ajout des morceaux:', error);
    }
  };

  return (
    <div className="app-container">
      <div className="search-results">
        <h1>Recherche de musique</h1>
        <SearchBar search={search} setSearch={setSearch} handleSubmit={handleSubmit} />
        <SearchResults results={results} onAdd={addTrack} />
      </div>
      <Playlist
        playlist={playlist}
        onRemove={removeTrack}
        playlistName={playlistName}
        onNameChange={handleNameChange}
        onSave={handleCreatePlaylist}
      />
    </div>
  );
};

export default App;