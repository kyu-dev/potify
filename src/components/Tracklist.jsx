import React from "react";
import Track from "./Track";

 // Importer le CSS pour le composant Tracklist

const Tracklist = ({ tracks, onAdd, onRemove, isRemoval }) => {
  return (
    <div className="track-list">
      {tracks.map((track) => (
        <Track
          key={track.id}
          track={track}
          onAdd={onAdd}
          onRemove={onRemove}
          isRemoval={isRemoval}
        />
      ))}
    </div>
  );
};

export default Tracklist;