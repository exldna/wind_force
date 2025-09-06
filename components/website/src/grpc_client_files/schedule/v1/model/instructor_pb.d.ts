import * as jspb from 'google-protobuf'

import * as common_types_uuid_pb from '../../../common/types/uuid_pb'; // proto import: "common/types/uuid.proto"


export class Instructor extends jspb.Message {
  getUuid(): common_types_uuid_pb.Uuid | undefined;
  setUuid(value?: common_types_uuid_pb.Uuid): Instructor;
  hasUuid(): boolean;
  clearUuid(): Instructor;

  getName(): string;
  setName(value: string): Instructor;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Instructor.AsObject;
  static toObject(includeInstance: boolean, msg: Instructor): Instructor.AsObject;
  static serializeBinaryToWriter(message: Instructor, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Instructor;
  static deserializeBinaryFromReader(message: Instructor, reader: jspb.BinaryReader): Instructor;
}

export namespace Instructor {
  export type AsObject = {
    uuid?: common_types_uuid_pb.Uuid.AsObject;
    name: string;
  };
}

export class CreateInstructorRequest extends jspb.Message {
  getName(): string;
  setName(value: string): CreateInstructorRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateInstructorRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateInstructorRequest): CreateInstructorRequest.AsObject;
  static serializeBinaryToWriter(message: CreateInstructorRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateInstructorRequest;
  static deserializeBinaryFromReader(message: CreateInstructorRequest, reader: jspb.BinaryReader): CreateInstructorRequest;
}

export namespace CreateInstructorRequest {
  export type AsObject = {
    name: string;
  };
}

export class CreateInstructorResponse extends jspb.Message {
  getUuid(): common_types_uuid_pb.Uuid | undefined;
  setUuid(value?: common_types_uuid_pb.Uuid): CreateInstructorResponse;
  hasUuid(): boolean;
  clearUuid(): CreateInstructorResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateInstructorResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateInstructorResponse): CreateInstructorResponse.AsObject;
  static serializeBinaryToWriter(message: CreateInstructorResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateInstructorResponse;
  static deserializeBinaryFromReader(message: CreateInstructorResponse, reader: jspb.BinaryReader): CreateInstructorResponse;
}

export namespace CreateInstructorResponse {
  export type AsObject = {
    uuid?: common_types_uuid_pb.Uuid.AsObject;
  };
}

