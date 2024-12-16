// app/components/quantityInput.tsx
import type { QuantityInputProps } from "~/types/quantityInput";

const QuantityInput: React.FC<QuantityInputProps> = ({ value, min = 1, max = Infinity, onChange }) => {
    const handleIncrease = () => {
        if (value < max) {
            onChange(value + 1);
        }
    };

    const handleDecrease = () => {
        if (value > min) {
            onChange(value - 1);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Math.max(min, Math.min(max, Number(e.target.value)));
        if (!isNaN(newValue)) {
            onChange(newValue);
        }
    };

    return (
        <div className="flex items-center space-x-2">
            <button
                onClick={handleDecrease}
                disabled={value <= min}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>

            </button>
            <input
                type="number"
                value={value}
                onChange={handleInputChange}
                className="w-12 text-center border rounded-md"
                min={min}
                max={max}
            />
            <button
                onClick={handleIncrease}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                disabled={value >= max}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </div>
    );
};

export default QuantityInput;
