import createClient from "openapi-fetch";
import type { components, paths } from "../lib/api/v1";

const client = createClient<paths>({ baseUrl: "http://localhost:5265/" });

export const saveNewUser = (user: components["schemas"]["UserRequest"]) => {
  return client.POST("/api/Users", {
    body: user,
  });
};

export const loginUser = (email: string, password: string) => {
  return client.GET("/api/Users/login", {
    params: {
      query: {
        email: email,
        password: password,
      },
    },
  }) as Promise<{ data: components["schemas"]["LoginDto"] }>;
};
