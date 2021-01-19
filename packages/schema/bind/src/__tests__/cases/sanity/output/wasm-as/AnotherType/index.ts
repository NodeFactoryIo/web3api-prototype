import { Nullable } from "@web3api/wasm-as";
import { NestedObject } from "../NestedObject";
import {
  serializeAnotherType,
  deserializeAnotherType
} from "./serialization";

export class AnotherType {
  prop: string | null;
  nestedObject: NestedObject;

  toBuffer(): ArrayBuffer {
    return serializeAnotherType(this);
  }

  fromBuffer(buffer: ArrayBuffer): void {
    deserializeAnotherType(buffer, this);
  }
}
