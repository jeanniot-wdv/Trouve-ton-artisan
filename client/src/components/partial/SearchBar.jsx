// components/common/SearchBar.jsx

const SearchBar = ({ searchTerm, setSearchTerm, placeholder }) => {
  return (
    <div className="input-group w-75 mx-auto mb-4">
      <input
        type="text"
        className="form-control form-control-lg px-3 rounded-5"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
