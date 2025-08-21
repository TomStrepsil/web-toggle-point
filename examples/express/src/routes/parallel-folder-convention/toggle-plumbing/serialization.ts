import { serializationFactory } from "@asos/web-toggle-point-ssr";

const { getScriptReactElement, getJSONFromScript } = serializationFactory({
  id: "features",
  logWarning: console.warn
});

export { getScriptReactElement, getJSONFromScript };
