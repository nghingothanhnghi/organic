// app/types/cart.ts
import type { Product } from "./product";

export interface CartItem extends Product {
    quantity: number;
    finalPrice: number;
}

export interface CartState {
    items: CartItem[];
}