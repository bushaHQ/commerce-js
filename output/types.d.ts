export type MessageType = {
    status: string;
    data?: any;
};
export interface BushaCommercePayload {
    local_amount: number;
    local_currency: string;
    meta?: {
        email?: string;
        name?: string;
    };
    business_id: string;
    reference?: string;
    callback_url?: string;
    mode?: "test" | "live";
    onClose?: (d?: any) => void;
    onSuccess: (d?: any) => void;
}
