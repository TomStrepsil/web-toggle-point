"use client";

import { withToggledHookFactory } from "@asos/web-toggle-point-react-pointcuts";
import featuresStore from "./featuresStore";

const { getFeatures } = featuresStore;
const getActiveFeatures = () => getFeatures();

const withTogglePoint = withToggledHookFactory({
  getActiveFeatures,
  logError: console.log,
  variantKey: "status"
});

export default withTogglePoint;
