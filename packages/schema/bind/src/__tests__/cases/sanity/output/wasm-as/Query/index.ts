import {
  queryMethod,
  objectMethod
} from "../../";
import {
  deserializequeryMethodArgs,
  serializequeryMethodResult,
  deserializeobjectMethodArgs,
  serializeobjectMethodResult
} from "./serialization";

export function queryMethodWrapped(argsBuf: ArrayBuffer): ArrayBuffer {
  const args = deserializequeryMethodArgs(argsBuf);
  const result = queryMethod({
    arg: args.arg
  });
  return serializequeryMethodResult(result);
}

export function objectMethodWrapped(argsBuf: ArrayBuffer): ArrayBuffer {
  const args = deserializeobjectMethodArgs(argsBuf);
  const result = objectMethod({
    argObject: args.argObject,
    importedArgObject: args.importedArgObject
  });
  return serializeobjectMethodResult(result);
}
