// app/types/quantityInput.ts

// Define props with TypeScript
export interface QuantityInputProps {
    quantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
    onChange: (newQuantity: number) => void;
}