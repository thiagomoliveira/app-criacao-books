import PropTypes from "prop-types";
import "../assets/css/search-bar.css";

const SearchBar = ({ searchTerm, onSearch, placeholder = "Procure..." }) => (
  <div className="search-bar">
    <input
      type="text"
      placeholder={placeholder}
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
    />
  </div>
);

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SearchBar;
