import Notification from "../models/Notification.js";
import { Log } from "../middleware/logger.js";

export async function getNotifications(req, res) {

  try {

    await Log(
      "backend",
      "info",
      "controller",
      "Fetching all notifications"
    );

    const notifications = await Notification.find();

    res.json({
      total: notifications.length,
      notifications: notifications
    });

  } catch (error) {

    await Log(
      "backend",
      "error",
      "controller",
      "Failed to fetch notifications"
    );

    res.status(500).json({
      message: "Failed to fetch notifications"
    });

  }

}

export async function createNotification(req, res) {

  try {

    await Log(
      "backend",
      "info",
      "controller",
      "Creating new notification"
    );

    const notification = await Notification.create(req.body);

    await Log(
      "backend",
      "info",
      "database",
      "Notification created successfully"
    );

    res.status(201).json(notification);

  } catch (error) {

    await Log(
      "backend",
      "error",
      "controller",
      "Failed to create notification"
    );

    res.status(400).json({
      message: "Failed to create notification"
    });

  }

}

export async function markAsRead(req, res) {

  try {

    const id = req.params.id;

    await Log(
      "backend",
      "info",
      "controller",
      `Marking notification ${id} as read`
    );

    const notification = await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    await Log(
      "backend",
      "info",
      "database",
      "Notification updated successfully"
    );

    res.json(notification);

  } catch (error) {

    await Log(
      "backend",
      "error",
      "controller",
      "Failed to update notification"
    );

    res.status(500).json({
      message: "Failed to update notification"
    });

  }

}

export async function deleteNotification(req, res) {

  try {

    const id = req.params.id;

    await Log(
      "backend",
      "info",
      "controller",
      `Deleting notification ${id}`
    );

    await Notification.findByIdAndDelete(id);

    await Log(
      "backend",
      "info",
      "database",
      "Notification deleted successfully"
    );

    res.json({
      message: "Notification deleted successfully"
    });

  } catch (error) {

    await Log(
      "backend",
      "error",
      "controller",
      "Failed to delete notification"
    );

    res.status(500).json({
      message: "Failed to delete notification"
    });

  }

}