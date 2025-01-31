import React from "react";
import Track from "./Track"; // Chemin correct
import "../../public/style.css"; // Ajout du CSS

const Playlist = ({
  playlist,
  onRemove,
  playlistName,
  onNameChange,
  onSave,
}) => {
  return (
    <div className="playlist rounded-lg p-4 bg-[var(--secondary-color)] shadow-md flex flex-col h-[60vh] "> 
      {/* Ajout de flex-col et d'une hauteur fixe */}

      <input
        className="focus:outline-none rounded mb-4 font-bold text-xl text-[var(--primary-color)]"
        value={playlistName}
        onChange={(e) => onNameChange(e.target.value)} 
      />

      {/* Conteneur qui grandit et scrolle si nécessaire */}
      <div className="results-container flex-grow overflow-y-auto ">
        {playlist.length === 0 ? (
          <p className="text-[var(--primary-color)]">
            Pas de chansons dans la playlist.
          </p>
        ) : (
          playlist.map((track) => (
            <Track
              key={track.id}
              track={track}
              onRemove={onRemove}
              isRemoval={true} 
            />
          ))
        )}
      </div>

      {/* Bouton en bas qui ne bouge pas */}
      <button
        className="save-button bg-green-500 text-[var(--secondary-color)] px-4 py-2 rounded mt-4 self-end"
        onClick={onSave}
      >
        Sauvegarder sur Spotify
      </button>
    </div>
  );
};

export default Playlist;