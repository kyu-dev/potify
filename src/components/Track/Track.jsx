import React from "react";
import "../../styles/style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

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
      return (
        <button className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded transition duration-200" onClick={() => onRemove(track)}>
          <FontAwesomeIcon icon={faMinus} /> 
        </button>
      );
    }
    return (
      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition duration-200" onClick={() => onAdd(track)}>
        <FontAwesomeIcon icon={faPlus} /> 
      </button>
    );
  };

  return (
    <div className="track flex items-center p-4 border-b border-gray-300 hover:bg-gray-200 transition duration-200">
      {albumImage && <img className="w-16 h-16 mr-4 rounded-lg shadow" src={albumImage} alt={albumName} />}
      <div className="track-info flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600">{artistNames} || {albumName}</p>
      </div>
      {renderAction()}
    </div>
  );
};

export default Track;