import { apiPost } from "./apiClient";

export function loginUser(data) {
  return apiPost("/login", data);
}

export function registerUser(data) {
  // expects { userName, password, preference, phone }
  return apiPost("/register", data);
}

export function sendOtp(data) {
  return apiPost("/sendOtp", data);
}

export function verifyOtp(data) {
  return apiPost("/verifyOtp", data);
}
