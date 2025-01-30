// Importer le CSS pour le composant SearchBar
import "../../public/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ search, setSearch, handleSubmit }) => {
  return (
    <div className="search-bar flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center px-4 w-[90%] md:w-[60%] lg:max-w-[800px] gap-4 bg-[var(--secondary-color)] rounded-full"
      >
        <button type="submit" className="">
          <FontAwesomeIcon
            icon={faSearch}
            className="text-[var(--primary-color)]"
          />
        </button>
        <input
          className="w-full py-4 text-[var(--primary-color)]"
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
