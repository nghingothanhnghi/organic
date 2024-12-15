// types/store.ts
import type { Channel } from "./channel";

export interface Store {
    id: number;
    customerId: string;
    storeName: string;
    storeStatus: boolean;
    address: string;
    phoneNumber: string;
    revenueAmount?: string; // Optional
    tax?: number; // Optional
    channels: Channel[]; // Array of channels
}
