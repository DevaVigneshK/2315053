import express from "express";

import {
  getNotifications,
  createNotification,
  markAsRead,
  deleteNotification
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", getNotifications);

router.post("/", createNotification);

router.patch("/:id/read", markAsRead);

router.delete("/:id", deleteNotification);

export default router;