import { CustomType } from "../CustomType";
import { TestImport_Object } from "../imported/TestImport_Object";
import {
  Read,
  ReadDecoder,
  WriteSizer,
  WriteEncoder,
  Write
} from "@web3api/wasm-as";

export function deserializequeryMethodArgs(argsBuf: ArrayBuffer): {
  arg: string
} {
  const reader = new ReadDecoder(argsBuf);
  var numFields = reader.readMapLength();

  var _arg: string | undefined;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    if (field == "arg") {
      _arg = reader.readString();
    }
  }

  if (!_arg) {
    throw Error("Missing required argument \"arg: String\"");
  }

  return {
    arg: _arg
  };
}

export function serializequeryMethodResult(result: i32): ArrayBuffer {
  const sizer = new WriteSizer();
  writequeryMethodResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoder = new WriteEncoder(buffer);
  writequeryMethodResult(encoder, result);
  return buffer;
}

function writequeryMethodResult(writer: Write, result: i32) {
  writer.writeInt32(result);
}

export function deserializeobjectMethodArgs(argsBuf: ArrayBuffer): {
  argObject: CustomType,
  importedArgObject: TestImport_Object
} {
  const reader = new ReadDecoder(argsBuf);
  var numFields = reader.readMapLength();

  var _argObject: CustomType | undefined;
  var _importedArgObject: TestImport_Object | undefined;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    if (field == "argObject") {
      const _argObject = new CustomType();
      _argObject.fromBuffer(reader.readBytes());
    }
    else if (field == "importedArgObject") {
      const _importedArgObject = new TestImport_Object();
      _importedArgObject.fromBuffer(reader.readBytes());
    }
  }

  if (!_argObject) {
    throw Error("Missing required argument \"argObject: CustomType\"");
  }
  if (!_importedArgObject) {
    throw Error("Missing required argument \"importedArgObject: TestImport_Object\"");
  }

  return {
    argObject: _argObject,
    importedArgObject: _importedArgObject
  };
}

export function serializeobjectMethodResult(result: CustomType): ArrayBuffer {
  const sizer = new WriteSizer();
  writeobjectMethodResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoder = new WriteEncoder(buffer);
  writeobjectMethodResult(encoder, result);
  return buffer;
}

function writeobjectMethodResult(writer: Write, result: CustomType) {
  writer.writeBytes(result.toBuffer());
}
