import {
  CANCELLED_STATUS,
  CLOSE_BUTTON_ID,
  COMPLETED_STATUS,
  CONTAINER_ID,
  DEV_PAY_UI,
  INITIALIZED_STATUS,
  LOADER_ID,
  OPEN_EXTERNAL_LINK_ACTION,
  PAY_UI,
} from "./constants/variables";
import {
  injectGlobalStyles,
  validatePayload,
  createContainerEl,
  createSpinnerEl,
  createCloseBtnEl,
  createIframeEl,
  createFormEl,
  createShimmerEl,
} from "./helper";
import { BushaCommercePayload, MessageType } from "./types";

export type { BushaCommercePayload };

let payload: BushaCommercePayload;

export default function BushaCommerce(p: BushaCommercePayload) {
  injectGlobalStyles();
  // console.log(p);
  validatePayload(p);

  payload = p;

  const container = createContainerEl();

  // const spinner = createSpinnerEl();
  const shimmer = createShimmerEl();
  const closeBtn = shimmer.querySelector(`#${CLOSE_BUTTON_ID}`);
  // const closeBtn = createCloseBtnEl();

  closeBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    cleanup();
    if (payload.onClose) {
      payload.onClose({
        status: CANCELLED_STATUS,
        data: { reference: payload.reference },
      });
    }
  });

  // container.appendChild(spinner);
  container.appendChild(shimmer);
  // container.appendChild(closeBtn);

  const iframe = createIframeEl(payload.devMode);
  container.appendChild(iframe);

  document.body.appendChild(container);

  const { onClose, onSuccess, ...rest } = p;

  const iframeForm = createFormEl({ devMode: payload.devMode, ...rest });

  container.appendChild(iframeForm);

  // iframe.contentDocument?.body.appendChild(iframeForm);

  if (process.env.NODE_ENV !== "test") {
    iframeForm.submit();
  }

  window.addEventListener("message", onMessage);
}

function cleanup() {
  const containerEl = document.getElementById(CONTAINER_ID);
  const closeBtn = document.getElementById(CLOSE_BUTTON_ID);

  closeBtn?.removeEventListener("click", cleanup);

  window.removeEventListener("message", onMessage);

  if (!containerEl) return;
  document.body.removeChild(containerEl);
}

// Only schemes we'll forward to the OS. Prevents a compromised iframe from
// asking us to open `javascript:`, `data:`, or arbitrary URIs.
const ALLOWED_EXTERNAL_SCHEMES = /^(https?:|co\.busha\.[a-z.]+:)/i;

const onMessage = (e: MessageEvent<MessageType>) => {
  const payUI = payload.devMode ? DEV_PAY_UI : PAY_UI;
  if (!payUI) return;

  const payUrl = new URL(payUI);

  if (e.origin !== payUrl.origin) return;

  if (!payload) return;

  // Imperative request from the iframe: open a link the iframe can't reach
  // itself (custom scheme deep links, external URLs). We use `window.open`
  // rather than `window.location.href` so the merchant's page is never
  // replaced — if the scheme is unhandled, only the throwaway tab shows
  // the browser's error UI.
  if (
    e.data.action === OPEN_EXTERNAL_LINK_ACTION &&
    typeof e.data.url === "string" &&
    ALLOWED_EXTERNAL_SCHEMES.test(e.data.url)
  ) {
    window.open(e.data.url, "_blank", "noopener,noreferrer");
    return;
  }

  if (e.data.status === INITIALIZED_STATUS) {
    const containerEl = document.getElementById(CONTAINER_ID);
    const loader = document.getElementById(LOADER_ID);
    // const closeBtn = document.getElementById(CLOSE_BUTTON_ID);

    if (!loader) return;

    containerEl?.removeChild(loader);
    // containerEl?.removeChild(closeBtn);
  }

  if (e.data.status === CANCELLED_STATUS) {
    cleanup();

    if (payload.onClose) {
      payload.onClose(e.data);
    }
  }

  if (e.data.status === COMPLETED_STATUS) {
    cleanup();

    if (payload.onSuccess) {
      payload.onSuccess(e.data);
    }
  }
};
