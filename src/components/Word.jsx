function Word() {
  const currentWord = "react";
  const letterElements = currentWord
    .split("")
    .map((letter, index) => <span key={index}>{letter.toUpperCase()}</span>);

  return <section className="current-word">{letterElements}</section>;
}

export default Word;
