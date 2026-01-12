# Busha commerce-js

Receive crypto payments with Busha commerce

## Installation

### Browser

```html
<script src="https://cdn.jsdelivr.net/npm/@busha/commerce-js@1.0.17/dist/index.min.js"></script>

<script>
  const BushaCommerce = window.BushaCommerce;
</script>
```

### Node

```bash
yarn add @busha/commerce-js

# OR

npm i @busha/commerce-js
```

```javascript
import BushaCommerce from "@busha/commerce-js";
```

## Usage

```javascript
const payload = {
  reference: `ref_${new Date().getTime()}`, // optional, will be auto-generated if nothing's passed
  public_key: "[YOUR PUBLISHABLE KEY]",
  quote_amount: "2000", // required: amount to charge
  quote_currency: "NGN", // required: currency for the quote amount (e.g., "NGN", "USD")
  target_currency: "NGN", // required: target currency
  source_currency: "NGN", // required: source currency
  callback_url: "https://your-domain.com/callback", // optional: webhook callback URL
  meta: { email: "email@example.com", name: "Busha" }, // optional: customer info
  devMode: true, // optional, defaults to false
  onClose: (d) => {
    console.log("Payment cancelled!", d);
  },
  onSuccess: (d) => {
    console.log(d);
  },
};

BushaCommerce(payload);
```

> Can't find your public key ?
>
> ![Public key](https://res.cloudinary.com/busha-inc/image/upload/v1764326664/commerce-js/Screenshot_2025-11-28_at_11.42.10.png)
