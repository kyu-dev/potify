// Importer le CSS pour le composant SearchBar

const SearchBar = ({search, setSearch, handleSubmit}) => {
  


  return (
    <div className="search-bar p-4 flex-row ">
      <form onSubmit={handleSubmit} className="flex w-full justify-center m-[10px]">
        <input 
          className="lg:w-150 w-full p-4  rounded-l-lg border bg-white transition duration-200 "
          value={search} 
          onChange={(e) => { setSearch(e.target.value); }} 
          placeholder="Rechercher une chanson..."
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-6 py-2 rounded-r-lg hover:bg-blue-600 transition duration-200"
        >
          Rechercher
        </button>
      </form>
    </div>
  )
}

export default SearchBar