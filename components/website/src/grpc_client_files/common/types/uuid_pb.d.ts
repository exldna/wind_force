import * as jspb from 'google-protobuf'



export class Uuid extends jspb.Message {
  getLow(): number;
  setLow(value: number): Uuid;

  getHigh(): number;
  setHigh(value: number): Uuid;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Uuid.AsObject;
  static toObject(includeInstance: boolean, msg: Uuid): Uuid.AsObject;
  static serializeBinaryToWriter(message: Uuid, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Uuid;
  static deserializeBinaryFromReader(message: Uuid, reader: jspb.BinaryReader): Uuid;
}

export namespace Uuid {
  export type AsObject = {
    low: number;
    high: number;
  };
}

