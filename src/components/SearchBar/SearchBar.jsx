import './SearchBar.css'; // Importer le CSS pour le composant SearchBar

const SearchBar = ({search, setSearch, handleSubmit}) => {
  


  return (
    <div className="search-bar">
      
      <input value={search} onChange={(e)=>{setSearch(e.target.value)}} />
      <button onClick={handleSubmit}>Search</button>
      
    </div>
  )
}

export default SearchBar