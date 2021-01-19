import {
  Read,
  ReadDecoder,
  Write,
  WriteSizer,
  WriteEncoder,
  Nullable
} from "@web3api/wasm-as";
import { NestedObject } from "./";

export function serializeNestedObject(type: NestedObject): ArrayBuffer {
  const sizer = new WriteSizer();
  writeNestedObject(sizer, type);
  const buffer = new ArrayBuffer(sizer.length);
  const encoder = new WriteEncoder(buffer);
  writeNestedObject(encoder, type);
  return buffer;
}

function writeNestedObject(writer: Write, type: NestedObject) {
  writer.writeMapLength(1);
  writer.writeString("fieldA");
  writer.writeString(type.fieldA);
}

export function deserializeNestedObject(buffer: ArrayBuffer, type: NestedObject) {
  const reader = new ReadDecoder(buffer);
  var numFields = reader.readMapLength();

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    if (field == "fieldA") {
      type.fieldA = reader.readString();
    }
  }
}
