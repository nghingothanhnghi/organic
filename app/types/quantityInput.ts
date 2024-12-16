// app/types/quantityInput.ts

// Define props with TypeScript
export interface QuantityInputProps {
    value: number;
    min?: number;
    max?: number;
    onChange: (value: number) => void;
}