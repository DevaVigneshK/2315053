import { Card, CardContent, Typography, Chip } from "@mui/material";

export function NotificationCard({ notification }) {

  let chipColor = "warning";

  if (notification.type === "Placement") {
    chipColor = "primary";
  } else if (notification.type === "Result") {
    chipColor = "success";
  }

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>

        <Typography variant="h6">
          {notification.title}
        </Typography>

        <Chip
          label={notification.type}
          color={chipColor}
          size="small"
          sx={{ marginTop: 1, marginBottom: 1 }}
        />

        <Typography>
          {notification.message}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            marginTop: 1,
            color: notification.isRead ? "green" : "red"
          }}
        >
          {notification.isRead ? "Read" : "Unread"}
        </Typography>

      </CardContent>
    </Card>
  );
}