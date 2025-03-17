import processPointCuts from "./processPointCuts/index.js";
import Logger from "./logger.js";
import { win32, posix } from "path";
import { PLUGIN_NAME } from "./constants.js";
import resolveJoinPoints from "./resolveJoinPoints/index.js";
import setupSchemeModules from "./setupSchemeModules/index.js";
import { validate } from "schema-utils";
import schema from "./schema.json";

/**
 * Toggle Point Injection Plugin
 * @memberof module:web-toggle-point-webpack
 * @inner
 */
class TogglePointInjection {
  /**
   * Create a {@link https://webpack.js.org/concepts/plugins/|Plugin} that injects toggle points into a Webpack build
   * @param {object} options plugin options
   * @param {object[]} options.pointCuts toggle point point cut configuration, with target toggle point code as advice. The first matching point cut will be used
   * @param {string} options.pointCuts[].name name to describe the nature of the point cut, for clarity in logs and dev tools etc.
   * @param {string} options.pointCuts[].togglePointModule path, from root of the compilation, of where the toggle point sits. Or a resolvable node_module.
   * @param {string} [options.pointCuts[].variantGlob='.\/**\/__variants__/*\/*\/!(*.test).{js,jsx,ts,tsx}'] {@link https://en.wikipedia.org/wiki/Glob_(programming)|Glob} to identified variant modules.  The plugin uses {@link https://github.com/mrmlnc/fast-glob|fast-glob} under the hood, so supports any glob that it does.
   * @param {function} [options.pointCuts[].joinPointResolver=(variantPath) => path.posix.resolve(variantPath, "../../../..", path.basename(variantPath))] A function that takes the path to a variant module and returns a join point / base module.  N.B. This is executed at build-time, so cannot use run-time context. It should use posix path segments, so on Windows be sure to use path.posix.resolve.
   * @param {string} [options.pointCuts[].toggleHandler] Path to a toggle handler that unpicks a {@link https://webpack.js.org/api/module-methods/#requirecontext|require.context} containing potential variants, passing that plus a joint point module to a toggle point function. If not provided, the plugin will use a default handler that processes folder names into a tree held in a Map. Leaf nodes of the tree are the variant modules.
   * @param {'dynamicImport'|'dynamicRequire'|'static'} [options.pointCuts[].loadingMode='dynamicRequire']  module loading mode
   * - dynamicImport: Modules are dynamically imported at runtime, returning Promises that resolve to the modules
   * - dynamicRequire: Modules are dynamically required at runtime synchronously, returning modules directly
   * - static: Modules are statically required at build time (N.B. All side-effects, for all variants, will execute when the parent module is imported)
   * @param {string} [options.pointCuts[].webpackMagicComment] A compound {@link https://webpack.js.org/api/module-methods/#magic-comments|Magic Comment} to apply to the dynamic import. Only relevant for loadingMode=dynamicImport.
   * @param {function} [options.webpackNormalModule] A function that returns the Webpack NormalModule class.  This is required for Next.js, as it does not expose the NormalModule class directly
   * @returns {external:Webpack.WebpackPluginInstance} WebpackPluginInstance
   * @example <caption>N.B. forward slashes + asterisk are escaped in the examples, due to JSDoc shortcomings, but in reality should be un-escaped</caption>
   * const plugin = new TogglePointInjection({
   *   pointCuts: [
   *     {
   *       togglePointModule: "/withToggledHook",
   *       variantGlob: "./**\/__variants__/*\/*\/use!(*.test).{ts,tsx}"
   *     },
   *     {
   *       togglePointModule: "/withTogglePoint",
   *       variantGlob: "./**\/__variants__/*\/*\/!(use*|*.test).tsx",
   *       loadingMode: "dynamicImport",
   *       webpackMagicComment: "/* webpackPrefetch *\/"
   *     }
   *   ]
   * });
   * const webPackConfig = {
   *   ...rest
   *   plugins: [plugin]
   * }
   */
  constructor(options) {
    validate(schema, options, { name: PLUGIN_NAME, baseDataPath: "options" });
    this.options = {
      webpackNormalModule: async () =>
        (await import("webpack")).default.NormalModule,
      ...options
    };
  }

  apply(compiler) {
    let NormalModule, joinPointFiles, warnings, appRoot;
    compiler.hooks.beforeCompile.tapPromise(PLUGIN_NAME, async () => {
      appRoot = compiler.context.replaceAll(win32.sep, posix.sep);
      ({ joinPointFiles, warnings } = await processPointCuts({
        appRoot,
        fileSystem: compiler.inputFileSystem,
        options: this.options
      }));
      NormalModule = await this.options.webpackNormalModule();
    });

    compiler.hooks.compilation.tap(
      PLUGIN_NAME,
      (compilation, { normalModuleFactory }) => {
        const logger = new Logger(compilation);
        logger.logWarnings(warnings);
        if (!joinPointFiles.size) {
          return;
        } else {
          logger.logJoinPoints(joinPointFiles);
        }

        const { pointCuts } = this.options;
        setupSchemeModules({
          NormalModule,
          compilation,
          joinPointFiles,
          pointCuts
        });
        resolveJoinPoints({
          compilation,
          appRoot,
          normalModuleFactory,
          joinPointFiles
        });
      }
    );
  }
}

export default TogglePointInjection;
