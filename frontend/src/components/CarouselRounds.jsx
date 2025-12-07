import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function CarouselRounds({ items, roundNumber, onIncrement, onDecrement }) {

    const prevItem = () => {
        onDecrement();
    };

    const nextItem = () => {
        onIncrement();
    };

    if (items.length === 0) {
        return <div className="flex items-center justify-center p-4">Loading…</div>;
    }

    return (
        <div className="flex items-center justify-center w-150 gap-6 p-4">
            <button onClick={prevItem} className="p-3 rounded-2xl shadow hover:scale-105 transition">
                <ChevronLeft size={28} />
            </button>

            <div className="px-6 py-3 w-full rounded-2xl shadow text-xl font-semibold">
                {items[roundNumber - 1]}
            </div>

            <button onClick={nextItem} className="p-3 rounded-2xl shadow hover:scale-105 transition">
                <ChevronRight size={28} />
            </button>
        </div>
    );
}

export default CarouselRounds;