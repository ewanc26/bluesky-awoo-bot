import * as fs from "fs"; // File system module

// Function to getRandomInt
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to read the JSON data
function getWolfNoises(): {
  howl: string[];
  playful: string[];
  scared: string[];
  punctuation: { [category: string]: string[] }; // Nested object for category-specific punctuation
} {
  try {
    const data = fs.readFileSync("src/wolf-noises.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading wolf-noises.json:", error);
    throw error; // Re-throw the error for handling
  }
}

export function generateWolfNoiseString(): string {
  const wolfNoises = getWolfNoises(); // Read JSON data
  const categoryProbabilities = {
    howl: 0.4, // 40% chance
    playful: 0.3, // 30% chance
    scared: 0.3, // 30% chance
  };

  const random = Math.random();
  let category;

  // Determine the category based on probabilities
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

  const randomWords = wolfNoises[category]; // Get words for the selected category

  let result = "";
  let currentSentenceLength = 0;

  // Determine whether to generate a shorter post, longer post, or very short post
  const shorterPostProbability = 0.9; // 90% chance of generating a shorter or very short post
  const generateShorterOrVeryShortPost = Math.random() < shorterPostProbability;
  let maxLength;

  if (generateShorterOrVeryShortPost) {
    // Determine whether to generate a very short post (1-5 words) or a shorter post (up to 140 or 280 characters)
    const veryShortPostProbability = 0.3; // 30% chance of generating a very short post
    const generateVeryShortPost = Math.random() < veryShortPostProbability;

    if (generateVeryShortPost) {
      // Generate a very short post (1-5 words)
      const wordCount = getRandomInt(1, 5);
      maxLength = wordCount * 10; // Assuming an average word length of 10 characters
    } else {
      // Generate a shorter post (up to 140 or 280 characters)
      maxLength = getRandomInt(70, 140); // For shorter post
      // maxLength = getRandomInt(140, 280); // For longer post
    }
  } else {
    // Generate a longer post (up to 280 characters)
    maxLength = 280;
  }

  while (result.length < maxLength) {
    const randomWord = randomWords[getRandomInt(0, randomWords.length - 1)];
    const wordLength = randomWord.length;

    // Check if adding the word exceeds the maximum length
    if (result.length + wordLength <= maxLength) {
      // Add a space if it's not the first word and result is not empty
      if (result.length > 0) {
        result += " ";
      }
      result += randomWord;
      currentSentenceLength += wordLength;
    } else {
      // Break the loop if adding the word would exceed the maximum length
      break;
    }
  }

  // Optionally add punctuation based on the selected category
  if (
    wolfNoises.punctuation &&
    wolfNoises.punctuation[category] &&
    wolfNoises.punctuation[category].length > 0
  ) {
    const punctuationLength = wolfNoises.punctuation[category].length;

    // Check if there's already punctuation at the end
    const hasPunctuation = result.length > 0 && /[?!.]$/.test(result);

    if (!hasPunctuation) {
      const randomPunctuation =
        wolfNoises.punctuation[category][
          getRandomInt(0, punctuationLength - 1)
        ];
      result += randomPunctuation;
    }
  }

  return result.trim(); // Remove any leading/trailing whitespace
}
