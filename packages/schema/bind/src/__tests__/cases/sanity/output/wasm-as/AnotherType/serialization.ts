import {
  Read,
  ReadDecoder,
  Write,
  WriteSizer,
  WriteEncoder,
  Nullable
} from "@web3api/wasm-as";
import { NestedObject } from "../NestedObject";
import { AnotherType } from "./";

export function serializeAnotherType(type: AnotherType): ArrayBuffer {
  const sizer = new WriteSizer();
  writeAnotherType(sizer, type);
  const buffer = new ArrayBuffer(sizer.length);
  const encoder = new WriteEncoder(buffer);
  writeAnotherType(encoder, type);
  return buffer;
}

function writeAnotherType(writer: Write, type: AnotherType) {
  writer.writeMapLength(2);
  writer.writeString("prop");
  writer.writeNullableString(type.prop);
  writer.writeString("nestedObject");
  writer.writeBytes(type.nestedObject.toBuffer());
}

export function deserializeAnotherType(buffer: ArrayBuffer, type: AnotherType) {
  const reader = new ReadDecoder(buffer);
  var numFields = reader.readMapLength();

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    if (field == "prop") {
      type.prop = reader.readNullableString();
    }
    else if (field == "nestedObject") {
      const object = new NestedObject();
      object.fromBuffer(reader.readBytes());
      type.nestedObject = object;
    }
  }
}
