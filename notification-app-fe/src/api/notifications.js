export async function fetchNotifications() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        total: 6,
        notifications: [
          {
            id: 1,
            title: "Placement Drive",
            message: "AffordMed hiring starts tomorrow.",
            type: "Placement",
            isRead: false,
          },
          {
            id: 2,
            title: "Semester Result",
            message: "Your semester result has been published.",
            type: "Result",
            isRead: true,
          },
          {
            id: 3,
            title: "Hackathon",
            message: "24-hour coding event this weekend.",
            type: "Event",
            isRead: false,
          },
          {
            id: 4,
            title: "Placement Training",
            message: "Aptitude class at 10 AM.",
            type: "Placement",
            isRead: true,
          },
          {
            id: 5,
            title: "Sports Day",
            message: "Annual sports meet on Friday.",
            type: "Event",
            isRead: false,
          },
          {
            id: 6,
            title: "Exam Result",
            message: "Internal marks uploaded.",
            type: "Result",
            isRead: true,
          },
          {
            id: 7,
            title: "Alarm",
            message: "Prepare DSA and Solve.",
            type: "Result",
            isRead: true,
          },
        ],
      });
    }, 1000);
  });
}