import PropTypes from "prop-types";
import "../assets/css/reading-area.css";

const ReadingArea = ({ chapter }) => {
  if (!chapter) {
    return (
      <div className="reading-area-placeholder">
        <p>Selecione um capítulo para começar a leitura.</p>
      </div>
    );
  }

  return (
    <div className="reading-area-content">
      <h1 className="chapter-title">{chapter.title}</h1>

      {chapter.subchapters.length > 0 ? (
        chapter.subchapters.map((subchapter) => (
          <div key={subchapter.number} className="subchapter">
            <h2 className="subchapter-title">{subchapter.title}</h2>
            <p className="subchapter-content">
              Aqui é onde o conteúdo do subtítulo &quot;{subchapter.title}&quot;
              será exibido.
            </p>
          </div>
        ))
      ) : (
        <p>Não há subcapítulos disponíveis para este capítulo.</p>
      )}
    </div>
  );
};

ReadingArea.propTypes = {
  chapter: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subchapters: PropTypes.arrayOf(
      PropTypes.shape({
        number: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
};
export default ReadingArea;
