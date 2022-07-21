import "./App.css";
import RandomAnimal from "./components/RandomAnimal";
import { Header } from "./components/Header";
import { Score } from "./components/Score";

function App() {
  return (
    <>
      <Header />
      {/* <Score /> */}
      <RandomAnimal />
    </>
  );
}

export default App;
