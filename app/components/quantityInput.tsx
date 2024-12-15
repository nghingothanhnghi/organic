// app/components/quantityInput.tsx
import type { QuantityInputProps } from "~/types/quantityInput";

const QuantityInput: React.FC<QuantityInputProps> = ({ quantity, onIncrement, onDecrement, onChange }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = Number(e.target.value);
        if (newQuantity > 0) {
            onChange(newQuantity); // Call onChange with the new quantity value
        }
    };

    return (
        <div className="flex items-center space-x-2">
            <button
                onClick={onDecrement}
                disabled={quantity <= 1}
                className="p-2 rounded border border-gray-300 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>

            </button>
            <input
                type="number"
                value={quantity}
                onChange={handleInputChange}
                className="w-16 px-2 py-1 text-center border border-gray-300 rounded focus:ring focus:ring-blue-500 focus:outline-none"
            />
            <button
                onClick={onIncrement}
                className="p-2 rounded border border-gray-300 bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </div>
    );
};

export default QuantityInput;
