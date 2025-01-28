import React from "react";
import Tracklist from "../Tracklist/Tracklist";
 // Importer le CSS pour le composant SearchResults
import "../../styles/style.css"
const SearchResults = ({ results, onAdd }) => {
  return (
    
    <div className="search-results p-2 bg-white shadow-lg rounded-lg  w-full">
    <h2 className="text-xl  font-bold lg:mb-10 lg: ">Résultats de recherche</h2>
      <Tracklist tracks={results} onAdd={onAdd} isRemoval={false} />
    </div>
    
  );
};

export default SearchResults;