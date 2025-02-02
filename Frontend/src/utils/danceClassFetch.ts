import createClient from "openapi-fetch";
import type { paths } from "../lib/api/v1";

const client = createClient<paths>({ baseUrl: "http://localhost:5265/" });

export const danceClassesFetch = () => client.GET("/api/DanceClasses", {});

export const getOneDanceClassFetch = (id: string) =>
  client.GET("/api/DanceClasses/{id}", {
    params: {
      path: { id: id },
    },
  });

export const saveNewDanceClass = (name: string) => {
  const danceClassRequest = { name };

  return client.POST("/api/DanceClasses", {
    body: danceClassRequest,
  });
};

export const updateClass = (id: string, name: string) => {
  const request = {
    name,
  };

  return client.PATCH("/api/DanceClasses/{id}", {
    params: {
      path: { id: id.toString() },
    },
    body: request,
  });
};

type DeleteResponse = {
  error?: { message: string };
  response: Response;
};

export const deleteClass = async (id: string): Promise<void> => {
  const response = (await client.DELETE("/api/DanceClasses/{id}", {
    params: {
      path: { id },
    },
  })) as DeleteResponse;

  if (response.error) {
    throw new Error(response.error.message || "Failed to delete class");
  }
};
