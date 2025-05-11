const generatePointCut = ({ pointCuts, joinPointPath }) => {
  const pointCutName = joinPointPath.slice(1);
  const {
    togglePointModuleSpecifier,
    toggleHandlerFactoryModuleSpecifier,
    loadStrategy: { adapterModuleSpecifier }
  } = pointCuts.find(({ name }) => name === pointCutName);
  return `import togglePoint from "${togglePointModuleSpecifier}";
import handlerFactory from "${toggleHandlerFactoryModuleSpecifier}";
import { pack, unpack } from "${adapterModuleSpecifier}";
const handler = handlerFactory({ togglePoint, pack, unpack });
export default handler;`;
};

export default generatePointCut;
