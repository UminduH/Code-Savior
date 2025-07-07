function Keyboard() {
  const lowerCaseAlphabet = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode(97 + index)
  );
  const keyboardElements = lowerCaseAlphabet.map((letter) => (
    <button key={letter}>{letter.toUpperCase()}</button>
  ));

  return <section className="keyboard">{keyboardElements}</section>;
}

export default Keyboard;
