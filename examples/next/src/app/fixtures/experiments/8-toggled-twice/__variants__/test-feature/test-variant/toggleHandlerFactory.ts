import React from "react";
import { FEATURE_KEY } from "./constants";

type ReactComponentModuleType = {
  default: React.Component;
};
interface ToggleHandler {
  togglePoint: (
    joinPoint: ReactComponentModuleType,
    featuresMap: Map<string, Map<string, ReactComponentModuleType>>
  ) => React.Component;
  joinPoint: ReactComponentModuleType;
  variantPathMap: Map<string, ReactComponentModuleType>;
}
export default ({ togglePoint, joinPoint, variantPathMap }: ToggleHandler) => {
  const variantsMap = new Map<string, ReactComponentModuleType>();
  const featuresMap = new Map([[FEATURE_KEY, variantsMap]]);

  for (const key of variantPathMap.keys()) {
    const [, , value] = key.split(".");
    const [start, end] = value.split("-");

    for (
      let charCode = start.charCodeAt(0);
      charCode <= end.charCodeAt(0);
      charCode++
    ) {
      variantsMap.set(String.fromCharCode(charCode), variantPathMap.get(key)!);
    }
  }

  return togglePoint(joinPoint, featuresMap);
};
