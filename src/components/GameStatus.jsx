import clsx from "clsx";
import languages from "../data/languages";
import { getFarewellText } from "../utils/utils";

function GameStatus({
  isGameWon,
  isGameLost,
  isGameOver,
  isWrongGuess,
  wrongGuessCount,
}) {
  function renderGameStatus() {
    if (!isGameOver && isWrongGuess) {
      const lostLanguage = languages.at(wrongGuessCount - 1).name;
      return <p>{getFarewellText(lostLanguage)}</p>;
    }

    if (isGameWon) {
      return (
        <>
          <h2>You Win!</h2>
          <p>You've outsmarted extinction. The dev world thanks you! 🙌</p>
        </>
      );
    }

    if (isGameLost) {
      return (
        <>
          <h2>Game Over!</h2>
          <p>All programming languages have vanished... forever. 💀</p>
        </>
      );
    }

    return <p>Keep decoding—the programming world is counting on you.</p>;
  }

  const className = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isWrongGuess && wrongGuessCount > 0,
    neutral: !isGameOver && !(isWrongGuess && wrongGuessCount > 0),
  });

  return <section className={className}>{renderGameStatus()}</section>;
}

export default GameStatus;
