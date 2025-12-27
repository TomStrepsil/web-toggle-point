// eslint-disable-next-line import/no-unresolved -- https://github.com/import-js/eslint-plugin-import/issues/1810
import { withTogglePointFactory } from "@asos/web-toggle-point-react-pointcuts";
import featuresStore from "./featuresStore.js";

const { getFeatures: getActiveFeatures } = featuresStore;

const withTogglePoint = withTogglePointFactory({
  getActiveFeatures,
  variantKey: "size",
  plugins: [
    {
      onVariantError: console.error
    }
  ]
});

export default withTogglePoint;
