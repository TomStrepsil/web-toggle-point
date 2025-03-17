import fillPointCutDefaults from "./fillDefaultOptionalValues";

describe("fillDefaultOptionalValues", () => {
  let result;

  const makeDefaultJoinPointResolverAssertions = () => {
    describe("when the joinPointResolver is called", () => {
      it("should return a path that is the same as the variantPath, but with the last 3 directories removed", () => {
        const variantPath =
          "/test-folder/test-sub-folder/test-sub-folder/test-sub-folder/test-variant";
        const joinPointPath = result.joinPointResolver(variantPath);
        expect(joinPointPath).toEqual("/test-folder/test-variant");
      });
    });
  };

  const variantGlob = Symbol("test-variant-glob");
  const joinPointResolver = Symbol("test-join-point-resolver");
  const loadingMode = Symbol("test-loading-mode");

  const defaultVariantGlob = "./**/__variants__/*/*/!(*.test).{js,jsx,ts,tsx}";
  const defaultJoinPointResolver = expect.any(Function);
  const defaultLoadingMode = "dynamicRequire";

  describe.each`
    variantGlob    | joinPointResolver    | loadingMode    | description                                                 | expectation
    ${undefined}   | ${undefined}         | ${undefined}   | ${"nothing"}                                                | ${{ variantGlob: defaultVariantGlob, joinPointResolver: defaultJoinPointResolver, loadingMode: defaultLoadingMode }}
    ${variantGlob} | ${undefined}         | ${undefined}   | ${"a variantGlob, but nothing else"}                        | ${{ variantGlob, joinPointResolver: defaultJoinPointResolver, loadingMode: defaultLoadingMode }}
    ${variantGlob} | ${joinPointResolver} | ${undefined}   | ${"a variantGlob and a join point resolver"}                | ${{ variantGlob, joinPointResolver, loadingMode: defaultLoadingMode }}
    ${variantGlob} | ${undefined}         | ${loadingMode} | ${"a variantGlob and a loadingMode"}                        | ${{ variantGlob, joinPointResolver: defaultJoinPointResolver, loadingMode }}
    ${variantGlob} | ${joinPointResolver} | ${loadingMode} | ${"a variantGlob, a join point resolver and a loadingMode"} | ${{ variantGlob, joinPointResolver, loadingMode }}
    ${undefined}   | ${joinPointResolver} | ${undefined}   | ${"a joinPointResolver, but nothing else"}                  | ${{ variantGlob: defaultVariantGlob, joinPointResolver, loadingMode: defaultLoadingMode }}
    ${undefined}   | ${joinPointResolver} | ${loadingMode} | ${"a joinPointResolver and a loadingMode"}                  | ${{ variantGlob: defaultVariantGlob, joinPointResolver, loadingMode }}
    ${undefined}   | ${undefined}         | ${loadingMode} | ${"a loadingMode, but nothing else"}                        | ${{ variantGlob: defaultVariantGlob, joinPointResolver: defaultJoinPointResolver, loadingMode }}
  `(
    "when supplied $description",
    // eslint-disable-next-line no-unused-vars
    ({ expectation, description, ...pointCut }) => {
      beforeEach(() => {
        result = fillPointCutDefaults(pointCut);
      });

      it("should fill the defaults", () => {
        expect(result).toEqual(expectation);
      });

      if (!joinPointResolver) {
        makeDefaultJoinPointResolverAssertions();
      }
    }
  );
});
