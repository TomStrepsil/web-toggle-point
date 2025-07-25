import getToggleHandlerPath from "../../getToggleHandlerPath.js";

export default {
  name: "event",
  togglePointModule: "/src/fixtures/event/__togglePoint.js",
  variantGlobs: ["./src/fixtures/event/**/*.*.css"],
  toggleHandler: getToggleHandlerPath("singleFilenameDottedSegment.js"),
  joinPointResolver: (path) => path.replace(/\.([^.]+)\.css$/, ".css")
};
