import { getFeatures } from "../featuresStore";
import { FEATURE_KEY } from "../constants";

const getRelevantModule = (joinPoint, featuresMap) => {
  const activeFeatures = featuresMap.get(FEATURE_KEY);
  try {
    const { selection } = getFeatures();

    const variant = activeFeatures.get(selection);
    return variant ?? joinPoint;
  } catch {
    return joinPoint;
  }
};

const togglePoint = (joinPoint, featuresMap) => {
  return new Proxy(joinPoint.default, {
    get(_, ...rest) {
      const newTarget = getRelevantModule(joinPoint, featuresMap);
      return Reflect.get(newTarget.default, ...rest);
    }
  });
};

export default togglePoint;
