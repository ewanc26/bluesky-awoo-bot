import { BskyAgent } from "@atproto/api";
import * as dotenv from "dotenv"; // Import dotenv for loading environment variables
import { CronJob } from "cron"; // Import CronJob for scheduling tasks
import * as process from "process"; // Import process for accessing environment variables
import { generateWolfNoiseString } from "./wolf-noise-generator";

// Load environment variables from the config.env file
dotenv.config({ path: "./src/config.env" });

// Create a Bluesky Agent
const agent = new BskyAgent({
  service: "https://bsky.social",
});

// Main function for generating and posting wolf noise strings
async function main() {
  // Check for empty environment variables and abort if needed
  if (!process.env.BLUESKY_USERNAME || !process.env.BLUESKY_PASSWORD) {
    console.error(
      "Missing required environment variables: BLUESKY_USERNAME and BLUESKY_PASSWORD. Aborting script."
    );
    return;
  }

  try {
    // Login to Bluesky
    await agent.login({
      identifier: process.env.BLUESKY_USERNAME!,
      password: process.env.BLUESKY_PASSWORD!,
    });

    // Generate a random wolf noise string
    let randomNoise;
    do {
      randomNoise = generateWolfNoiseString();
    } while (randomNoise.trim().length === 0); // Loop until a non-empty string is generated

    // Post the generated string to Bluesky
    if (randomNoise) {
      await agent.post({
        text: randomNoise.trim(), // Use the generated string (trimmed)
        langs: ["en-US"],
        createdAt: new Date().toISOString(),
      });
      console.log("Just posted:", randomNoise.trim()); // Log the posted string
    } else {
      console.log("Failed to generate a valid wolf noise string after multiple attempts.");
    }
  } catch (error) {
    console.error("Error during posting:", error);
    // You can optionally implement retry logic or notify someone here
  }
}

// Run the main function immediately
main();

// Function to generate a random delay before the next post
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

// Schedule a cron job to run the main function periodically
const scheduleExpression = "0 * * * *"; // Every hour (used as a base for randomization)

const job = new CronJob(scheduleExpression, async () => {
  // Calculate a random delay before running the main function
  const delay = getRandomDelay();
  console.log(`Next post scheduled in approximately ${(delay / 3600).toFixed(2)} hours.`);
  
  // Wait for the random delay
  await new Promise((resolve) => setTimeout(resolve, delay * 1000));
  
  // Run the main function
  main();
});

// Start the cron job
job.start();
