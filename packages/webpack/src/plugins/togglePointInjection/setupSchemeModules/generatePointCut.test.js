import generatePointCut from "./generatePointCut.js";

describe("generatePointCut", () => {
  const pointCutName = "test-point-cut";
  const joinPointPath = `/${pointCutName}`;
  const togglePointModuleSpecifier = "test-toggle-point-path";
  const toggleHandlerFactoryModuleSpecifier =
    "test-toggle-handler-factory-module-specifier";
  const adapterModuleSpecifier = "test-adapter-module-specifier";
  let result, pointCuts;

  beforeEach(() => {
    pointCuts = [
      { name: "test-other-point-cut", toggleHandlerFactoryModuleSpecifier },
      {
        name: pointCutName,
        togglePointModuleSpecifier,
        toggleHandlerFactoryModuleSpecifier,
        loadStrategy: {
          adapterModuleSpecifier
        }
      }
    ];
  });

  beforeEach(() => {
    result = generatePointCut({ pointCuts, joinPointPath });
  });

  it("should return a script that imports the appropriate toggle point", () => {
    expect(result).toMatch(
      `import togglePoint from "${togglePointModuleSpecifier}";`
    );
  });

  it("should return a script that imports the appropriate toggle handler factory", () => {
    expect(result).toMatch(
      `import handlerFactory from "${toggleHandlerFactoryModuleSpecifier}";`
    );
  });

  it("should return a script that imports the pack and unpack exports of the appropriate adapter module", () => {
    expect(result).toMatch(
      `import { pack, unpack } from "${adapterModuleSpecifier}";`
    );
  });

  it("should return a script that constructs a toggle handler, passing the toggle point to the factory, plus the pack and unpack functions from the load strategy adapter", () => {
    expect(result).toMatch(
      "const handler = handlerFactory({ togglePoint, pack, unpack });"
    );
  });

  it("should return a script with a handler default export", () => {
    expect(result).toMatch("export default handler;");
  });

  it("should return a script that imports the appropriate toggle handler", () => {
    expect(result).toMatch(
      `import handlerFactory from "${toggleHandlerFactoryModuleSpecifier}";`
    );
  });
});
