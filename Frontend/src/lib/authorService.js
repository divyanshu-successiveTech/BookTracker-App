import { apiGet, apiPost } from "./apiClient";

export function getAllAuthors() {
  // Backend route: GET /allAuthor
  return apiGet("/allAuthor");
}

export function createAuthor(data) {
  return apiPost("/createAuthor", data);
}
