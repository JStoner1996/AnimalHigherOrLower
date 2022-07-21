
import "./App.css";
import RandomAnimal from "./components/RandomAnimal";
import Popup from "./components/Popup";

function App() {

  return (
    <>
      <h1>Welcome to Re-Animal </h1>
      <p className="text-center">Click the name of the Animal that you think lives longer.</p>
      <RandomAnimal />
      {/* <Popup /> */}
    </>
  );
}



export default App;
