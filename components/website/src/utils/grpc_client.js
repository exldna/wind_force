// website/src/utils/grpc_client.js
import { ScheduleClient } from "../grpc_client_files/schedule/v1/ServiceServiceClientPb.ts";
import { CreateInstructorRequest } from "../grpc_client_files/schedule/v1/model/instructor_pb.js";

const client = new ScheduleClient("http://localhost:8080", null, null);

export function createInstructor(name) {
  return new Promise((resolve, reject) => {
    const req = new CreateInstructorRequest();
    req.setName(name);

    client.createInstructor(req, {}, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response.getUuid()?.getValue());
      }
    });
  });
}
