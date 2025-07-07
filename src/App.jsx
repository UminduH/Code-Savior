import "./App.css";
import Header from "./components/Header";
import LanguageList from "./components/LanguageList";
import Word from "./components/Word";
import Keyboard from "./components/Keyboard";
import NewGameButton from "./components/NewGameButton";

function App() {
  return (
    <main>
      <Header />
      <LanguageList />
      <Word />
      <Keyboard />
      <NewGameButton />
    </main>
  );
}

export default App;
