import dynamicLoadCodeGenerator from "./internal/dynamicLoadCodeGenerator";

export const unpack = (expression) => expression();
export default () => ({
  adapterModuleSpecifier: import.meta.filename,
  importCodeGenerator: dynamicLoadCodeGenerator.bind(
    undefined,
    "require",
    undefined
  )
});
