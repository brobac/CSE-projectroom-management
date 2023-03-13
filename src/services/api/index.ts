export * from "./members";
export * from "./reservation";
export * from "./projectRoom";

export const HTTP_METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
} as const;

export const API_VERSION = {
  v1: "v1",
  v2: "v2",
  v3: "v3",
} as const;
