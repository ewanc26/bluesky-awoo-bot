# Bluesky Awoo Bot

[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

Posts random wolf noises to Bluesky at random intervals.

> Also available on [Tangled](https://tangled.org/ewancroft.uk/bluesky-awoo-bot)

## Install

```bash
git clone https://github.com/ewanc26/bluesky-awoo-bot.git
cd bluesky-awoo-bot
npm install
```

## Config

Create `src/config.env`:

```sh
BLUESKY_USERNAME="your_bluesky_username"
BLUESKY_PASSWORD="your_bluesky_password"
MIN_DELAY_HOURS=1
MAX_DELAY_HOURS=3
```

## Run

```bash
npx ts-node src/index.ts
```

Posts immediately, then schedules the next one at a random interval.

## Project layout

```
src/
├── config.env              # Config
├── index.ts                # Main script
├── wolf-noise-generator.ts # Picks random wolf noises from categories
└── wolf-noises.json        # Predefined howls, playful sounds, scared noises
```

## Licence

MIT

## Support
If you find this project useful, consider supporting its development:
[![Ko-fi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/ewancroft)
[![GitHub Sponsors](https://img.shields.io/badge/GitHub%20Sponsors-30363D?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sponsors/ewanc26)
