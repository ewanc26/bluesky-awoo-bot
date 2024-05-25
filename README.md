# Bluesky Awoo Bot

[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

Bluesky Awoo Bot is a simple script designed to periodically post random wolf noises on Bluesky. The bot uses a JSON file of predefined wolf noises, selects a random noise, and posts it on Bluesky at random intervals.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the Repository:**

   ```sh
   git clone https://github.com/ewanc26/bluesky-awoo-bot.git
   cd bluesky-awoo-bot
   ```

2. **Install Dependencies:**

   ```sh
   npm install
   ```

## Configuration

1. **Create a Configuration File:**

   Create a file named `config.env` in the `src` directory with the following contents:

   ```sh
   BLUESKY_USERNAME="your_bluesky_username"
   BLUESKY_PASSWORD="your_bluesky_password"
   MIN_DELAY_HOURS=1
   MAX_DELAY_HOURS=3
   ```

2. **Fill in Your Bluesky Credentials:**

   Replace `your_bluesky_username` and `your_bluesky_password` with your actual Bluesky account credentials.

## Usage

1. **Run the Bot:**

   ```sh
   npx ts-node src/index.ts
   ```

   This command will start the bot, which will post a wolf noise immediately and then schedule subsequent posts at random intervals.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. Ensure that your code follows the existing style and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Project Structure

```plaintext
bluesky-awoo-bot/
│
├── src/
│   ├── config.env                # Environment configuration file
│   ├── index.ts                  # Main script for the bot
│   ├── wolf-noise-generator.ts   # Module for generating random wolf noises
│   └── wolf-noises.json          # JSON file containing predefined wolf noises
│
├── package.json                  # Node.js project metadata and dependencies
└── README.md                     # This README file
```

## Explanation of Files

### `src/config.env`

This file stores the Bluesky credentials required to log in and post. Ensure you keep this file secure and do not share it publicly.

### `src/index.ts`

This is the main script that handles the bot's functionality. It logs into Bluesky, generates a random wolf noise, and posts it. It also schedules future posts at random intervals.

### `src/wolf-noise-generator.ts`

This module contains the logic for generating random wolf noises based on predefined categories and probabilities.

### `src/wolf-noises.json`

This JSON file includes the predefined wolf noises categorized into different types (howl, playful, scared) and associated punctuation.
