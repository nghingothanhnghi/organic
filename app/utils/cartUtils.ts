// utils/cartUtils.ts
// Calculate subtotal for the cart items
export const calculateSubtotal = (items: Array<{ price: number; quantity: number }>) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  
  // Calculate tax (example: 10%)
  export const calculateTax = (subtotal: number, taxRate: number = 0.1) => {
    return subtotal * taxRate;
  };
  
  // Calculate shipping cost (flat rate or based on conditions)
  export const calculateShipping = (itemsCount: number, flatRate: number = 5) => {
    return itemsCount > 0 ? flatRate : 0; // Modify based on your business logic
  };
  
  // Calculate total (subtotal + tax + shipping)
  export const calculateTotal = (
    items: Array<{ price: number; quantity: number }>,
    taxRate: number = 0.1,
    flatRate: number = 5
  ) => {
    const subtotal = calculateSubtotal(items);
    const tax = calculateTax(subtotal, taxRate);
    const shipping = calculateShipping(items.length, flatRate);
    return subtotal + tax + shipping;
  };
  