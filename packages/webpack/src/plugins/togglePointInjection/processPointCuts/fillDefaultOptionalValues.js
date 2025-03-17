import { posix, basename } from "path";

const fillDefaultOptionalValues = (pointCut) => {
  const {
    variantGlob = "./**/__variants__/*/*/!(*.test).{js,jsx,ts,tsx}",
    joinPointResolver = (variantPath) =>
      posix.resolve(variantPath, ...Array(4).fill(".."), basename(variantPath)),
    loadingMode = "dynamicRequire"
  } = pointCut;

  return { ...pointCut, variantGlob, joinPointResolver, loadingMode };
};

export default fillDefaultOptionalValues;
