import { defineConfig } from "cypress";
import {config} from "dotenv";

config()

export default defineConfig({
  chromeWebSecurity: false,
  env: {
    BASIC_EXAMPLE_PAGE: "./example/basic/index.html",
    BUSINESS_ID: process.env.CYPRESS_BUSINESS_ID
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
