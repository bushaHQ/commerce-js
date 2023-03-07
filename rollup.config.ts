import { fileURLToPath } from "url";
import path from "path";
import type { RollupOptions } from "rollup";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import * as dotenv from "dotenv";
import replace from "@rollup/plugin-replace";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const config: RollupOptions = {
  input: path.join(__dirname, "src/index.ts"),
  output: [
    {
      dir: path.join(__dirname, "dist"),
    },
    {
      file: path.join(__dirname, "dist/index.min.js"),
      name: "BushaCommerce",
      format: "iife",
    },
  ],

  plugins: [
    typescript({
      declaration: true,
      outDir: path.join(__dirname, "dist"),
      rootDir: path.join(__dirname, "src"),
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
