# Busha commerce-js

Receive crypto payments with busha commerce js

&nbsp;

# Installation

Browser

```
<script src="https://www.unpkg.com/@busha/commerce-js/dist/index.min.js"></script>

<script>
    const BushaCommerce = window.BushaCommerce
</script>
```

Node

```
yarn add @busha/commerce-js

# OR

npm i @busha/commerce-js
```

```
import BushaCommerce from "@busha/commerce-js";
```
&nbsp;

# Usage

```
  const payload = {
        reference: `Demo_ref_${new Date().getTime()}`,
        business_id: "[YOUR BUSINESS ID]",
        local_amount: 2000,
        local_currency: "NGN", // "USD"
        mode: "test",  // "test" | "live", // defaults to live
        meta: {email: "email@example.com", name: "Busha" } // optional customer info
        onClose: (d) => {
            console.log("Payment cancelled!", d);
        },
        onSuccess: (d) => {
            console.log(d);
        }
    }

    BushaCommerce(payload)
```
