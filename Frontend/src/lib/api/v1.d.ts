/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/api/DanceClasses": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["DanceClass"][];
                        "application/json": components["schemas"]["DanceClass"][];
                        "text/json": components["schemas"]["DanceClass"][];
                    };
                };
            };
        };
        put?: never;
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["DanceClassRequest"];
                    "text/json": components["schemas"]["DanceClassRequest"];
                    "application/*+json": components["schemas"]["DanceClassRequest"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/DanceClasses/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["DanceClass"];
                        "application/json": components["schemas"]["DanceClass"];
                        "text/json": components["schemas"]["DanceClass"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["DanceClassRequest"];
                    "text/json": components["schemas"]["DanceClassRequest"];
                    "application/*+json": components["schemas"]["DanceClassRequest"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": components["schemas"]["DanceClassDto"];
                        "application/json": components["schemas"]["DanceClassDto"];
                        "text/json": components["schemas"]["DanceClassDto"];
                    };
                };
            };
        };
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        DanceClass: {
            /** Format: uuid */
            id?: string;
            name: string | null;
            lections?: components["schemas"]["Lection"][] | null;
        };
        DanceClassDto: {
            /** Format: uuid */
            id?: string;
            name: string | null;
            lections?: components["schemas"]["Lection"][] | null;
        };
        DanceClassRequest: {
            name: string | null;
        };
        Lection: {
            /** Format: uuid */
            id?: string;
            name: string | null;
            /** Format: uuid */
            danceClassId: string;
            danceClass?: components["schemas"]["DanceClass"];
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
