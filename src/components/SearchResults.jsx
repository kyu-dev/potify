import React from "react";
import Tracklist from "./Tracklist";
import "../../public/style.css";
const SearchResults = ({ results, onAdd }) => {
  return (
    <div className="search-results p-4 bg-[var(--secondary-color)] shadow-lg rounded-lg  ">
      <h2 className="text-xl text-[var(--primary-color)] font-bold mb-10">
        Résultats de recherche
      </h2>
      <div className="results-container overflow-y-scroll lg:h-[50vh] h-[30vh]">
      <Tracklist tracks={results} onAdd={onAdd} isRemoval={false} />
      </div>
    </div>
  );
};

export default SearchResults;
