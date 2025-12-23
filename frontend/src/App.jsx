import "./App.css";
import { useState } from "react";
import Carousels from "./components/Carousels.jsx";
import Table from "./components/Table.jsx";
import StrategyTable from "./components/StrategyTable.jsx";
import AvailableCompounds from "./components/AvailableCompounds.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  const [year, setYear] = useState(null);
  const [round, setRound] = useState(null);
  const [roundNumber, setRoundNumber] = useState(null);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center pt-6">
        <Carousels year={year} setYear={setYear} round={round} setRound={setRound} roundNumber={roundNumber} setRoundNumber={setRoundNumber} />
      </div>
      <div className="flex flex-col items-center">
        <AvailableCompounds year={year} roundNumber={roundNumber} />
      </div>
      <div className="flex flex-row items-center">
        <Table year={year} roundNumber={roundNumber} />
        <StrategyTable year={year} roundNumber={roundNumber} />
      </div>
    </div>
  );
}

export default App;
