import "../assets/css/sidebar-with-icons.css";
import addBookIcon from "../assets/icons/add-book-icon.svg";
import booksListIcon from "../assets/icons/books-list.svg";
import summarizeIcon from "../assets/icons/summarize-icon.svg";
import PropTypes from "prop-types";

const SidebarWithIcons = ({ onSecondIconClick, onThirdIconClick }) => {
  return (
    <div className="sidebar-with-icons">
      <ul className="menu">
        <li className="item">
          <img src={addBookIcon} alt="Add book" className="icon" />
        </li>
        <li className="item" onClick={onSecondIconClick}>
          <img src={booksListIcon} alt="Seus ebooks" className="icon" />
        </li>
        <li className="item" onClick={onThirdIconClick}>
          <img
            src={summarizeIcon}
            alt="Índices do Ebook aberto"
            className="icon"
          />
        </li>
      </ul>
    </div>
  );
};

SidebarWithIcons.propTypes = {
  onSecondIconClick: PropTypes.func.isRequired,
  onThirdIconClick: PropTypes.func.isRequired,
};

export default SidebarWithIcons;
