import { useState, useEffect } from "react";
import { fetchNotifications } from "../api/notifications";

export function useNotifications() {

  const [notifications, setNotifications] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    async function loadNotifications() {

      try {

        const data = await fetchNotifications();

        setNotifications(data.notifications);
        setTotal(data.total);

      } catch (err) {

        setError("Failed to load notifications");

      } finally {

        setLoading(false);

      }

    }

    loadNotifications();

  }, []);

  const pageSize = 5;
  const totalPages = Math.ceil(total / pageSize);

  return {
    notifications,
    total,
    totalPages,
    loading,
    error
  };

}