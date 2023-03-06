import type { RollupOptions } from "rollup";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import * as dotenv from "dotenv";
import replace from "@rollup/plugin-replace";

dotenv.config();

const config: RollupOptions = {
  input: "src/index.ts",
  output: [
    {
      dir: "dist",
    },
    {
      file: "dist/index.min.js",
      name: "BushaCommerce",
      format: "iife",
    },
  ],

  plugins: [
    typescript({
      declaration: true,
      outDir: "dist",
      rootDir: "src",
    }),
    terser(),
    nodeResolve(),
    commonjs(),
    replace({
      "process.env.PAYMENT_UI": process.env.PAYMENT_UI,
      preventAssignment: true,
    }),
  ],
};

export default config;
