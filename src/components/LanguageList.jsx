import clsx from "clsx";

function LanguageList({ wrongGuessCount, languageList }) {
  const languageElements = languageList.map((language, index) => {
    const className = clsx("language", {
      lost: index < wrongGuessCount,
    });

    return (
      <span
        key={language.name}
        className={className}
        style={{
          backgroundColor: language.backgroundColor,
          color: language.color,
        }}
      >
        {language.name}
      </span>
    );
  });
  return <section className="language-list">{languageElements}</section>;
}

export default LanguageList;
