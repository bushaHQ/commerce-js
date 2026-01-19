import { object, string } from "yup";

import { dark } from "./constants/colors";
import {
  STYLESHEET_ID,
  CONTAINER_ID,
  LOADER_ID,
  CLOSE_BUTTON_ID,
  PAY_UI,
  DEV_PAY_UI,
  IFRAME_ID,
  FORM_ID,
} from "./constants/variables";
import { BushaCommercePayload } from "./types";
import { close } from "./constants/icons";

const colorContainmentPrimary = "#EDF2ED";
const colorContainmentTertiary = "#FFFFFF";
const colorTextMid = "#586558";

export function injectGlobalStyles() {
  const sheet = document.head.querySelector(`#${STYLESHEET_ID}`);

  if (sheet) return;

  const styleEl = document.createElement("style");
  styleEl.id = STYLESHEET_ID;
  styleEl.dataset.testid = STYLESHEET_ID;

  document.head.appendChild(styleEl);

  styleEl.textContent = `
      @keyframes busha-commerce-fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }

      #${CONTAINER_ID} {
        animation: busha-commerce-fadeIn 0.3s ease-in-out;
      }
  
      #${CONTAINER_ID}, #${CONTAINER_ID} * {
        margin: 0;
        padding: 0px;
        box-sizing: border-box;
      }
  
      #${LOADER_ID} {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 40;
      }

      #${CLOSE_BUTTON_ID} .busha-commerce-close-icon {
        width: 100%;
        height: 100%;
        fill: transparent;
      }

      .animate-pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
    `;

  // return styleEl;
}

export function validatePayload(p: BushaCommercePayload) {
  const chargePayloadSchema = object({
    quote_amount: string().required(),
    quote_currency: string().required(),
    target_currency: string().required(),
    source_currency: string().required(),
    public_key: string().required(),
    reference: string().optional(),
    callback_url: string().optional(),
    // mode: string().matches(/(test|live)/),
    meta: object({
      email: string().email(),
      name: string(),
    }).optional(),
  });

  return chargePayloadSchema.validateSync(p);
}

export function createContainerEl() {
  const containerEl = document.createElement("div");
  containerEl.id = CONTAINER_ID;
  containerEl.dataset.testid = CONTAINER_ID;
  containerEl.style.position = "fixed";
  containerEl.style.top = "0px";
  containerEl.style.left = "0px";
  containerEl.style.width = "100%";
  containerEl.style.height = "100%";
  containerEl.style.zIndex = "999999999";
  containerEl.style.backgroundColor = "rgba(33, 41, 33, 0.20)";
  containerEl.style.backdropFilter = "blur(27px)";

  return containerEl;
}

function createCloseBtn(size = "40px") {
  const closeBtnEl = document.createElement("button");
  closeBtnEl.id = CLOSE_BUTTON_ID;
  closeBtnEl.dataset.testid = CLOSE_BUTTON_ID;
  closeBtnEl.setAttribute("type", "button");
  closeBtnEl.style.width = size;
  closeBtnEl.style.height = size;
  closeBtnEl.style.backgroundColor = colorContainmentTertiary;
  closeBtnEl.style.borderRadius = "100%";
  closeBtnEl.style.border = "none";
  closeBtnEl.innerHTML = close;

  return closeBtnEl;
}

export function createCloseBtnEl() {
  const closeBtnEl = createCloseBtn("40px");
  closeBtnEl.style.zIndex = "40";
  closeBtnEl.style.position = "absolute";
  closeBtnEl.style.right = "36px";
  closeBtnEl.style.top = "36px";

  return closeBtnEl;
}

export function createSpinnerEl() {
  const spinnerEl = document.createElement("div");
  spinnerEl.id = LOADER_ID;
  spinnerEl.dataset.testid = LOADER_ID;
  spinnerEl.style.width = "40px";
  spinnerEl.style.height = "40px";
  spinnerEl.style.backgroundColor = "transparent";
  spinnerEl.style.border = `2px solid ${dark}`;
  spinnerEl.style.borderLeftColor = "transparent";
  spinnerEl.style.borderBottomColor = "transparent";
  spinnerEl.style.borderRadius = "100%";

  if (spinnerEl.animate)
    spinnerEl.animate(
      [{ transform: "rotate(0)" }, { transform: "rotate(360deg)" }],
      {
        duration: 300,
        iterations: Infinity,
      }
    );

  return spinnerEl;
}

export function createShimmerEl() {
  const shimmerEl = document.createElement("div");
  shimmerEl.id = LOADER_ID;
  shimmerEl.dataset.testid = LOADER_ID;
  shimmerEl.style.width = "480px";
  shimmerEl.style.height = "746px";
  shimmerEl.style.backgroundColor = colorContainmentPrimary;
  shimmerEl.style.borderRadius = "20px";
  shimmerEl.style.padding = "20px";

  const closeBtnEl = createCloseBtn("36px");

  shimmerEl.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 24px;">
     <div style="display: flex; justify-content: space-between; align-items: center;">
        <div class="animate-pulse" style="width: 288px; height: 32px; border-radius: 999px; background:${colorContainmentTertiary}"></div>
        ${closeBtnEl.outerHTML}
      </div>

      <div style="display: flex; gap: 16px; align-items: center; justify-content: space-between; padding: 16px; border-radius: 16px; background:${colorContainmentTertiary}">
        <div class="animate-pulse" style="width: 40px; height: 40px; border-radius: 999px; background:${colorContainmentPrimary}"></div>
        <div style="display: flex; flex-direction: column; gap: 2px;">
          <div class="animate-pulse" style="width: 74px; height: 16px; border-radius: 999px; background:${colorContainmentPrimary}"></div>
          <div class="animate-pulse" style="width: 254px; height: 14px; border-radius: 999px; background:${colorContainmentPrimary}"></div>
        </div>
        <div class="animate-pulse" style="width: 24px; height: 24px; border-radius: 999px; background:${colorContainmentPrimary}"></div>
      </div>

      <div style="display: flex; gap: 16px; align-items: center; justify-content: center; padding: 30px 16px; border-radius: 16px; background:${colorContainmentTertiary}">
        <div class="animate-pulse" style="width: 200px; height: 200px; border-radius: 16px; background:${colorContainmentPrimary}"></div>
      </div>

      <div style="display: flex; gap: 20px; flex-direction: column; padding: 16px; border-radius: 16px; background:${colorContainmentTertiary}">
        <div style="display: flex; gap: 16px; align-items: center; justify-content: space-between;">
          <div class="animate-pulse" style="width: 40px; height: 40px; border-radius: 999px; background:${colorContainmentPrimary}"></div>
          <div style="display: flex; flex-direction: column; gap: 2px;">
            <div class="animate-pulse" style="width: 74px; height: 16px; border-radius: 999px; background:${colorContainmentPrimary}"></div>
            <div class="animate-pulse" style="width: 254px; height: 14px; border-radius: 999px; background:${colorContainmentPrimary}"></div>
          </div>
          <div class="animate-pulse" style="width: 24px; height: 24px; border-radius: 999px; background:${colorContainmentPrimary}"></div>
        </div>
        <div style="display: flex; gap: 16px; align-items: center; justify-content: space-between;">
          <div class="animate-pulse" style="width: 74px; height: 20px; border-radius: 999px; background:${colorContainmentPrimary}"></div>
          <div class="animate-pulse" style="width: 124px; height: 20px; border-radius: 999px; background:${colorContainmentPrimary}"></div>
        </div>
        <div style="display: flex; gap: 16px; align-items: center; justify-content: space-between;">
          <div class="animate-pulse" style="width: 124px; height: 20px; border-radius: 999px; background:${colorContainmentPrimary}"></div>
          <div class="animate-pulse" style="width: 124px; height: 20px; border-radius: 999px; background:${colorContainmentPrimary}"></div>
        </div>
      </div>

      <div style="height: 56px; width: 100%; border-radius: 999px; background:${colorContainmentTertiary}"></div>

      <div style="display: flex; gap: 8px; align-items: center; justify-content: center;">
        <p style="font-size: 14px; font-weight: 400; color:${colorTextMid}">Secured by</p>
        <img src="https://res.cloudinary.com/busha-inc/image/upload/v1768821221/commerce-js/busha-logo.png" alt="Busha Logo" style="width: 72px; height: 16px;" />
      </div>
    </div>
  `;

  return shimmerEl;
}

export function createIframeEl(devMode = false) {
  const iframeEl = document.createElement("iframe");
  const payUI = devMode ? DEV_PAY_UI : PAY_UI;

  iframeEl.dataset.testid = IFRAME_ID;
  iframeEl.name = IFRAME_ID;
  iframeEl.allow = `clipboard-write self ${payUI}`;
  iframeEl.style.width = "100%";
  // iframeEl.style.maxWidth = "100%";
  iframeEl.style.height = "100%";
  // iframeEl.style.border = "red";
  iframeEl.style.position = "absolute";
  iframeEl.style.left = "50%";
  iframeEl.style.top = "0px";
  iframeEl.style.transform = "translate(-50%, 0)";
  iframeEl.style.zIndex = "20";

  return iframeEl;
}

type FormPayload = Omit<BushaCommercePayload, "onClose" | "onSuccess">;

export function createFormEl({
  devMode = false,
  ...payload
}: FormPayload) {
  const payUI = devMode ? DEV_PAY_UI : PAY_UI;

  const formEl = document.createElement("form");
  formEl.target = IFRAME_ID;
  formEl.dataset.testid = FORM_ID;
  formEl.action = payUI ? `${payUI}/pay` : "";
  formEl.method = "POST";
  formEl.style.display = "none";

  const parsePayload = (p: FormPayload) => {
    for (const key in payload) {
      if (!payload.hasOwnProperty(key)) continue;

      const paymentParamValue = payload[key as keyof typeof payload];

      if (typeof paymentParamValue === "object") {
        for (const _key in paymentParamValue) {
          if (!paymentParamValue.hasOwnProperty(_key)) continue;

          const inputEl = document.createElement("input");
          inputEl.name = `${key}[${_key}]`;
          inputEl.value = String((paymentParamValue as any)[_key]);

          formEl.appendChild(inputEl);
        }
      } else {
        const inputEl = document.createElement("input");
        inputEl.name = key;
        inputEl.value = String(paymentParamValue);

        formEl.appendChild(inputEl);
      }
    }
  };

  parsePayload(payload);

  const displayMode = "INLINE";

  const displayModeInputEl = document.createElement("input");
  displayModeInputEl.name = "displayMode";
  displayModeInputEl.value = displayMode;

  const parentOriginInputEl = document.createElement("input");
  parentOriginInputEl.name = "parentOrigin";
  parentOriginInputEl.value = window.location.origin;

  formEl.appendChild(displayModeInputEl);
  formEl.appendChild(parentOriginInputEl);

  return formEl;
}
