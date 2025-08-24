// components/common/SearchBar.jsx

const SearchBar = ({ searchTerm, setSearchTerm, placeholder }) => {
  return (
    <div className="categories-search mb-4">
      <div className="input-group mx-auto search-group">
        <input
          type="text"
          className="form-control form-control-lg search-input"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="input-group-text search-icon">
          <i className="bi bi-search"></i>
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
