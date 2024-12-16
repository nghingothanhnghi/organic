// utils/calculate.ts
export const calculateSubtotal = (price: number, quantity: number): number => {
    return price * quantity;
};

export const calculateTotal = (items: { price: number; quantity: number }[]): number => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
};


export const calculateTax = (subtotal: number, taxRate: number): number => {
    return subtotal * taxRate / 100; // Tax rate is assumed to be a percentage
};

export const calculateFinalTotal = (
    items: { price: number; quantity: number }[],
    taxRate: number,
    shippingFee: number
): number => {
    const subtotal = calculateTotal(items);
    const tax = calculateTax(subtotal, taxRate);
    return subtotal + tax + shippingFee;
};