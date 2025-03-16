import { POINT_CUTS, SCHEME } from "../constants.js";
import generateJoinPoint from "./generateJoinPoint.js";

jest.mock("../constants", () => ({
  SCHEME: "test-scheme",
  POINT_CUTS: "test-point-cuts"
}));

describe("generateJoinPoint", () => {
  const path = "/test-folder/test-path";
  const pointCutName = "test-point-cut";
  const relativePaths = [
    "/test-sub-folder/test-variant-1",
    "/test-sub-folder/test-variant-2",
    "/test-other-sub-folder/test-variant-1"
  ];
  const variants = new Map(
    relativePaths.map((relativePath) => [
      relativePath,
      `${path}${relativePath}`
    ])
  );
  const pointCut = { name: pointCutName };
  let result;

  const makeCommonAssertions = () => {
    it("should return a script that imports the appropriate point cut for the join point", () => {
      expect(result).toMatch(
        `import pointCut from "${SCHEME}:${POINT_CUTS}:/${pointCutName}";`
      );
    });

    it("should return a script exports a default export which calls the point cut, passing the join point (control module) and the variants", () => {
      expect(result).toMatch(
        "export default pointCut({ joinPoint, variants });"
      );
    });
  };

  describe("with a static loadingMode", () => {
    beforeEach(() => {
      const joinPointFiles = new Map([
        [path, { pointCut: { ...pointCut, loadingMode: "static" }, variants }]
      ]);
      result = generateJoinPoint({
        joinPointFiles,
        path
      });
    });

    makeCommonAssertions();

    it("should return a script that statically imports the base / control module for the join point", () => {
      expect(result).toMatch(`import * as joinPoint from "${path}";`);
    });

    it("should return a script that imports all the valid variants of the base / control module, storing in variables", () => {
      expect(result).toMatch(`
import * as variant_0 from "${path}${relativePaths[0]}";
import * as variant_1 from "${path}${relativePaths[1]}";
import * as variant_2 from "${path}${relativePaths[2]}";`);
    });

    it("should return a script that creates a Map of variants, keyed by relative path, valued as the variant module", () => {
      expect(result).toMatch(`const variants = new Map([
  ["/test-sub-folder/test-variant-1", variant_0],
  ["/test-sub-folder/test-variant-2", variant_1],
  ["/test-other-sub-folder/test-variant-1", variant_2]
]);`);
    });
  });

  describe.each(["/* test loading qualifier */", undefined])(
    "with a dynamicImport loadingMode, and a %s webpackMagicComment",
    (webpackMagicComment) => {
      const expectedMagicComment = webpackMagicComment ?? "";
      beforeEach(() => {
        const joinPointFiles = new Map([
          [
            path,
            {
              pointCut: {
                ...pointCut,
                loadingMode: "dynamicImport",
                webpackMagicComment
              },
              variants
            }
          ]
        ]);
        result = generateJoinPoint({
          joinPointFiles,
          path
        });
      });

      makeCommonAssertions();

      it("should return a script that prepares a join point function that will dynamically load the join point, when executed, with any provided webpack loading directives", () => {
        expect(result).toMatch(
          `const joinPoint = () => import(${expectedMagicComment}"${path}");`
        );
      });

      it("should return a script that creates a Map of variants, keyed by relative path, valued as a function that will dynamically load the variant module when executed, with any provided webpack loading directives", () => {
        expect(result).toMatch(`const variants = new Map([
  ["/test-sub-folder/test-variant-1", () => import(${expectedMagicComment}"${path}${relativePaths[0]}")],
  ["/test-sub-folder/test-variant-2", () => import(${expectedMagicComment}"${path}${relativePaths[1]}")],
  ["/test-other-sub-folder/test-variant-1", () => import(${expectedMagicComment}"${path}${relativePaths[2]}")]
]);`);
      });
    }
  );

  describe("with a dynamicRequire loadingMode", () => {
    beforeEach(() => {
      const joinPointFiles = new Map([
        [
          path,
          {
            pointCut: {
              ...pointCut,
              loadingMode: "dynamicRequire"
            },
            variants
          }
        ]
      ]);
      result = generateJoinPoint({
        joinPointFiles,
        path
      });
    });

    makeCommonAssertions();

    it("should return a script that prepares a join point function that will dynamically load the join point, when executed", () => {
      expect(result).toMatch(`const joinPoint = () => require("${path}");`);
    });

    it("should return a script that creates a Map of variants, keyed by relative path, valued as a function that will dynamically load the variant module when executed", () => {
      expect(result).toMatch(`const variants = new Map([
  ["/test-sub-folder/test-variant-1", () => require("${path}${relativePaths[0]}")],
  ["/test-sub-folder/test-variant-2", () => require("${path}${relativePaths[1]}")],
  ["/test-other-sub-folder/test-variant-1", () => require("${path}${relativePaths[2]}")]
]);`);
    });
  });
});
