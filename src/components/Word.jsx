function Word({ currentWord, guessedLetters, isGameLost }) {
  const letterElements = currentWord.split("").map((letter, index) => (
    <span
      key={index}
      style={{
        color: isGameLost && !guessedLetters.includes(letter) && "#ec5d49",
      }}
    >
      {guessedLetters.includes(letter)
        ? letter.toUpperCase()
        : isGameLost
        ? letter.toUpperCase()
        : ""}
    </span>
  ));

  return (
    <section className="current-word">
      <div className="letters">{letterElements}</div>
      <p className="word-length">Word length: {currentWord.length}</p>
    </section>
  );
}

export default Word;
