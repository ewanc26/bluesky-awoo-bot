# Bluesky Awoo Bot

[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

<p align="center">
  <a href="https://github.com/ewanc26/bluesky-awoo-bot/actions/workflows/ci.yml"><img src="https://github.com/ewanc26/bluesky-awoo-bot/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/ewanc26/bluesky-awoo-bot?label=licence" alt="Licence"></a>
  <a href="https://github.com/sponsors/ewanc26"><img src="https://img.shields.io/github/sponsors/ewanc26?logo=githubsponsors&logoColor=white&label=sponsors" alt="Sponsor"></a>
</p>

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
npm start
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

MIT. See [LICENSE](LICENSE) for the licence terms.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the workflow and the checks required before opening a pull request.

## Support

If you find this project useful, consider supporting its development:

[![Ko-fi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/ewancroft)
[![GitHub Sponsors](https://img.shields.io/badge/GitHub%20Sponsors-30363D?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sponsors/ewanc26)
[![Liberapay](https://img.shields.io/badge/Liberapay-A60000?style=for-the-badge&logo=liberapay&logoColor=white)](https://liberapay.com/ewanc26/)
