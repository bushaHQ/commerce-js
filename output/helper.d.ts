import { BushaCommercePayload } from "./types";
export declare function injectGlobalStyles(): void;
export declare function validatePayload(p: BushaCommercePayload): {
    meta?: {
        email?: string | undefined;
        name?: string | undefined;
    } | undefined;
    reference?: string | undefined;
    callback_url?: string | undefined;
    quote_amount: string;
    quote_currency: string;
    target_currency: string;
    source_currency: string;
    public_key: string;
};
export declare function createContainerEl(): HTMLDivElement;
export declare function createCloseBtnEl(): HTMLButtonElement;
export declare function createSpinnerEl(): HTMLDivElement;
export declare function createIframeEl(): HTMLIFrameElement;
type FormPayload = Omit<BushaCommercePayload, "onClose" | "onSuccess">;
export declare function createFormEl(payload: FormPayload): HTMLFormElement;
export {};
