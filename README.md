# Busha commerce-js

Receive crypto payments with busha commerce js

&nbsp;

# Installation

Browser

```
<script src="https://cdn.jsdelivr.net/npm/@busha/commerce-js@1.0.12/dist/index.min.js"></script>

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
        reference: `ref_${new Date().getTime()}`, // optional, will be auto-generated if nothing's passed
        public_key: "[YOUR PUBLISHABLE KEY]",
        local_amount: 2000,
        local_currency: "NGN", // "USD"
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

> Can't find your publishable key ?
>
> ![Publishable key](https://res.cloudinary.com/busha-inc/image/upload/v1680477724/Screenshot_2023-04-03_at_00.13.21.png)
