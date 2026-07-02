import dotenv from "dotenv";

dotenv.config();

const LOG_URL = process.env.LOG_URL;
const TOKEN = process.env.LOG_TOKEN;

export async function Log(stack, level, packageName, message) {
  if (!LOG_URL) {
    return;
  }

  try {
    const response = await fetch(LOG_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
      },
      body: JSON.stringify({
        stack,
        level,
        package: packageName,
        message
      })
    });

    if (!response.ok) {
      console.log("Failed to send log");
      return;
    }

    console.log("Log sent successfully");
  } catch (error) {
    console.log("Logging Error:", error.message);
  }
}

export function requestLogger(req, res, next) {
  const start = Date.now();

  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`
    );

    Log("request", "info", "notification-app-be", `${req.method} ${req.originalUrl} -> ${res.statusCode}`);
  });

  next();
}