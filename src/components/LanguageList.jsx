import languages from "../data/languages";

function LanguageList({ wrongGuessCount }) {
  const languageElements = languages.map((language, index) => (
    <span
      key={language.name}
      className={`language ${index < wrongGuessCount ? "lost" : ""}`}
      style={{
        backgroundColor: language.backgroundColor,
        color: language.color,
      }}
    >
      {language.name}
    </span>
  ));
  return <section className="language-list">{languageElements}</section>;
}

export default LanguageList;
