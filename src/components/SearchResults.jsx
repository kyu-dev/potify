import React from "react";
import Tracklist from "./Tracklist";
import "../../public/style.css";
const SearchResults = ({ results, onAdd }) => {
  return (
    <div className="search-results p-4 bg-[var(--secondary-color)] shadow-lg rounded-lg h-[60vh] ">
      <h2 className="text-xl text-[var(--primary-color)] font-bold mb-10">
        Résultats de recherche
      </h2>
      <div className="results-container overflow-y-auto h-[85%]">
      <Tracklist tracks={results} onAdd={onAdd} isRemoval={false} />
      </div>
    </div>
  );
};

export default SearchResults;
