import {
  CANCELLED_STATUS,
  CLOSE_BUTTON_ID,
  COMPLETED_STATUS,
  CONTAINER_ID,
  INITIALIZED_STATUS,
  LOADER_ID,
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
} from "./helper";
import { BushaCommercePayload, MessageType } from "./types";

let payload: BushaCommercePayload;

export default function BushaCommerce(p: BushaCommercePayload) {
  injectGlobalStyles();
  // console.log(p);
  validatePayload(p);

  payload = p;

  const container = createContainerEl();

  const spinner = createSpinnerEl();
  const closeBtn = createCloseBtnEl();

  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    cleanup();
    if (payload.onClose) {
      payload.onClose({
        status: CANCELLED_STATUS,
        data: { reference: payload.reference },
      });
    }
  });

  container.appendChild(spinner);
  container.appendChild(closeBtn);

  const iframe = createIframeEl();
  container.appendChild(iframe);

  document.body.appendChild(container);

  const { onClose, onSuccess, ...rest } = p;

  const iframeForm = createFormEl(rest);

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

const onMessage = (e: MessageEvent<MessageType>) => {
  if (!PAY_UI) return;

  const payUrl = new URL(PAY_UI);

  if (e.origin !== payUrl.origin) return;

  if (!payload) return;

  // console.log(e.data);

  if (e.data.status === INITIALIZED_STATUS) {
    const containerEl = document.getElementById(CONTAINER_ID);
    const loader = document.getElementById(LOADER_ID);
    const closeBtn = document.getElementById(CLOSE_BUTTON_ID);

    if (!loader || !closeBtn) return;

    containerEl?.removeChild(loader);
    containerEl?.removeChild(closeBtn);
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
