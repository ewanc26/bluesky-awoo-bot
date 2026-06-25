// ── Module Header ────────────────────────────────────────
// Wolf noise generator — builds random strings from a
// categorized word list for posting to Bluesky.

import * as fs from "fs";

// Uniform random integer in [min, max], inclusive
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Load the word lists from the JSON data file
function getWolfNoises(): {
  howl: string[];
  playful: string[];
  scared: string[];
  punctuation: { [category: string]: string[] };
} {
  try {
    const data = fs.readFileSync("src/wolf-noises.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading wolf-noises.json:", error);
    throw error;
  }
}

// ── Generator ────────────────────────────────────────────

/**
 * Build a random wolf-noise string from the categorized word list.
 * Biased toward shorter posts (70-140 chars) with occasional very short
 * (1-5 words) or full-length (280 chars) variants.
 */
export function generateWolfNoiseString(): string {
  const wolfNoises = getWolfNoises();
  const categoryProbabilities = {
    howl: 0.4,
    playful: 0.3,
    scared: 0.3,
  };

  // Pick a category weighted by probability
  const random = Math.random();
  let category;
  if (random < categoryProbabilities.howl) {
    category = "howl";
  } else if (
    random <
    categoryProbabilities.howl + categoryProbabilities.playful
  ) {
    category = "playful";
  } else {
    category = "scared";
  }

  const randomWords = wolfNoises[category];
  let result = "";

  // Decide post length: 90% short/very-short, 10% full-length
  const shorterPostProbability = 0.9;
  const generateShorterOrVeryShortPost = Math.random() < shorterPostProbability;
  let maxLength;

  if (generateShorterOrVeryShortPost) {
    // Of the short posts, 30% are very short (1-5 words), 70% are moderate (70-140 chars)
    const veryShortPostProbability = 0.3;
    const generateVeryShortPost = Math.random() < veryShortPostProbability;

    if (generateVeryShortPost) {
      const wordCount = getRandomInt(1, 5);
      maxLength = wordCount * 10;
    } else {
      maxLength = getRandomInt(70, 140);
    }
  } else {
    maxLength = 280;
  }

  // Build the string word by word until we hit the length cap
  while (result.length < maxLength) {
    const randomWord = randomWords[getRandomInt(0, randomWords.length - 1)];
    const wordLength = randomWord.length;

    if (result.length + wordLength <= maxLength) {
      if (result.length > 0) {
        result += " ";
      }
      result += randomWord;
    } else {
      break;
    }
  }

  // Append category-appropriate punctuation, unless the string already ends with some
  if (
    wolfNoises.punctuation &&
    wolfNoises.punctuation[category] &&
    wolfNoises.punctuation[category].length > 0
  ) {
    const punctuationLength = wolfNoises.punctuation[category].length;
    const hasPunctuation = result.length > 0 && /[?!.]$/.test(result);

    if (!hasPunctuation) {
      const randomPunctuation =
        wolfNoises.punctuation[category][
          getRandomInt(0, punctuationLength - 1)
        ];
      result += randomPunctuation;
    }
  }

  return result.trim();
}
