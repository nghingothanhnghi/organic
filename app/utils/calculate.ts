// utils/calculate.ts

// Calculate subtotal for an item (considering discount if available)
export const calculateSubtotal = (price: number, quantity: number, discountPrice?: number): number => {
    const finalPrice = discountPrice && discountPrice < price ? discountPrice : price; // Use discountPrice if available, otherwise use regular price
    return finalPrice * quantity;
};

// Calculate total for all items in the cart
export const calculateTotal = (items: { price: number; quantity: number; discountPrice?: number }[]): number => {
    return items.reduce((total, item) => {
        const { price, quantity, discountPrice } = item;
        return total + calculateSubtotal(price, quantity, discountPrice); // Use the correct price for each item
    }, 0);
};

// Calculate tax based on subtotal and tax rate
export const calculateTax = (subtotal: number, taxRate: number): number => {
    return subtotal * taxRate / 100; // Tax rate is assumed to be a percentage
};

// Calculate the final total, including subtotal, tax, and shipping fee
export const calculateFinalTotal = (
    items: { price: number; quantity: number; discountPrice?: number }[],
    taxRate: number,
    shippingFee: number
): number => {
    const subtotal = calculateTotal(items); // Calculate total considering discounts
    const tax = calculateTax(subtotal, taxRate);
    return subtotal + tax + shippingFee; // Return the total including tax and shipping
};

// Calculate discount percentage based on the original price and discount price
export const calculateDiscount = (price: number, discountPrice?: number): number => {
    if (!discountPrice || discountPrice >= price) return 0; // No discount or invalid discount price
    return Math.round(((price - discountPrice) / price) * 100); // Calculate percentage discount
};


export const calculateFinalPrice = (price: number, discountPrice?: number): number => {
    return discountPrice && discountPrice < price ? discountPrice : price;
};
