import { useState } from "react";
import SidebarWithIcons from "./SidebarWithIcons";
import SidebarMyEbooks from "./SidebarMyEbooks";
import SidebarChapters from "./SideBarChapters";
import PropTypes from "prop-types";
import "../assets/css/sidebar-scrollbar.css";
import "../assets/css/expandable-sidebars.css";

const SidebarManager = ({
  allBooksTitle,
  selectedEbook,
  handleSubchapterSelection,
}) => {
  const [activeSidebar, setActiveSidebar] = useState(null);

  const toggleMyEbooksSidebar = () => {
    setActiveSidebar((prev) => (prev === "ebooks" ? null : "ebooks"));
  };

  const toggleChaptersSidebar = () => {
    setActiveSidebar((prev) => (prev === "chapters" ? null : "chapters"));
  };

  return (
    <div>
      <SidebarWithIcons
        onSecondIconClick={toggleMyEbooksSidebar}
        onThirdIconClick={toggleChaptersSidebar}
      />
      <SidebarMyEbooks
        ebooks={allBooksTitle}
        isActive={activeSidebar === "ebooks"}
        toggleSidebar={toggleMyEbooksSidebar}
      />
      <SidebarChapters
        ebookInfo={selectedEbook}
        isActive={activeSidebar === "chapters"}
        toggleSidebar={toggleChaptersSidebar}
        onSubchapterSelect={handleSubchapterSelection}
      />
    </div>
  );
};

SidebarManager.propTypes = {
  allBooksTitle: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedEbook: PropTypes.shape({
    title: PropTypes.string.isRequired,
    chapters: PropTypes.arrayOf(
      PropTypes.shape({
        chapter_number: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        subchapters: PropTypes.arrayOf(
          PropTypes.shape({
            number: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
  }).isRequired, // Objeto representando o eBook selecionado
  handleSubchapterSelection: PropTypes.func.isRequired, // Função para lidar com a seleção do capítulo
};

export default SidebarManager;
