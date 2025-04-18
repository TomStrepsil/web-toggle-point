const buildTree = (map = new Map(), parts, variants, key) => {
  const [part, ...rest] = parts;
  if (rest.length) {
    map.set(part, buildTree(map.get(part), rest, variants, key));
  } else {
    map.set(part, variants(key));
  }
  return map;
};

/**
 * Path Segment Toggle Handler
 * @memberof module:web-toggle-point-webpack
 * @inner
 * @param {object} options plugin options
 * @param {function} options.togglePoint a method that chooses the appropriate module at runtime
 * @param {module} options.joinPoint the join point module
 * @param {string[]} options.variants an array of paths, as generated by webpack, that point to variants of the join point module
 * @returns {function} A handler of join points injected by the plugin
 */
const pathSegmentToggleHandler = ({ togglePoint, joinPoint, variants }) => {
  let featuresMap;
  for (const key of variants.keys()) {
    const parts = key.split("/").slice(0, -1).slice(2);
    featuresMap = buildTree(featuresMap, parts, variants, key);
  }
  return togglePoint(joinPoint, featuresMap);
};

export default pathSegmentToggleHandler;
