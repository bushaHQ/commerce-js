import { getByText, screen, waitFor } from "@testing-library/dom";
import "@testing-library/jest-dom";

import BushaCommerce from "../src";
import {
  CLOSE_BUTTON_ID,
  CONTAINER_ID,
  IFRAME_ID,
  LOADER_ID,
} from "../src/constants/variables";

const onClose = jest.fn();

function setup() {
  const container = document.createElement("div");

  container.innerHTML = `
        <button type="button">Pay</button>
    `;

  const button = container.querySelector("button");

  button?.addEventListener("click", () => {
    BushaCommerce({
      business_id: "1234",
      local_amount: 2000,
      local_currency: "NGN",
      onSuccess: jest.fn(),
      onClose,
    });
  });

  return container;
}

afterEach(() => {
  const containerEl = document.getElementById(CONTAINER_ID);

  if (containerEl) document.body.removeChild(containerEl);
  
  jest.clearAllMocks();
});

test("Shows loader, iframe and close button when called", async () => {
  const container = setup();

  getByText(container, "Pay").click();

  await waitFor(async () => {
    expect(screen.queryByTestId(LOADER_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(CLOSE_BUTTON_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(IFRAME_ID)).toBeInTheDocument();

    const iframeForm = (
      screen.getByTestId(IFRAME_ID) as HTMLIFrameElement
    ).contentDocument?.body.querySelector("form");

    iframeForm?.addEventListener(
      "submit",
      jest.fn(() => {})
    );

    expect(iframeForm).toBeTruthy();
  });
});

test("cleanups after close button is clicked", async () => {
  const container = setup();

  getByText(container, "Pay").click();

  await waitFor(async () => {
    expect(screen.queryByTestId(IFRAME_ID)).toBeInTheDocument();

    const iframeForm = (
      screen.getByTestId(IFRAME_ID) as HTMLIFrameElement
    ).contentDocument?.body.querySelector("form");

    expect(iframeForm).toBeTruthy();
  });

  const closeButton = screen.getByTestId(CLOSE_BUTTON_ID);

  closeButton.click();

  await waitFor(() => {
    expect(screen.queryByTestId(CONTAINER_ID)).not.toBeInTheDocument();
  });
});

test("calls onClose callback after close button is clicked", async () => {
  const container = setup();

  getByText(container, "Pay").click();

  await waitFor(async () => {
    expect(screen.queryByTestId(IFRAME_ID)).toBeInTheDocument();
  });

  const closeButton = screen.getByTestId(CLOSE_BUTTON_ID);

  closeButton.click();

  await waitFor(() => {
    expect(screen.queryByTestId(CONTAINER_ID)).not.toBeInTheDocument();
  });

  expect(onClose).toBeCalledTimes(1);
  expect(onClose).toHaveBeenCalledWith(
    expect.objectContaining({ status: expect.any(String) })
  );
});
