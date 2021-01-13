import {
  w3_query,
  Nullable
} from "@web3api/wasm-as";
import { CustomType } from "../../CustomType";
import { TestImport_Object } from "../TestImport_Object";
import {
  serializeimportedMethodArgs,
  deserializeimportedMethodResult,
  serializeanotherMethodArgs,
  deserializeanotherMethodResult,
  serializeobjectMethodArgs,
  deserializeobjectMethodResult
} from "./serialization";

export class TestImport_Query {

  public static uri: string = "testimport.uri.eth";

  public static importedMethod(input: {
    str: string,
    optStr: string | null,
    u: u32,
    optU: Nullable<u32>,
    uArrayArray: Array<Array<Nullable<u32>> | null>
  }): string {
    const args = serializeimportedMethodArgs(input);
    const result = w3_query(
      uri,
      `query {
        importedMethod(
          str: $str,
          optStr: $optStr,
          u: $u,
          optU: $optU,
          uArrayArray: $uArrayArray
        )
      }`,
      args
    );
    return deserializeimportedMethodResult(result);
  }

  public static anotherMethod(input: {
    arg: Array<string>
  }): i64 {
    const args = serializeanotherMethodArgs(input);
    const result = w3_query(
      uri,
      `query {
        anotherMethod(
          arg: $arg
        )
      }`,
      args
    );
    return deserializeanotherMethodResult(result);
  }

  public static objectMethod(input: {
    argObject: CustomType,
    importedArgObject: TestImport_Object
  }): CustomType {
    const args = serializeobjectMethodArgs(input);
    const result = w3_query(
      uri,
      `query {
        objectMethod(
          argObject: $argObject,
          importedArgObject: $importedArgObject
        )
      }`,
      args
    );
    return deserializeobjectMethodResult(result);
  }
}
