import React from "react";

const Track = ({ track, onAdd, onRemove, isRemoval }) => {
  // On récupère les informations nécessaires pour afficher la chanson et l'album
  const { name, artists, album } = track;
  const artistNames = artists.map((artist) => artist.name).join(", "); // Combine les noms des artistes
  const albumName = album.name; // Nom de l'album
  const albumImage = album.images[0]?.url; // Image de l'album (optionnel)

  // Affiche un bouton "Ajouter" ou "Retirer" en fonction de la prop `isRemoval`
  const renderAction = () => {
    if (isRemoval) {
      return <button onClick={() => onRemove(track)}>- Retirer</button>; // Si `isRemoval` est vrai, afficher le bouton pour retirer
    }
    return <button onClick={() => onAdd(track)}>+ Ajouter</button>; // Sinon, afficher le bouton pour ajouter
  };

  return (
    <div className="track">
      <h3>{name}</h3>
      <p>{artistNames} || {albumName}</p>
      {albumImage && <img src={albumImage} alt={albumName} width={100} />} 
      {renderAction()} {/* Affiche le bouton Ajouter/Retirer */}
    </div>
  );
};

export default Track;