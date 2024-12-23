import PropTypes from "prop-types";
import "../assets/css/sidebar-chapters.css";

const SidebarChapters = ({
  ebookInfo,
  isActive,
  toggleSidebar,
  onSubchapterSelect,
}) => {
  if (!ebookInfo) return null;

  const { title, chapters } = ebookInfo;

  return (
    <div>
      <div
        className={`sidebar-chapters expandable-sidebars ${
          isActive ? "active" : ""
        }`}
      >
        <div className="header">
          <h1 className="title">PlayBook</h1>
          <button className="close-btn" onClick={toggleSidebar}>
            ✕
          </button>
        </div>
        <h2 className="ebook-title">{title}</h2>
        <div className="chapters-container">
          {chapters.map((chapter) => (
            <div key={chapter.chapter_number} className="chapter">
              <h2 className="chapter-title">
                <strong>
                  {String(chapter.chapter_number).padStart(2, "0")}{" "}
                  {chapter.title}
                </strong>
              </h2>
              <ul className="subchapters-list">
                {chapter.subchapters.map((subchapter) => (
                  <li
                    key={subchapter.number}
                    className="subchapter"
                    onClick={() => onSubchapterSelect(chapter, subchapter)}
                  >
                    {subchapter.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

SidebarChapters.propTypes = {
  ebookInfo: PropTypes.shape({
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
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  onSubchapterSelect: PropTypes.func.isRequired,
};

export default SidebarChapters;
