import processVariantFiles from "./processVariantFiles/index.js";
import getVariantFiles from "./getVariantFiles.js";
import fillDefaultOptionalValues from "./fillDefaultOptionalValues.js";

const processPointCuts = async ({
  appRoot,
  fileSystem,
  options: { pointCuts }
}) => {
  const joinPointFiles = new Map();
  const configFiles = new Map();
  const warnings = [];
  for await (const configuredPointCut of pointCuts.values()) {
    const pointCut = fillDefaultOptionalValues(configuredPointCut);
    const { variantGlob } = pointCut;

    const variantFiles = await getVariantFiles({
      variantGlob,
      appRoot,
      fileSystem
    });

    await processVariantFiles({
      variantFiles,
      joinPointFiles,
      pointCut,
      variantGlob,
      warnings,
      configFiles,
      fileSystem,
      appRoot
    });
  }

  return { warnings, joinPointFiles };
};

export default processPointCuts;
