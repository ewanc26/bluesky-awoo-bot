import { BskyAgent } from "@atproto/api";
import * as dotenv from "dotenv"; // Added dotenv import
import { CronJob } from "cron";
import * as process from "process";
import { generateWolfNoiseString } from "./wolf-noise-generator"; // Import the function

// Load environment variables from the config.env file
dotenv.config({ path: "./config.env" });

// Create a Bluesky Agent
const agent = new BskyAgent({
  service: "https://bsky.social",
});

async function main() {
  // Check for empty environment variables and abort if needed
  if (!process.env.BLUESKY_USERNAME || !process.env.BLUESKY_PASSWORD) {
    console.error(
      "Missing required environment variables: BLUESKY_USERNAME and BLUESKY_PASSWORD. Aborting script."
    );
    return; // Exit the function if variables are empty
  }

  try {
    await agent.login({
      identifier: process.env.BLUESKY_USERNAME!,
      password: process.env.BLUESKY_PASSWORD!,
    });

    // Generate a random wolf noise string
    let randomNoise;
    do {
      randomNoise = generateWolfNoiseString();
    } while (randomNoise.trim().length === 0); // Loop until a non-empty string is generated

    if (randomNoise) {
      await agent.post({
        text: randomNoise.trim(), // Use the generated string (trimmed)
        langs: ["en-US"],
        createdAt: new Date().toISOString(),
      });
      console.log("Just posted:", randomNoise.trim());
    } else {
      console.log("Failed to generate a valid wolf noise string after multiple attempts.");
    }
  } catch (error) {
    console.error("Error during posting:", error);
    // You can optionally implement retry logic or notify someone here
  }
}

main();

// Function to generate a random delay within 1-3 hours (in seconds)
function getRandomDelay() {
  const minHours = 1; // Minimum hours for delay
  const maxHours = 3; // Maximum hours for delay

  // Convert hours to seconds
  const minDelaySeconds = minHours * 60 * 60;
  const maxDelaySeconds = maxHours * 60 * 60;

  // Generate a random number within the desired range (inclusive)
  const randomDelay =
    Math.floor(Math.random() * (maxDelaySeconds - minDelaySeconds + 1)) +
    minDelaySeconds;

  return randomDelay;
}

// Run this on a cron job
const scheduleExpression = "0 * * * *"; // Every hour (used as a base for randomization)

const job = new CronJob(scheduleExpression, async () => {
  const delay = getRandomDelay();
  console.log(`Waiting for ${delay / 3600} hours before running main...`);
  await new Promise((resolve) => setTimeout(resolve, delay * 1000)); // Wait for the random delay
  main();
});

job.start();
