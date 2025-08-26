import { apiGet, apiPost } from "./apiClient";

export function getAllBooks() {
  // GET /allBooks -> returns {data: [...]}
  return apiGet("/allBooks");
}

export function getBookById(id) {
  // POST /getBook with { id }
  return apiPost("/getBook", { id });
}

export function getBooksByAuthor(authorId) {
  return apiGet(`/author/${authorId}`);
}

export function getBooksByCategory(categoryId) {
  return apiGet(`/category/${categoryId}`);
}

export function addBook(data) {
  return apiPost("/addBook", data);
}
