import * as jspb from 'google-protobuf'

import * as common_types_uuid_pb from '../../../common/types/uuid_pb'; // proto import: "common/types/uuid.proto"


export class Product extends jspb.Message {
  getUuid(): common_types_uuid_pb.Uuid | undefined;
  setUuid(value?: common_types_uuid_pb.Uuid): Product;
  hasUuid(): boolean;
  clearUuid(): Product;

  getName(): string;
  setName(value: string): Product;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Product.AsObject;
  static toObject(includeInstance: boolean, msg: Product): Product.AsObject;
  static serializeBinaryToWriter(message: Product, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Product;
  static deserializeBinaryFromReader(message: Product, reader: jspb.BinaryReader): Product;
}

export namespace Product {
  export type AsObject = {
    uuid?: common_types_uuid_pb.Uuid.AsObject;
    name: string;
  };
}

export class CreateProductRequest extends jspb.Message {
  getName(): string;
  setName(value: string): CreateProductRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateProductRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateProductRequest): CreateProductRequest.AsObject;
  static serializeBinaryToWriter(message: CreateProductRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateProductRequest;
  static deserializeBinaryFromReader(message: CreateProductRequest, reader: jspb.BinaryReader): CreateProductRequest;
}

export namespace CreateProductRequest {
  export type AsObject = {
    name: string;
  };
}

export class CreateProductResponse extends jspb.Message {
  getUuid(): common_types_uuid_pb.Uuid | undefined;
  setUuid(value?: common_types_uuid_pb.Uuid): CreateProductResponse;
  hasUuid(): boolean;
  clearUuid(): CreateProductResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateProductResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateProductResponse): CreateProductResponse.AsObject;
  static serializeBinaryToWriter(message: CreateProductResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateProductResponse;
  static deserializeBinaryFromReader(message: CreateProductResponse, reader: jspb.BinaryReader): CreateProductResponse;
}

export namespace CreateProductResponse {
  export type AsObject = {
    uuid?: common_types_uuid_pb.Uuid.AsObject;
  };
}

