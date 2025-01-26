import React from "react";
import Track from "../Track/Track"; // On importe le composant Track

const Playlist = ({ playlist, onRemove, playlistName, onNameChange }) => {
  return (
    <div className="playlist">
      {/* Champ de saisie pour modifier le nom de la playlist */}
      <input 
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
      
      <button className="save-button">Sauvegarder sur Spotify</button> {/* Optionnel, si tu veux ajouter cette fonctionnalité */}
    </div>
  );
};

export default Playlist;