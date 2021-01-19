import { Nullable } from "@web3api/wasm-as";
import {
  serializeNestedObject,
  deserializeNestedObject
} from "./serialization";

export class NestedObject {
  fieldA: string;

  toBuffer(): ArrayBuffer {
    return serializeNestedObject(this);
  }

  fromBuffer(buffer: ArrayBuffer): void {
    deserializeNestedObject(buffer, this);
  }
}
