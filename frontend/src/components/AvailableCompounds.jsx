import React, { useState, useEffect } from "react";

function AvailableCompounds({ year, roundNumber }) {
    const [availableCompounds, setAvailableCompounds] = useState([]);

    const compoundImages = {
        "SOFT": year !== 2018 ? "/Soft.png" : "/Soft_2018.png",
        "MEDIUM": year !== 2018 ? "/Medium.png" : "/Medium_2018.png",
        "HARD": year !== 2018 ? "/Hard.png" : "/Hard_2018.png",
        "INTERMEDIATE": "/Intermediate.png",
        "WET": "/Wet.png",
        "HYPERSOFT": "/Hypersoft.png",
        "ULTRASOFT": "/Ultrasoft.png",
        "SUPERSOFT": "/Supersoft.png",
        "SUPERHARD": "/Superhard.png"
    };

    useEffect(() => {
        if (year == null || roundNumber == null) return;
            const fetchGrandPrixData = async () => {
            const response = await fetch(
                `http://127.0.0.1:8000/api/grand_prix/${year}/${roundNumber}`
            );
            const data = await response.json();
            setAvailableCompounds(JSON.parse(data[0].available_compounds.replace(/'/g, '"')));
            };
            fetchGrandPrixData();
        }, [year, roundNumber]);

    if (year == 2018) {
        return (
            <div className="flex flex-col items-center justify-center">
                <div className="text-lg font-bold flex flex-row items-center mb-2">
                    <h2 className="mt-6 mb-4">Available Compounds</h2>
                </div>
                <div className="flex flex-row space-x-20">
                    {availableCompounds.map((compound) => (
                    <div key={compound} className="flex flex-col items-center w-20">
                        <img src={compoundImages[compound]} alt={compound} className="h-12" />
                        <p className="text-sm mt-2"><strong>{compound}</strong></p>
                    </div>
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex flex-col items-center justify-center">
                <div className="text-lg font-bold flex flex-row items-center mb-2">
                    <h2 className="mt-6 mb-4">Available Compounds</h2>
                </div>
            <div className="flex flex-row space-x-20">
                <div className="flex flex-col items-center w-20">
                    <img src={compoundImages["SOFT"]} alt="SOFT" className="h-12" />
                    <p className="text-sm mt-2"><strong>{availableCompounds[0]}</strong></p>
                </div>
                <div className="flex flex-col items-center w-20">
                    <img src={compoundImages["MEDIUM"]} alt="MEDIUM" className="h-12" />
                    <p className="text-sm mt-2"><strong>{availableCompounds[1]}</strong></p>
                </div>
                <div className="flex flex-col items-center w-20">
                    <img src={compoundImages["HARD"]} alt="HARD" className="h-12" />
                    <p className="text-sm mt-2"><strong>{availableCompounds[2]}</strong></p>
                </div>
            </div>
            </div>
        );
    }
}

export default AvailableCompounds;