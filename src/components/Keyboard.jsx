import clsx from "clsx";

function Keyboard({
  guessedLetters,
  currentWord,
  addGuessedLetter,
  isGameOver,
  keyboardSectionRef,
}) {
  const lowerCaseAlphabet = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode(97 + index)
  );
  const keyboardElements = lowerCaseAlphabet.map((letter) => {
    const className = clsx({
      available: !guessedLetters.includes(letter),
      correct: guessedLetters.includes(letter) && currentWord.includes(letter),
      incorrect:
        guessedLetters.includes(letter) && !currentWord.includes(letter),
    });

    return (
      <button
        key={letter}
        onClick={() => addGuessedLetter(letter)}
        disabled={isGameOver}
        className={className}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  return (
    <section className="keyboard" ref={keyboardSectionRef}>
      {keyboardElements}
    </section>
  );
}

export default Keyboard;
