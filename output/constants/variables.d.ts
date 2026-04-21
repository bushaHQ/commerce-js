export declare const CONTAINER_ID = "busha-commerce-container";
export declare const LOADER_ID = "busha-commerce-loader";
export declare const STYLESHEET_ID = "busha-commerce-styles";
export declare const CLOSE_BUTTON_ID = "busha-commerce-close-btn";
export declare const IFRAME_ID = "busha-commerce-iframe";
export declare const FORM_ID = "busha-commerce-form";
export declare const PAY_UI: string | undefined;
export declare const DEV_PAY_UI: string | undefined;
export declare const INITIALIZED_STATUS = "INITIALIZED";
export declare const CANCELLED_STATUS = "CANCELLED";
export declare const COMPLETED_STATUS = "COMPLETED";
/**
 * Action the pug-pay iframe asks the SDK to perform on its behalf.
 * The iframe's sandbox (no `allow-top-navigation*`) prevents it from
 * opening external links itself, so it delegates to this handler.
 */
export declare const OPEN_EXTERNAL_LINK_ACTION = "OPEN_EXTERNAL_LINK";
