import { defineConfig } from "cypress";
import {config} from "dotenv";

config()

export default defineConfig({
  chromeWebSecurity: false,
  env: {
    BASIC_EXAMPLE_PAGE: "./example/basic/index.html",
    PUBLIC_KEY: process.env.CYPRESS_PUBLIC_KEY,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
