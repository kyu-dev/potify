import React from "react";
import './Track.css'; // Importer le CSS pour le composant Track

const Track = ({ track, onAdd, onRemove, isRemoval }) => {
  if (!track || !track.name || !track.artists || !track.album) {
    return <p>Track information is not available.</p>;
  }

  const { name, artists, album } = track;
  const artistNames = artists.map((artist) => artist.name).join(", ");
  const albumName = album.name;
  const albumImage = album.images[0]?.url;

  const renderAction = () => {
    if (isRemoval) {
      return <button onClick={() => onRemove(track)}>- Retirer</button>;
    }
    return <button onClick={() => onAdd(track)}>+ Ajouter</button>;
  };

  return (
    <div className="track">
      {albumImage && <img src={albumImage} alt={albumName} />}
      <div className="track-info">
        <h3>{name}</h3>
        <p>{artistNames} || {albumName}</p>
      </div>
      {renderAction()}
    </div>
  );
};

export default Track;