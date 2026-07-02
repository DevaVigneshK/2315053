import { useState } from "react";
import {
  Alert,
  Badge,
  Box,
  Button,
  CircularProgress,
  Divider,
  MenuItem,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";

import { NotificationCard } from "../components/NotificationCard";
import { NotificationFilter } from "../components/NotificationFilter";
import { useNotifications } from "../hooks/useNotifications";
import { createNotification } from "../api/notifications";

export function NotificationsPage() {

  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("Placement");

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

  async function handleAddNotification() {

    if (title.trim() === "" || message.trim() === "") {
      alert("Please fill all fields");
      return;
    }

    const newNotification = {
      title,
      message,
      type
    };

    try {

      await createNotification(newNotification);

      alert("Notification Added Successfully");

      setTitle("");
      setMessage("");
      setType("Placement");

      window.location.reload();

    } catch (err) {

      alert("Failed to Add Notification");

    }

  }

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

      {/* Add Notification Form */}

      <Box
        sx={{
          border: "1px solid lightgray",
          borderRadius: 2,
          padding: 2,
          marginBottom: 3
        }}
      >

        <Typography variant="h6" mb={2}>
          Add Notification
        </Typography>

        <Stack spacing={2}>

          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />

          <TextField
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
          />

          <TextField
            select
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            fullWidth
          >
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </TextField>

          <Button
            variant="contained"
            onClick={handleAddNotification}
          >
            Add Notification
          </Button>

        </Stack>

      </Box>

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
                  key={item._id}
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