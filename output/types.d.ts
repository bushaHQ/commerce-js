export type MessageType = {
    status: string;
    data?: any;
};
export interface BushaCommercePayload {
    quote_amount: string;
    quote_currency: string;
    target_currency: string;
    source_currency: string;
    meta?: {
        [key: string]: string;
    };
    public_key: string;
    reference?: string;
    callback_url?: string;
    onClose?: (d?: any) => void;
    onSuccess: (d?: any) => void;
}
