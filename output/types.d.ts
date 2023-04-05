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
    public_key: string;
    reference?: string;
    onClose?: (d?: any) => void;
    onSuccess: (d?: any) => void;
}
