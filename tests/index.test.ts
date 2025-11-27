import { getByText, screen, waitFor, within } from "@testing-library/dom";
import "@testing-library/jest-dom";

import BushaCommerce from "../src";
import {
  CLOSE_BUTTON_ID,
  CONTAINER_ID,
  FORM_ID,
  IFRAME_ID,
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
      public_key: "live_1234",
      quote_amount: "1000",
      quote_currency: "NGN",
      source_currency: "NGN",
      target_currency: "USD",
      onSuccess: jest.fn(),
      meta: {
        name: "",
        order_id: "123",
        someotherInnfo: "",
      },
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
    expect(screen.queryByTestId(CONTAINER_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(CLOSE_BUTTON_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(IFRAME_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(FORM_ID)).toBeInTheDocument();
    // expect(screen.queryByRole("form")).toBeInTheDocument(); // weird, doesn't work
  });
});

test("cleanups after close button is clicked", async () => {
  const container = setup();

  getByText(container, "Pay").click();

  await waitFor(async () => {
    expect(screen.queryByTestId(CONTAINER_ID)).toBeInTheDocument();
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
