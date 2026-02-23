import API from "./axios";

export const getMyNotifications = () =>
  API.get("/notifications/my");

export const markNotificationRead = (id) =>
  API.put(`/notifications/${id}/read`);
