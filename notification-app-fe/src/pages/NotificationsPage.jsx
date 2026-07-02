import { useState } from "react";
import {
  Alert,
  Badge,
  Box,
  CircularProgress,
  Divider,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";

import { NotificationCard } from "../components/NotificationCard";
import { NotificationFilter } from "../components/NotificationFilter";
import { useNotifications } from "../hooks/useNotifications";

export function NotificationsPage() {

  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

  const {
    notifications,
    totalPages,
    loading,
    error
  } = useNotifications();

  const unreadCount = notifications.filter(
    (item) => item.isRead === false
  ).length;

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(1);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  let filteredNotifications = notifications;

  if (filter !== "All") {
    filteredNotifications = notifications.filter(
      (item) => item.type === filter
    );
  }

  const start = (page - 1) * 5;
  const end = start + 5;

  const currentNotifications = filteredNotifications.slice(start, end);

  return (
    <Box sx={{ maxWidth: 700, margin: "auto", padding: 3 }}>

      <Stack direction="row" spacing={2} alignItems="center">

        <Badge badgeContent={unreadCount} color="primary">
          <NotificationsIcon />
        </Badge>

        <Typography variant="h5">
          Notifications
        </Typography>

      </Stack>

      <Divider sx={{ my: 3 }} />

      <NotificationFilter
        value={filter}
        onChange={handleFilterChange}
      />

      <Box mt={3}>

        {loading && (
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        )}

        {!loading && error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        {!loading &&
          !error &&
          currentNotifications.length === 0 && (
            <Alert severity="info">
              No Notifications Available
            </Alert>
          )}

        {!loading &&
          !error &&
          currentNotifications.length > 0 && (
            <Stack spacing={2}>
              {currentNotifications.map((item) => (
                <NotificationCard
                  key={item.id}
                  notification={item}
                />
              ))}
            </Stack>
          )}

      </Box>

      {!loading && (
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            page={page}
            count={Math.max(1, Math.ceil(filteredNotifications.length / 5))}
            onChange={handlePageChange}
          />
        </Box>
      )}

    </Box>
  );
}