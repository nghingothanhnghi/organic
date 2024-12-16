// utils/calculate.ts
export const calculateSubtotal = (price: number, quantity: number): number => {
    return price * quantity;
};

export const calculateTotal = (items: { price: number; quantity: number }[]): number => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
};
