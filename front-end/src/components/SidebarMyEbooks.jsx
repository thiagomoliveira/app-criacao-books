import { useState } from "react";
import PropTypes from "prop-types";
import SearchBar from "./SearchBar";
import "../assets/css/sidebar-my-ebooks.css";

const SidebarMyEbooks = ({ ebooks, isActive, toggleSidebar }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEbooks, setFilteredEbooks] = useState(ebooks);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setFilteredEbooks(
      ebooks.filter((ebook) => ebook.toLowerCase().includes(term.toLowerCase()))
    );
  };

  return (
    <div
      className={`expandable-sidebars sidebar-my-ebooks ${
        isActive ? "active" : ""
      }`}
    >
      <div className="header">
        <h1 className="title">PlayBook</h1>
        <button className="close-btn" onClick={toggleSidebar}>
          ✕
        </button>
      </div>
      <h2 className="subtitle">Meus Ebooks</h2>
      <SearchBar
        searchTerm={searchTerm}
        onSearch={handleSearch}
        placeholder="Procure o livro por nome ou capítulo"
      />
      <ul className="ebook-list">
        {filteredEbooks.map((item, index) => (
          <li key={index} className={"ebook-item"}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

SidebarMyEbooks.propTypes = {
  ebooks: PropTypes.arrayOf(PropTypes.string).isRequired,
  isActive: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default SidebarMyEbooks;
