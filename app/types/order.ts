// app/types/order.ts
import type { CartItem } from './cart';

export interface Order {
    id: number;
    items: CartItem[];
    shippingDetails: any; // Define this type based on your shipping info
    status: string;
}
