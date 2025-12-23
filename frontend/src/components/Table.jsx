import { use, useEffect, useState } from "react";

function Table( { year, roundNumber } ) {
    const [data, setData] = useState([]);

    const CONSTRUCTOR_IMAGES = {
        "Alfa Romeo": "/Alfa_Romeo.png",
        "Alfa Romeo Racing": "/Alfa_Romeo.png",
        "AlphaTauri": "/AlphaTauri.png",
        "Alpine": "/Alpine.png",
        "Aston Martin": "/Aston_Martin.png",
        "Ferrari": "/Ferrari.png",
        "Force India": "/Force_India.png",
        "Haas F1 Team": "/Haas.png",
        "Kick Sauber": "/Kick_Sauber.png",
        "McLaren": "/McLaren.png",
        "Mercedes": "/Mercedes.png",
        "Racing Bulls": "/Racing_Bulls.png",
        "Racing Point": "/Racing_Point.png",
        "RB": "/Racing_Bulls.png",
        "Red Bull Racing": "/Red_Bull.png",
        "Renault": "/Renault.png",
        "Sauber": "/Sauber.png",
        "Toro Rosso": "/Toro_Rosso.png",
        "Williams": "/Williams.png"
    };

    // Load strategy data for current Grand Prix
    useEffect(() => {
        if (year == null || roundNumber == null) return;
        const fetchStrategyData = async () => {
            const response = await fetch(
                `http://127.0.0.1:8000/api/strategies/${year}/${roundNumber}`
            );
            const data = await response.json();
            setData(data);
        }
        fetchStrategyData();
    }, [year, roundNumber]);

    return (
        <div style={{ minWidth: "300px" }}>
            <div className="grid grid-cols-5 gap-4 p-4 border-b font-bold">
                <div>
                    <h2>Pos</h2>
                </div>
                <div>
                    <h2>No</h2>
                </div>
                <div>
                    <h2>Driver</h2>
                </div>
                <div>
                    <h2>Team</h2>
                </div>
                <div>
                    <h2>Stops</h2>
                </div>
            </div>
            {data.map((driver, index) => (
                <div key={driver.number} className="grid grid-cols-5 gap-4 p-4 border-b">
                    <div>
                        <h2><strong>{driver.finish_position}</strong></h2>
                    </div>
                    <div>
                        <p>{driver.number}</p>
                    </div>
                    <div>
                        <h2>{driver.driver}</h2>
                    </div>
                    <div>
                        <img src={CONSTRUCTOR_IMAGES[driver.constructor]} alt={driver.constructor} className="inline-block h-6" style={{ height: "25px" }} />
                    </div>
                    <div>
                        <h2>{driver.total_stops}</h2>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Table;