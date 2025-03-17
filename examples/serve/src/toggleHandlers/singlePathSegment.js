export default ({ togglePoint, joinPoint, variants }) => {
  const featuresMap = new Map();
  for (const key of variants.keys()) {
    const [, value] = key.split("/");
    featuresMap.set(value, variants.get(key));
  }
  return togglePoint(joinPoint, featuresMap);
};
