// ── Module Header ────────────────────────────────────────
// Bluesky Awoo Bot — posts randomly-generated wolf noises
// on a schedule through the AT Protocol.

import { Client } from "@atproto/lex";
import { PasswordSession } from "@atproto/lex-password-session";
import { api, post } from "@bsky/sdk";
import * as dotenv from "dotenv";
import { generateWolfNoiseString } from "./wolf-noise-generator";

dotenv.config({ path: "./src/config.env" });

let client: Client;

async function login() {
  const session = await PasswordSession.login({
    service: "https://bsky.social",
    identifier: process.env.BLUESKY_USERNAME!,
    password: process.env.BLUESKY_PASSWORD!,
  });
  client = new Client(session, { service: api.app.service });
  console.log("Logged in to Bluesky.");
}

// Pull delay range from env, fall back to sensible defaults
function getMaxDelayHours() {
  return parseInt(process.env.MAX_DELAY_HOURS) || 6;
}

function getMinDelayHours() {
  return parseInt(process.env.MIN_DELAY_HOURS) || 1;
}

// ── Scheduling ───────────────────────────────────────────

// Pick a random delay between min and max hours — keeps posting
// unpredictable without being totally irregular
function getRandomDelay() {
  const minHours = getMinDelayHours();
  const maxHours = getMaxDelayHours();

  const minDelaySeconds = minHours * 60 * 60;
  const maxDelaySeconds = maxHours * 60 * 60;

  let randomDelay;
  do {
    randomDelay =
      Math.floor(Math.random() * (maxDelaySeconds - minDelaySeconds + 1)) +
      minDelaySeconds;
  } while (randomDelay < minDelaySeconds || randomDelay > maxDelaySeconds);

  return randomDelay;
}

// ── Posting ──────────────────────────────────────────────

// Generate and post a single wolf noise to Bluesky
async function main() {
  console.log("Main function called.");

  // Security: abort early if credentials aren't configured
  if (!process.env.BLUESKY_USERNAME || !process.env.BLUESKY_PASSWORD) {
    console.error(
      "Missing required environment variables: BLUESKY_USERNAME and BLUESKY_PASSWORD.\nAborting script.",
    );
    process.exit(1);
  }

  console.log("Environment variables loaded successfully.");

  try {
    await login();

    // Keep generating until we get something non-empty
    let randomNoise;
    do {
      randomNoise = generateWolfNoiseString();
    } while (randomNoise.trim().length === 0);

    if (randomNoise) {
      await client.call(post, {
        text: randomNoise.trim(),
      });
      console.log("Just posted:", randomNoise.trim());
    } else {
      console.log(
        "Failed to generate a valid wolf noise string after multiple attempts.",
      );
    }
  } catch (error) {
    console.error("Error during posting:", error);
  }
}

// ── Loop ─────────────────────────────────────────────────

// Post on a loop, then wait a random interval before the next post
async function runLoop() {
  while (true) {
    await main();

    const delay = getRandomDelay();

    // Format the delay into hours/minutes for the log message
    const hours = Math.floor(delay / 3600);
    const minutes = Math.floor((delay % 3600) / 60);

    const formattedDelay = `${
      hours > 0 ? hours + " hour" + (hours > 1 ? "s" : "") : ""
    }${hours > 0 && minutes > 0 ? " " : ""}${
      minutes > 0 ? minutes + " minute" + (minutes > 1 ? "s" : "") : ""
    }`;

    console.log(`Next post scheduled in approximately ${formattedDelay}.`);

    // setTimeout takes ms, delay is in seconds
    await new Promise((resolve) => setTimeout(resolve, delay * 1000));
  }
}

// Start the loop
runLoop().catch((error) => console.error("Error in run loop:", error));
