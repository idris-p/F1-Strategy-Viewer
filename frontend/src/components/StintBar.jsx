function StintBar({ compounds, lengths, totalLaps, year }) {
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
        W: "#0E639C"
    };

    // Build stints
    let startLap = 1;
    const stints = compounds.map((c, i) => {
        const stint = { compound: c, start: startLap, length: lengths[i] };
        startLap += lengths[i];
        return stint;
    });

    return (
        <div className="relative w-full h-12">
            {stints.map((stint, idx) => {
                const left = ((stint.start - 1) / totalLaps) * 100;
                const width = (stint.length / totalLaps) * 100;

                return (
                    <div
                        key={idx}
                        className="absolute h-full rounded-lg flex items-center"
                        style={{
                            left: `${left}%`,
                            width: `${width}%`,
                            backgroundColor:
                                year === 2018
                                    ? TYRE_COLORS_2018[stint.compound]
                                    : TYRE_COLORS[stint.compound],
                            opacity: 0.9,
                        }}
                    >
                        <div className="ml-1 text-xs font-bold bg-black text-white rounded-full w-6 h-6 flex items-center justify-center">
                            {stint.compound}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default StintBar;
