import "./App.css";
import { useState } from "react";
import Carousels from "./components/Carousels.jsx";
import Table from "./components/Table.jsx";

function App() {
  const [year, setYear] = useState(null);
  const [round, setRound] = useState(null);
  const [roundNumber, setRoundNumber] = useState(null);

  return (
    <>
      <Carousels year={year} setYear={setYear} round={round} setRound={setRound} roundNumber={roundNumber} setRoundNumber={setRoundNumber} />
      <Table year={year} roundNumber={roundNumber} />
    </>
  );
}

export default App;
