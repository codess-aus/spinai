import { startServer } from "./webhook-server";

if (process.env.NODE_ENV !== "production") {
  // Load dotenv only in development mode
  const dotenv = require("dotenv");
  dotenv.config();
}

// Ensure required environment variables are present
const requiredEnvVars = ["AZURE_OPENAI_API_KEY", "AZURE_OPENAI_ENDPOINT"];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
});

const additionalEnvVars = ["AZURE_OPENAI_MODEL_NAME", "AZURE_OPENAI_REGION"];
additionalEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
});

// Start the webhook server
startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
