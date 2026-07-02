const BASE_URL = "http://localhost:5000/notifications";

// Get all notifications
export async function fetchNotifications() {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  return await response.json();
}

// Create a new notification
export async function createNotification(notification) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(notification)
  });

  if (!response.ok) {
    throw new Error("Failed to create notification");
  }

  return await response.json();
}

// Mark notification as read
export async function markNotificationAsRead(id) {
  const response = await fetch(`${BASE_URL}/${id}/read`, {
    method: "PATCH"
  });

  if (!response.ok) {
    throw new Error("Failed to update notification");
  }

  return await response.json();
}

// Delete notification
export async function deleteNotification(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Failed to delete notification");
  }

  return await response.json();
}