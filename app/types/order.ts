// app/types/order.ts
import type { CartItem } from './cart';
import type { PaginationMeta } from './pagination';

export interface Order {
    id: number;
    items: CartItem[];
    shippingDetails: any; // Define this type based on your shipping info
    status: string;
}

// Define OrderState interface
export interface OrderState {
    orders: Order[]; // Array of orders
    loading: boolean;
    error: string | null;
    pagination: PaginationMeta | null;
    filters: Record<string, any>;
}