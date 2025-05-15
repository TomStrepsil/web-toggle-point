import { lazy } from "react";
// eslint-disable-next-line import/no-unresolved -- https://github.com/import-js/eslint-plugin-import/issues/1810
import deferredDynamicImportLoadStrategyFactory from "@asos/web-toggle-point-webpack/moduleLoadStrategyFactories/deferredDynamicImportLoadStrategyFactory";

const adapterModuleSpecifier = import.meta.filename;

export const pack = (expression) => lazy(expression);
export default (options) => ({
  ...deferredDynamicImportLoadStrategyFactory(options),
  adapterModuleSpecifier
});
