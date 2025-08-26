import { apiGet, apiPost } from "./apiClient";

export function getAllCategories() {
  return apiGet("/allCategories");
}

export function createCategory(data) {
  return apiPost("/createCategory", data);
}
