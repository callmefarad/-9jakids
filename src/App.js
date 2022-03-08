import "./App.css";
import GamesByGroup from "./components/Groups/GamesByGroup";
// import Students from "./components/Students/Students";
import Title from "./components/Title/Title";

function App() {
  return (
    <div>
      <Title />
      <GamesByGroup />
      {/* <Students /> */}
    </div>
  );
}

export default App;
