import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-auto-external";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import keepExternalComments from "./keepExternalComments.mjs";

export default ({ config_isClient }) => {
  const CLIENT = JSON.parse(config_isClient);
  return {
    input: {
      main: "./src/index.js",
      lazyComponentLoadStrategyFactory:
        "./src/lazyComponentLoadStrategyFactory.js"
    },
    output: [
      {
        dir: "lib/",
        exports: "named",
        format: "es",
        entryFileNames: "[name].js",
        sourcemap: true
      },
      {
        dir: "lib/",
        exports: "named",
        format: "cjs",
        entryFileNames: "[name].es5.cjs",
        sourcemap: true
      }
    ],
    external: ["react/jsx-runtime"],
    plugins: [
      keepExternalComments,
      babel({
        exclude: [/node_modules/],
        babelHelpers: "runtime"
      }),
      resolve({
        preferBuiltins: true
      }),
      commonjs(),
      external(),
      ...[CLIENT ? terser() : []]
    ],
    preserveSymlinks: true
  };
};
