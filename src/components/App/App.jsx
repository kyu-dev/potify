import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import SearchResults from "../SearchResults/SearchResults";
import { searchSpotify } from "../../utils/spotify";

const App = () => {
  const [search, setSearch] = useState(""); // setter pour la barre de recherche
  const [results, setResults] = useState([]); // setter pour les résultats de recherche

  // Ajouter 'async' ici
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await searchSpotify(search); // Utilise la fonction de spotifyApi
    setResults(data); // Met à jour les résultats
  };

  return (
    <div>
      <h1>Recherche de musique</h1>
      <SearchBar search={search} setSearch={setSearch} handleSubmit={handleSubmit} />
      <SearchResults results={results} /> {/* Passe les résultats à SearchResults */}
    </div>
  );
};

export default App;