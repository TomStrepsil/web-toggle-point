import featuresStore from "./featuresStore.js";
import { StatusCodes } from "http-status-codes";

const contextMiddleware = (request, response, scopeCallBack) => {
  const version = request.header("version");
  if (!version) {
    response.statusMessage = "version header is required";
    response.status(StatusCodes.BAD_REQUEST).end();
    return;
  }
  featuresStore.setValue({ value: { version }, scopeCallBack });
};

export default contextMiddleware;
