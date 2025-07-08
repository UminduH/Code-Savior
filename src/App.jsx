import "./App.css";
import Header from "./components/Header";
import GameStatus from "./components/GameStatus";
import LanguageList from "./components/LanguageList";
import Word from "./components/Word";
import Keyboard from "./components/Keyboard";
import NewGameButton from "./components/NewGameButton";
import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import { getRandomLanguages, getRandomWord } from "./utils/utils";

function App() {
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [languageList, setLanguageList] = useState(() => getRandomLanguages());

  const keyboardSectionRef = useRef(null);

  const guessesLeft = languageList.length;
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
    if (isGameOver && keyboardSectionRef.current) {
      keyboardSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isGameOver]);

  useEffect(() => {
    function keyboardPresses(event) {
      if (isGameOver) {
        keyboardSectionRef.current.scrollIntoView({ behavior: "smooth" });

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
    setLanguageList(getRandomLanguages());
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
      <LanguageList
        wrongGuessCount={wrongGuessCount}
        languageList={languageList}
      />
      <Word
        currentWord={currentWord}
        guessedLetters={guessedLetters}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
      />
      <Keyboard
        guessedLetters={guessedLetters}
        currentWord={currentWord}
        addGuessedLetter={addGuessedLetter}
        isGameOver={isGameOver}
        keyboardSectionRef={keyboardSectionRef}
      />
      {isGameOver && <NewGameButton newGame={newGame} />}
      {isGameWon && <Confetti recycle={false} numberOfPieces={1200} />}
    </main>
  );
}

export default App;
