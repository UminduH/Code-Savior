import { clsx } from "clsx";

function Word({ currentWord, guessedLetters, isGameLost, isGameWon }) {
  const letterElements = currentWord.split("").map((letter, index) => {
    const className = clsx({
      lost: isGameLost && !guessedLetters.includes(letter),
      won: isGameWon,
    });

    return (
      <span key={index} className={className}>
        {guessedLetters.includes(letter)
          ? letter.toUpperCase()
          : isGameLost
          ? letter.toUpperCase()
          : ""}
      </span>
    );
  });

  return (
    <section className="current-word">
      <div className="letters">{letterElements}</div>
      <p className="word-length">Word length: {currentWord.length}</p>
    </section>
  );
}

export default Word;
