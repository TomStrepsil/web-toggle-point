import joinPointResolver from "../../joinPointResolver.js";
import loadStrategyFactory from "@asos/web-toggle-point-webpack/moduleLoadStrategyFactories/staticLoadStrategyFactory";

export default {
  name: "translation",
  togglePointModuleSpecifier: "/src/fixtures/translation/__togglePoint.js",
  variantGlob: "./src/fixtures/translation/languages/*/*.json",
  joinPointResolver,
  loadStrategy: loadStrategyFactory()
};
