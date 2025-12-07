import { use, useEffect, useState } from "react";

function Table( { year, roundNumber } ) {
    const [data, setData] = useState([]);

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
        <div>
            <div className="grid grid-cols-5 gap-4 p-4 border-b font-bold">
                <div>
                    <h2>Position</h2>
                </div>
                <div>
                    <h2>Number</h2>
                </div>
                <div>
                    <h2>Driver</h2>
                </div>
                <div>
                    <h2>Constructor</h2>
                </div>
                <div>
                    <h2>Stops</h2>
                </div>
            </div>
            {data.map((driver, index) => (
                <div key={driver.number} className="grid grid-cols-5 gap-4 p-4 border-b">
                    <div>
                        <h2>{driver.finish_position}</h2>
                    </div>
                    <div>
                        <p>{driver.number}</p>
                    </div>
                    <div>
                        <h2>{driver.driver}</h2>
                    </div>
                    <div>
                        <h2>{driver.constructor}</h2>
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