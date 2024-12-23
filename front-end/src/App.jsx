import { useState } from "react";
import SidebarManager from "./components/SidebarManager";
import NewEbookForm from "./components/NewEbookForm";
import ReadingArea from "./components/ReadingArea";
import MockData from "./assets/mock_data/ebook_chapters.json";
import "../src/assets/css/general-styles.css";

const App = () => {
  const ebook = MockData.book;
  const allBooksTitle = [
    "Livro 1",
    "Livro 2",
    "Livro 3",
    "Livro 4",
    "Livro 5",
    "Livro 6",
    "Livro 7",
    "Livro 8",
    "Livro 9",
    "Livro 10",
    "Livro 11",
    "Livro 12",
    "Livro 13",
    "Livro 14",
    "Livro 15",
  ];

  const [selectedSubchapter, setSelectedSubchapter] = useState(
    ebook.chapters[0],
    ebook.chapters[0].subchapters[0]
  );

  const handleSubchapterSelection = (chapter, subchapter) => {
    const fullChapter = ebook.chapters.find(
      (ch) => ch.chapter_number === chapter.chapter_number
    );

    setSelectedSubchapter({
      ...fullChapter,
      selectedSubchapter: subchapter,
    });
  };

  return (
    <div className="App">
      <SidebarManager
        allBooksTitle={allBooksTitle}
        selectedEbook={ebook}
        handleSubchapterSelection={handleSubchapterSelection}
      />
      <div className="new-ebook-form-container">
        <NewEbookForm />
      </div>
      <div className="reading-area">
        <ReadingArea chapter={selectedSubchapter} />
      </div>
    </div>
  );
};

export default App;
