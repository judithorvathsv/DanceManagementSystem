import createClient from "openapi-fetch";
import type { paths } from "../lib/api/v1";

const client = createClient<paths>({ baseUrl: "http://localhost:5265/" });

export const danceClassesFetch = () => client.GET("/api/DanceClasses", {});

