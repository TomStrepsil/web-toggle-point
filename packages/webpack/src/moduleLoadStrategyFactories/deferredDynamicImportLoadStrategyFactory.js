import dynamicLoadCodeGenerator from "./internal/dynamicLoadCodeGenerator";

export const unpack = (expression) => expression();

/**
 * @param {object} [importCodeGeneratorFactoryOptions] options object
 * @param {string} [importCodeGeneratorFactoryOptions.webpackMagicComment] An option webpack magic comment.  This is a string that will be added to the import statement, and can be used to control how Webpack handles the import (e.g. prefetching, chunk names etc.).  See {@link https://webpack.js.org/api/module-methods/#magic-comments|Webpack Magic Comments}
 */
export default ({
  importCodeGeneratorOptions: { webpackMagicComment } = {}
} = {}) => ({
  adapterModuleSpecifier: import.meta.filename,
  importCodeGenerator: dynamicLoadCodeGenerator.bind(
    undefined,
    "import",
    webpackMagicComment
  )
});
