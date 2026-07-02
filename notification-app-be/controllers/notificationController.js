import Notification from "../models/Notification.js";

export async function getNotifications(req, res) {

  try {

    const notifications = await Notification.find();

    res.json({
      total: notifications.length,//for pagination
      notifications: notifications
    });

    } catch (error) {

    res.status(500).json({
      message: "Failed to fetch notifications"
    });

  }

}

export async function createNotification(req, res) {

  try {

    const notification = await Notification.create(req.body);

    res.status(201).json(notification);

  } catch (error) {
    res.status(400).json({
      message: "Failed to create notification"
    });

  }

} 

export async function markAsRead(req, res) {

  try {

    const id = req.params.id;

    const notification = await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    res.json(notification);

  } catch (error) {

    res.status(500).json({
      message: "Failed to update notification"
    });

  }

}

export async function deleteNotification(req, res) {

  try {

    const id = req.params.id;

    await Notification.findByIdAndDelete(id);

    res.json({
      message: "Notification deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to delete notification"
    });

  }

}