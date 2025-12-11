import "./App.css";
import { useState } from "react";
import Carousels from "./components/Carousels.jsx";
import Table from "./components/Table.jsx";
import StrategyTable from "./components/StrategyTable.jsx";

function App() {
  const [year, setYear] = useState(null);
  const [round, setRound] = useState(null);
  const [roundNumber, setRoundNumber] = useState(null);

  return (
    <>
      <div className="flex flex-col items-center">
        <Carousels year={year} setYear={setYear} round={round} setRound={setRound} roundNumber={roundNumber} setRoundNumber={setRoundNumber} />
      </div>
      <div className="flex flex-col items-center">
        <Table year={year} roundNumber={roundNumber} />
      </div>
      <br />
      <div>
        <StrategyTable year={year} roundNumber={roundNumber} />
      </div>
    </>
  );
}

export default App;
