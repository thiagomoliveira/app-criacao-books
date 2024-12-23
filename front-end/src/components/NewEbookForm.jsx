import { useState } from "react";
import SearchBar from "./SearchBar";
import "../assets/css/new-ebook-form.css";

const NewEbookForm = () => {
  const [playlistLink, setPlaylistLink] = useState("");

  const handleSearch = (value) => {
    setPlaylistLink(value);
  };

  return (
    <div className="new-ebook-form">
      <h2 className="title">Criar um novo Ebook</h2>
      <SearchBar
        searchTerm={playlistLink}
        onSearch={handleSearch}
        placeholder="Cole aqui o link de uma playlist do YouTube e tenha uma base para os capítulos"
      />
      <a href="#" className="text-link">
        Criar os capítulos do zero
      </a>
    </div>
  );
};

export default NewEbookForm;
