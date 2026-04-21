export const CONTAINER_ID = "busha-commerce-container";
export const LOADER_ID = "busha-commerce-loader";
export const STYLESHEET_ID = "busha-commerce-styles";
export const CLOSE_BUTTON_ID = "busha-commerce-close-btn";
export const IFRAME_ID = "busha-commerce-iframe";
export const FORM_ID = "busha-commerce-form";

export const PAY_UI = process.env.PAYMENT_UI;
export const DEV_PAY_UI = process.env.DEV_PAYMENT_UI;

export const INITIALIZED_STATUS = "INITIALIZED";

export const CANCELLED_STATUS = "CANCELLED";

export const COMPLETED_STATUS = "COMPLETED";

/**
 * Action the pug-pay iframe asks the SDK to perform on its behalf.
 * The iframe's sandbox (no `allow-top-navigation*`) prevents it from
 * opening external links itself, so it delegates to this handler.
 */
export const OPEN_EXTERNAL_LINK_ACTION = "OPEN_EXTERNAL_LINK";
