import { use, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function CarouselYear({ items, currentYear, onIncrement, onDecrement }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const yearIndex = items.indexOf(currentYear);
        if (yearIndex !== -1) {
            setIndex(yearIndex);
        }
    }, [currentYear, items]);

    // Carousel starts at the last year available
    useEffect(() => {
        if (items.length > 0) {
            setIndex(items.length - 1);
        }
    }, [items]);

    const prevItem = () => {
        setIndex((prevIndex) => (prevIndex - 1));
        onDecrement();
    };

    const nextItem = () => {
        setIndex((prevIndex) => (prevIndex + 1));
        onIncrement();
    };

    // Wrap around the carousel
    useEffect(() => {
        if (index < 0) {
            setIndex(items.length - 1);
        }
        else if (index >= items.length) {
            setIndex(0);
        }
    }, [index]);


    if (items.length === 0) {
        return <div className="flex items-center justify-center p-4">Loading…</div>;
    }

    return (
        <div className="flex items-center justify-center w-150 gap-6 p-4">
            <button onClick={prevItem} className="p-3 rounded-2xl shadow hover:scale-105 transition">
                <ChevronLeft size={28} />
            </button>

            <div className="px-6 py-3 w-full rounded-2xl shadow text-xl font-semibold">
                {items[index]}
            </div>

            <button onClick={nextItem} className="p-3 rounded-2xl shadow hover:scale-105 transition">
                <ChevronRight size={28} />
            </button>
        </div>
    );
}

export default CarouselYear;