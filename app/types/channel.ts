// types/channel.ts
export interface Channel {
    id: number;
    channelName: string;
    channelStatus: boolean;
    channelImgUrl?: string | null; // Optional
}
