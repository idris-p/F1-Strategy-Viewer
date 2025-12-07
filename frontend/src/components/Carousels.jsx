import { use, useEffect, useState } from "react";
import CarouselYear from "./CarouselYear.jsx";
import CarouselRounds from "./CarouselRounds.jsx";

function Carousels( { year, setYear, round, setRound, roundNumber, setRoundNumber } ) {
  const [availableYears, setAvailableYears] = useState([]);
  const [availableRounds, setAvailableRounds] = useState([]);
  const [availableRoundNumbers, setAvailableRoundNumbers] = useState([]);
  const [pendingIndex, setPendingIndex] = useState(0); // Coded variable to track which round to select after year change

  // Load available years at startup
  useEffect(() => {
    const fetchAvailableYears = async () => {
        const response = await fetch("http://127.0.0.1:8000/api/available_years");
        const data = await response.json();

        setAvailableYears(data["available_years"]);
    };
    fetchAvailableYears();
  }, []);

  // Once available years are loaded, set the initial year to the latest year
  useEffect(() => {
    setYear(availableYears[availableYears.length - 1]);
  }, [availableYears]);

  // Load available rounds whenever the year changes
  useEffect(() => {
    if (year == null) return;
    const fetchAvailableRounds = async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/api/available_rounds/${year}`
      );
      const data = await response.json();

      const rounds = Object.values(data["available_rounds"]);
      const roundNums = Object.keys(data["available_rounds"]).map(Number);

      setAvailableRounds(rounds);
      setAvailableRoundNumbers(roundNums);

      // Choose which round to select based on pendingIndex
      if (pendingIndex === 0) {
        setRoundNumber(roundNums[0] || 1); // first round
      }
      else if (pendingIndex === 1) {
        setRoundNumber(roundNums[roundNums.length - 1] || 1); // last round
      }
      else if (pendingIndex === 2) {
        // Find the index of the current round in the new rounds and set it to that if it exists
        const currentRoundIndex = rounds.indexOf(round);
        if (currentRoundIndex !== -1) {
          setRoundNumber(roundNums[currentRoundIndex]);
        }
        else {
          setRoundNumber(roundNums[0] || 1); // default to first round
        }
      }
      setPendingIndex(0);
    };
    fetchAvailableRounds();
  }, [year]);

  // Update round whenever roundNumber changes
  useEffect(() => {
    setRound(availableRounds[roundNumber - 1]);
  }, [roundNumber]);

  
  return (
    <>
      <CarouselYear
        items={availableYears}
        currentYear={year}
        onIncrement={() => {
          if (availableYears.includes(year + 1)) {
            setYear(year + 1);
          }
          else {
            setYear(availableYears[0]);
          }
          setPendingIndex(2);
        }}
        onDecrement={() => {
          if (availableYears.includes(year - 1)) {
            setYear(year - 1);
          }
          else {
            setYear(availableYears[availableYears.length - 1]);
          }
          setPendingIndex(2);
        }}
      />
      <CarouselRounds
        items={availableRounds}
        roundNumber={roundNumber}
        onIncrement={() => {
          // Check if next round exists in the same year
          if (availableRoundNumbers.includes(roundNumber + 1)) {
            setRoundNumber(roundNumber + 1);
          }
          else {
            if (availableYears.includes(year + 1)) {
              setPendingIndex(0);
              setYear(year + 1);
            }
          };
        }}
        onDecrement={() => {
          if (availableRoundNumbers.includes(roundNumber - 1)) {
            setRoundNumber(roundNumber - 1);
          }
          else {
            if (availableYears.includes(year - 1)) {
              setPendingIndex(1);
              setYear(year - 1);
            }
          };
        }}
      />
    </>
  );
}

export default Carousels;
