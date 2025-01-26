import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import { searchSpotify } from "../../utils/spotify";

const App = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState("Ma Playlist");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await searchSpotify(search);
    setResults(data);
  };

  // Ajouter une chanson à la playlist si l'id de la musique n'y est pas dejà
  const addTrack = (track) => {
    if (!playlist.find((savedTrack) => savedTrack.id === track.id)) { 
      setPlaylist([...playlist, track]);
    }
  };

  // Retirer une chanson de la playlist
  const removeTrack = (track) => {
    setPlaylist(playlist.filter((savedTrack) => savedTrack.id !== track.id));   //on garde que les musique dont l'id est diffrent de l'id de la musique que l'on souhaite retirer
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