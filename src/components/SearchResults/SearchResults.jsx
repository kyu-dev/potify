import React from 'react';

const SearchResults = ({ results }) => {
  return (
    <div>
      {results.length > 0 ? (
        results.map((track, index) => (
          <div key={index}>
            <p>{track.name} - {track.artists.map(artist => artist.name).join(", ")}</p>
          </div>
        ))
      ) : (
        <p>Aucun résultat trouvé.</p>
      )}
    </div>
  );
};

export default SearchResults;