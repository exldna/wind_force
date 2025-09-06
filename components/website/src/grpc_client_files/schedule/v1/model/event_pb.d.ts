import * as jspb from 'google-protobuf'

import * as common_types_time_pb from '../../../common/types/time_pb'; // proto import: "common/types/time.proto"
import * as common_types_uuid_pb from '../../../common/types/uuid_pb'; // proto import: "common/types/uuid.proto"


export class Event extends jspb.Message {
  getUuid(): common_types_uuid_pb.Uuid | undefined;
  setUuid(value?: common_types_uuid_pb.Uuid): Event;
  hasUuid(): boolean;
  clearUuid(): Event;

  getTimeBegin(): common_types_time_pb.Timestamp | undefined;
  setTimeBegin(value?: common_types_time_pb.Timestamp): Event;
  hasTimeBegin(): boolean;
  clearTimeBegin(): Event;

  getTimeEnd(): common_types_time_pb.Timestamp | undefined;
  setTimeEnd(value?: common_types_time_pb.Timestamp): Event;
  hasTimeEnd(): boolean;
  clearTimeEnd(): Event;

  getProductUuid(): common_types_uuid_pb.Uuid | undefined;
  setProductUuid(value?: common_types_uuid_pb.Uuid): Event;
  hasProductUuid(): boolean;
  clearProductUuid(): Event;

  getInstructorUuid(): common_types_uuid_pb.Uuid | undefined;
  setInstructorUuid(value?: common_types_uuid_pb.Uuid): Event;
  hasInstructorUuid(): boolean;
  clearInstructorUuid(): Event;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Event.AsObject;
  static toObject(includeInstance: boolean, msg: Event): Event.AsObject;
  static serializeBinaryToWriter(message: Event, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Event;
  static deserializeBinaryFromReader(message: Event, reader: jspb.BinaryReader): Event;
}

export namespace Event {
  export type AsObject = {
    uuid?: common_types_uuid_pb.Uuid.AsObject;
    timeBegin?: common_types_time_pb.Timestamp.AsObject;
    timeEnd?: common_types_time_pb.Timestamp.AsObject;
    productUuid?: common_types_uuid_pb.Uuid.AsObject;
    instructorUuid?: common_types_uuid_pb.Uuid.AsObject;
  };
}

export class CreateEventRequest extends jspb.Message {
  getTimeBegin(): common_types_time_pb.Timestamp | undefined;
  setTimeBegin(value?: common_types_time_pb.Timestamp): CreateEventRequest;
  hasTimeBegin(): boolean;
  clearTimeBegin(): CreateEventRequest;

  getTimeEnd(): common_types_time_pb.Timestamp | undefined;
  setTimeEnd(value?: common_types_time_pb.Timestamp): CreateEventRequest;
  hasTimeEnd(): boolean;
  clearTimeEnd(): CreateEventRequest;

  getProductUuid(): common_types_uuid_pb.Uuid | undefined;
  setProductUuid(value?: common_types_uuid_pb.Uuid): CreateEventRequest;
  hasProductUuid(): boolean;
  clearProductUuid(): CreateEventRequest;

  getInstructorUuid(): common_types_uuid_pb.Uuid | undefined;
  setInstructorUuid(value?: common_types_uuid_pb.Uuid): CreateEventRequest;
  hasInstructorUuid(): boolean;
  clearInstructorUuid(): CreateEventRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateEventRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateEventRequest): CreateEventRequest.AsObject;
  static serializeBinaryToWriter(message: CreateEventRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateEventRequest;
  static deserializeBinaryFromReader(message: CreateEventRequest, reader: jspb.BinaryReader): CreateEventRequest;
}

export namespace CreateEventRequest {
  export type AsObject = {
    timeBegin?: common_types_time_pb.Timestamp.AsObject;
    timeEnd?: common_types_time_pb.Timestamp.AsObject;
    productUuid?: common_types_uuid_pb.Uuid.AsObject;
    instructorUuid?: common_types_uuid_pb.Uuid.AsObject;
  };
}

export class CreateEventResponse extends jspb.Message {
  getUuid(): common_types_uuid_pb.Uuid | undefined;
  setUuid(value?: common_types_uuid_pb.Uuid): CreateEventResponse;
  hasUuid(): boolean;
  clearUuid(): CreateEventResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateEventResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateEventResponse): CreateEventResponse.AsObject;
  static serializeBinaryToWriter(message: CreateEventResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateEventResponse;
  static deserializeBinaryFromReader(message: CreateEventResponse, reader: jspb.BinaryReader): CreateEventResponse;
}

export namespace CreateEventResponse {
  export type AsObject = {
    uuid?: common_types_uuid_pb.Uuid.AsObject;
  };
}

