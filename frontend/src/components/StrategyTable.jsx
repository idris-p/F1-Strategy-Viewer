import React, { useState, useEffect } from "react";

function StrategyTable({ year, roundNumber }) {
  const [strategyData, setStrategyData] = useState([]);
  const [grandPrixData, setGrandPrixData] = useState(null);

  const TYRE_COLORS = {
    S: "#E32621",
    M: "#E2CA4D",
    H: "#FFFFFF",
    I: "#158D39",
    W: "#0E639C",
  };

  const TYRE_COLORS_2018 = {
    HS: "#FEB6C2",
    US: "#AE4BA5",
    SS: "#E32621",
    S: "#E2CA4D",
    M: "#FFFFFF",
    H: "#139CF4",
    SH: "#FF803D",
    I: "#158D39",
    W: "#0E639C",
  };

  // NEW – Tyre icon mapping
  const TYRE_IMAGES = {
    HS: "/Hypersoft.png",
    US: "/Ultrasoft.png",
    SS: "/Supersoft.png",
    S: year <= 2018 ? "/Soft_2018.png" : "/Soft.png",
    M: year <= 2018 ? "/Medium_2018.png" : "/Medium.png",
    H: year <= 2018 ? "/Hard_2018.png" : "/Hard.png",
    SH: "/Superhard.png",
    I: "/Intermediate.png",
    W: "/Wet.png",
  };

  useEffect(() => {
    if (year == null || roundNumber == null) return;
    const fetchStrategyData = async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/api/strategies/${year}/${roundNumber}`
      );
      const data = await response.json();
      setStrategyData(data);
    };
    fetchStrategyData();
  }, [year, roundNumber]);

  useEffect(() => {
    if (year == null || roundNumber == null) return;
    const fetchGrandPrixData = async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/api/grand_prix/${year}/${roundNumber}`
      );
      const data = await response.json();
      setGrandPrixData(data);
    };
    fetchGrandPrixData();
  }, [year, roundNumber]);

  // Safe: covers null → undefined → [] → missing index 0
    if (grandPrixData === null) {
    return <div className="text-white text-center">Loading…</div>;
    }

    if (!Array.isArray(grandPrixData) || grandPrixData.length === 0) {
    return <div className="text-white text-center">No race data available</div>;
    }

    // GUARANTEED safe now:
    const totalLaps = grandPrixData[0]?.total_laps ?? 0;

    if (totalLaps === 0) {
    return <div className="text-white text-center">Invalid race data</div>;
    }

  const columnWidth = 40;
  const tableWidth = totalLaps * columnWidth;
  const paddingX = 6;
  const safetyCarLaps = grandPrixData[0]?.safety_car_laps ? JSON.parse(grandPrixData[0].safety_car_laps.replace(/'/g, '"')) : [];
  const yellowFlagLaps = grandPrixData[0]?.yellow_flag_laps ? JSON.parse(grandPrixData[0].yellow_flag_laps.replace(/'/g, '"')) : [];

  return (
    <div className="overflow-x-auto">
      <table
        className="text-center border-collapse table-fixed"
        style={{ width: `${tableWidth}px` }}
      >
        <colgroup>
          {Array.from({ length: totalLaps }).map((_, i) => (
            <col key={i} style={{ width: `${columnWidth}px` }} />
          ))}
        </colgroup>

        <thead>
            <tr>
                <th colSpan={totalLaps} className="border-b border-gray-300 p-2">
                Strategy
                </th>
            </tr>
            <tr>
                {Array.from({ length: totalLaps }).map((_, i) => {
                const lapNumber = i + 1;
                const isSafetyCar = safetyCarLaps.includes(lapNumber);
                const isYellowFlag = yellowFlagLaps.includes(lapNumber);
                let bgColor = "transparent";
                let textColor = "#FFFFFF";

                if (isSafetyCar) {
                    bgColor = "rgba(255, 215, 4, 0.8)";
                    textColor = "#28271A";
                } else if (isYellowFlag) {
                    bgColor = "rgba(255, 244, 0, 0.8)";
                    textColor = "#28271A";
                }

                return (
                    <th
                    key={i}
                    className="border-b border-l border-r border-gray-600 p-2 text-xs"
                    style={{
                        backgroundColor: bgColor,
                        color: textColor,
                    }}
                    >
                    {lapNumber}
                    </th>
                );
                })}
            </tr>
        </thead>

        <tbody>
          {strategyData.map((driverStrategy, rowIndex) => {
            const compounds = JSON.parse(
              driverStrategy.stint_compounds.replace(/'/g, '"')
            );
            const lengths = JSON.parse(driverStrategy.stint_lengths);

            const stints = [];
            let lapCounter = 1;

            for (let i = 0; i < lengths.length; i++) {
              const start = lapCounter;
              const end = lapCounter + lengths[i] - 1;
              stints.push({
                compound: compounds[i],
                startLap: start,
                endLap: end,
              });
              lapCounter = end + 1;
            }

            const getStintForLap = (lap) =>
              stints.find((s) => lap >= s.startLap && lap <= s.endLap);

            return (
              <tr key={rowIndex}>
                {Array.from({ length: totalLaps }).map((_, lapIndex) => {
                  const lapNumber = lapIndex + 1;
                  const stint = getStintForLap(lapNumber);

                  let bgColor = "transparent";
                  let borderRadius = "0";
                  let padLeft = 0;
                  let padRight = 0;

                  if (stint) {
                    const compoundColor =
                      year <= 2018
                        ? TYRE_COLORS_2018[stint.compound]
                        : TYRE_COLORS[stint.compound];

                    bgColor = compoundColor;

                    const isStart = lapNumber === stint.startLap;
                    const isEnd = lapNumber === stint.endLap;

                    if (isStart && isEnd) {
                      borderRadius = "8px";
                      padLeft = padRight = paddingX;
                    } else if (isStart) {
                      borderRadius = "8px 0 0 8px";
                      padLeft = paddingX;
                    } else if (isEnd) {
                      borderRadius = "0 8px 8px 0";
                      padRight = paddingX;
                    }
                  }

                  const innerWidth = `calc(100% - ${padLeft + padRight}px)`;

                  return (
                    <td
                      key={lapIndex}
                      className="border-l border-r border-gray-600 p-0 relative"
                      style={{ height: "34px", verticalAlign: "middle" }}
                    >
                      {/* TYRE ICON — start lap only */}
                      {stint && lapNumber === stint.startLap && (
                        <img
                          src={TYRE_IMAGES[stint.compound]}
                          alt={stint.compound}
                          className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-3/11"
                          style={{ width: "22px", height: "22px" }}
                        />
                      )}

                      {/* Coloured stint bar */}
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: safetyCarLaps.includes(lapNumber)
                            ? `repeating-linear-gradient(
                                45deg,
                                ${lapNumber % 2 === 0 ? "rgba(255, 215, 4, 0.8), rgba(255, 215, 4, 0.8)" : "transparent, transparent"} 4px,
                                ${lapNumber % 2 === 0 ? "transparent, transparent" : "rgba(255, 215, 4, 0.8), rgba(255, 215, 4, 0.8)"} 4px,
                                ${lapNumber % 2 === 0 ? "transparent" : "rgba(255, 215, 4, 0.8)"} 8px
                                )`
                            : yellowFlagLaps.includes(lapNumber)
                            ? "rgba(255, 244, 0, 0.4)"
                            : "transparent",
                        }}
                      >
                        {stint ? (
                          <div
                            style={{
                              width: innerWidth,
                              height: "24px",
                              backgroundColor: bgColor,
                              borderRadius: borderRadius,
                              marginLeft: `${padLeft}px`,
                              marginRight: `${padRight}px`,
                            }}
                          ></div>
                        ) : null}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default StrategyTable;