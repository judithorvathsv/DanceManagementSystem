import createClient from "openapi-fetch";
import type { components, paths } from "../lib/api/v1";

const client = createClient<paths>({ baseUrl: "http://localhost:5265/" });

export const saveNewLecture = (
  lecture: components["schemas"]["LectureRequest"]
) => {
  return client.POST("/api/Lectures", {
    body: lecture,
  });
};

export const deleteLecture = (id: string) =>
  client.DELETE("/api/Lectures/{id}", {
    params: {
      path: { id: id },
      query: undefined,
    },
  });

export const editLecture = (
  lectureRequest: components["schemas"]["LectureUpdateRequest"],
  id: string
) => {
  return client.PATCH("/api/Lectures/{id}", {
    params: {
      path: { id: id.toString() },
    },
    body: lectureRequest,
  });
};
