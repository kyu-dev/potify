import React from "react";
import Tracklist from "../Tracklist/Tracklist";

const SearchResults = ({ results, onAdd }) => {
  return (
    <div className="search-results">
      <h2>Résultats de recherche</h2>
      <Tracklist tracks={results} onAdd={onAdd} isRemoval={false} />
      {/* `isRemoval` est false car ici, on veut ajouter des morceaux */}
    </div>
  );
};

export default SearchResults;