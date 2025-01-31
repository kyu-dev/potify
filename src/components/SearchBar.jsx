// Importer le CSS pour le composant SearchBar
import "../../public/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ search, setSearch, handleSubmit }) => {
  return (
    <div className="search-bar flex justify-center pt-20  ">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center
         px-4 w-full sm:w-[70%] lg:max-w-[800px] gap-4 
         bg-[var(--secondary-color)] 
         hover:bg-[var(--quaternary-color)]
         rounded-full 
         focus-within:border-2 focus-within:border-[var(--primary-color)]  border-2 border-transparent transition duration-200"
      >
        <button type="submit" className="">
          <FontAwesomeIcon
            icon={faSearch}
            className="text-[var(--primary-color)]"
          />
        </button>
        <input
          className="w-full py-4 text-[var(--primary-color)] focus:outline-none" // Suppression du focus bleu
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Rechercher une chanson..."
        />
      </form>
    </div>
  );
};

export default SearchBar;
