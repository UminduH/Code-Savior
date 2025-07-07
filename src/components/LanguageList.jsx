import languages from "../data/languages";

function LanguageList() {
  const languageElements = languages.map((language) => (
    <span
      key={language.name}
      className="language"
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
