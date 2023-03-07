import { BushaCommercePayload } from "./types";
export declare function injectGlobalStyles(): void;
export declare function validatePayload(p: BushaCommercePayload): {
    callback_url?: string | undefined;
    mode?: string | undefined;
    meta: {
        email?: string | undefined;
        name?: string | undefined;
    };
    local_amount: number;
    local_currency: string;
    business_id: string;
    reference: string;
};
export declare function createContainerEl(): HTMLDivElement;
export declare function createCloseBtnEl(): HTMLButtonElement;
export declare function createSpinnerEl(): HTMLDivElement;
export declare function createIframeEl(): HTMLIFrameElement;
type FormPayload = Omit<BushaCommercePayload, "onClose" | "onSuccess">;
export declare function createFormEl(payload: FormPayload): HTMLFormElement;
export {};
