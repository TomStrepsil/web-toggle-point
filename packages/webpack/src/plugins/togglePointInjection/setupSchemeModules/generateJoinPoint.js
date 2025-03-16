import { POINT_CUTS, SCHEME } from "../constants.js";

const getStatic = ({ path, variants }) => {
  const variantsKeys = Array.from(variants.keys());
  const code = `import * as joinPoint from "${path}";
${variantsKeys
  .map(
    (key, index) => `import * as variant_${index} from "${variants.get(key)}";`
  )
  .join("\n")}
const variants = new Map([
${variantsKeys.map((relativePath, index) => `  ["${relativePath}", variant_${index}]`).join(",\n")}
]);`;

  return code;
};

const getDynamic = (method, webpackMagicComment, { path, variants }) => {
  const variantsKeys = Array.from(variants.keys());
  const code = `const joinPoint = () => ${method}(${webpackMagicComment}"${path}");
const variants = new Map([
${variantsKeys.map((key) => `  ["${key}", () => ${method}(${webpackMagicComment}"${variants.get(key)}")]`).join(",\n")}
]);`;

  return code;
};

const getDynamicRequire = getDynamic.bind(undefined, "require");
const getDynamicImport = getDynamic.bind(undefined, "import");

const generateJoinPoint = ({ joinPointFiles, path }) => {
  const {
    pointCut: { name, loadingMode, webpackMagicComment },
    variants
  } = joinPointFiles.get(path);
  const pointCutImport = `import pointCut from "${SCHEME}:${POINT_CUTS}:/${name}";`;
  const code = {
    dynamicImport: getDynamicImport.bind(undefined, webpackMagicComment),
    dynamicRequire: getDynamicRequire.bind(undefined, ""),
    static: getStatic
  }[loadingMode]({ path, variants, webpackMagicComment });
  return `${pointCutImport}
${code}
export default pointCut({ joinPoint, variants });`;
};

export default generateJoinPoint;
