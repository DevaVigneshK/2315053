import { useState, useEffect } from "react";
import { fetchNotifications } from "../api/notifications";

export function useNotifications() {

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadNotifications() {
      try {
        const data = await fetchNotifications();
        setNotifications(data.notifications);
      } catch (err) {
        setError("Failed to load notifications");
      } finally {
        setLoading(false);
      }

    }
    loadNotifications();
  }, []);
  const total = notifications.length;
  const totalPages = Math.ceil(total / 5);
  return {
    notifications,
    total,
    totalPages,
    loading,
    error
  };
}