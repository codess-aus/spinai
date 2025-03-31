import { startServer } from # Create and checkout a new branch
git checkout -b azure-openai-config# Create and checkout a new branch
git checkout -b azure-openai-config# Create and checkout a new branch
git checkout -b azure-openai-config# Create and checkout a new branch
git checkout -b azure-openai-config# Add all modified files
git add /workspaces/spinai/my-spinai-app/src/index.ts
git add /workspaces/spinai/.github/workflows/deploy.yml
git add /workspaces/spinai/.devcontainer/devcontainer.json

# Commit the changes
git commit -m "Configure Azure OpenAI environment variables and secrets handling"# Add all modified files
git add /workspaces/spinai/my-spinai-app/src/index.ts
git add /workspaces/spinai/.github/workflows/deploy.yml
git add /workspaces/spinai/.devcontainer/devcontainer.json

# Commit the changes
git commit -m "Configure Azure OpenAI environment variables and secrets handling"# Add all modified files
git add /workspaces/spinai/my-spinai-app/src/index.ts
git add /workspaces/spinai/.github/workflows/deploy.yml
git add /workspaces/spinai/.devcontainer/devcontainer.json

# Commit the changes
git commit -m "Configure Azure OpenAI environment variables and secrets handling""./webhook-server";

if (process.env.NODE_ENV !== "production") {
  // Load dotenv only in development mode
  const dotenv = await import("dotenv");
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
