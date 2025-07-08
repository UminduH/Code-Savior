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
  const keyboardElements = lowerCaseAlphabet.map((letter) => (
    <button
      key={letter}
      onClick={() => addGuessedLetter(letter)}
      disabled={isGameOver}
      className={
        guessedLetters.includes(letter)
          ? currentWord.includes(letter)
            ? "correct"
            : "incorrect"
          : "available"
      }
    >
      {letter.toUpperCase()}
    </button>
  ));

  return (
    <section className="keyboard" ref={keyboardSectionRef}>
      {keyboardElements}
    </section>
  );
}

export default Keyboard;
