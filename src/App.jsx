import "./App.css";
import Header from "./components/Header";
import GameStatus from "./components/GameStatus";
import LanguageList from "./components/LanguageList";
import Word from "./components/Word";
import Keyboard from "./components/Keyboard";
import NewGameButton from "./components/NewGameButton";
import { useEffect, useState } from "react";
import languages from "./data/languages";
import Confetti from "react-confetti";
import { getRandomWord } from "./utils/utils";

function App() {
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
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

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isWrongGuess =
    wrongGuessCount > 0 && !currentWord.includes(lastGuessedLetter);

  useEffect(() => {
    function keyboardPresses(event) {
      if (isGameOver) {
        if (event.key === "Enter") {
          newGame();
        }
        return;
      }

      const enteredKey = event.key;
      const isLetter = /^[a-zA-Z]$/.test(enteredKey);

      if (isLetter) {
        addGuessedLetter(enteredKey.toLowerCase());
      }
    }

    document.body.addEventListener("keydown", keyboardPresses);

    return () => {
      document.body.removeEventListener("keydown", keyboardPresses);
    };
  }, [isGameOver]);

  function addGuessedLetter(letter) {
    setGuessedLetters((prevGuessedLetters) =>
      prevGuessedLetters.includes(letter)
        ? prevGuessedLetters
        : [...prevGuessedLetters, letter]
    );
  }

  function newGame() {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
  }

  return (
    <main>
      <Header />
      <GameStatus
        isGameWon={isGameWon}
        isGameLost={isGameLost}
        isGameOver={isGameOver}
        isWrongGuess={isWrongGuess}
        wrongGuessCount={wrongGuessCount}
      />
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
      {isGameWon && <Confetti recycle={false} numberOfPieces={1200} />}
    </main>
  );
}

export default App;
