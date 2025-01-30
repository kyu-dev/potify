import React from "react";
import Track from "./Track"; // Chemin correct
// Importer le CSS pour le composant Playlist
import "../../public/style.css"; // Ajout du CSS

const Playlist = ({ playlist, onRemove, playlistName, onNameChange, onSave }) => {
  return (
    <div className="playlist p-4 bg-[var(--secondary-color)] shadow-md rounded bor">
      {/* Champ de saisie pour modifier le nom de la playlist */}
      <input 
        className="focus:outline-none rounded mb-10 font-bold text-xl  "
        value={playlistName} 
        onChange={(e) => onNameChange(e.target.value)} // Utilise la fonction pour changer le nom
      />
      
      {playlist.length === 0 ? (
        <p>Pas de chansons dans la playlist.</p>
      ) : (
        playlist.map((track) => (
          <Track
            key={track.id}
            track={track}
            onRemove={onRemove} // Fonction de retrait passée par App
            isRemoval={true} // Signale que le bouton doit être "-" pour retirer
          />
        ))
      )}
      
      <button className="save-button bg-green-500 text-white px-4 py-2 rounded mt-4" onClick={onSave}>Sauvegarder sur Spotify</button> {/* Optionnel, si tu veux ajouter cette fonctionnalité */}
    </div>
  );
};

export default Playlist;