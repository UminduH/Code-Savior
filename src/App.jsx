import "./App.css";
import Header from "./components/Header";
import LanguageList from "./components/LanguageList";
import Word from "./components/Word";
import Keyboard from "./components/Keyboard";
import NewGameButton from "./components/NewGameButton";
import { useState } from "react";
import languages from "./data/languages";

function App() {
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetters, setGuessedLetters] = useState([]);

  const guessesLeft = languages.length;
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const isGameLost = wrongGuessCount >= guessesLeft;
  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isGameOver = isGameLost || isGameWon;

  function addGuessedLetter(letter) {
    setGuessedLetters((prevGuessedLetters) =>
      prevGuessedLetters.includes(letter)
        ? prevGuessedLetters
        : [...prevGuessedLetters, letter]
    );
  }

  function newGame() {
    setCurrentWord("library");
    setGuessedLetters([]);
  }

  return (
    <main>
      <Header />
      <LanguageList wrongGuessCount={wrongGuessCount} />
      <Word
        currentWord={currentWord}
        guessedLetters={guessedLetters}
        isGameLost={isGameLost}
      />
      <Keyboard
        guessedLetters={guessedLetters}
        currentWord={currentWord}
        addGuessedLetter={addGuessedLetter}
        isGameOver={isGameOver}
      />
      {isGameOver && <NewGameButton newGame={newGame} />}
    </main>
  );
}

export default App;
