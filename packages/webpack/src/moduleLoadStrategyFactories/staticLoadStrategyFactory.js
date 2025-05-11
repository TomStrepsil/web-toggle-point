import createVariantPathMap from "./internal/createVariantPathMap.js";

const adapterModuleSpecifier = import.meta.filename;

const importCodeGenerator = ({ joinPointPath, variantPathMap }) => {
  const variantsKeys = Array.from(variantPathMap.keys());
  return `import * as joinPoint from "${joinPointPath}";
${variantsKeys
  .map(
    (key, index) =>
      `import * as variant_${index} from "${variantPathMap.get(key)}";`
  )
  .join("\n")}
${createVariantPathMap(variantsKeys.map((key, index) => `  ["${key}", variant_${index}]`).join(",\n"))}`;
};
export const pack = (expression) => expression;
export const unpack = (expression) => expression;
export default () => {
  return {
    adapterModuleSpecifier,
    importCodeGenerator
  };
};
