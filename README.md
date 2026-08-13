# Free LRC Editor & Audio Sync Tool

Sync lyrics to music, create timed LRC files, and export them easily directly in your browser.

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-3.1.1-brightgreen.svg)](#)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](#)
[![Website](https://img.shields.io/badge/website-hajirsync.app-3B82F6.svg)](https://hajirsync.haiere.workers.dev)

---

## Overview

Free LRC Editor & Audio Sync Tool is an offline-first web app for creating and editing synchronized lyrics. It runs entirely in the browser, so you can work without a backend server.

## Features

- Offline-first, works entirely in the browser with no server requirement.
- Real-time lyric synchronization with live audio playback.
- Supports both line-by-line and word-by-word timing.
- Drag and drop support for `MP3`, `WAV`, `OGG`, and `M4A`.
- Import and export support for `.lrc` and `.txt` files.
- Keyboard shortcuts, Find and Replace, and Undo/Redo support.
- Dark and Light themes with local storage consent management.

## Quick Start

### Install

Clone the repository:

```bash
git clone https://github.com/yourusername/hajirsync.git
cd hajirsync
```

### Run locally

Open `index.html` directly in your browser, or start a local development server:

```bash
# Python 3
python -m http.server 8000
```

```bash
# Node.js
npx serve .
```

```bash
# PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Usage

1. Load an audio file by dragging and dropping it, or by clicking inside the audio player area.
2. Enter lyrics by typing, pasting, or importing a `.txt` or `.lrc` file.
3. Play the audio and press Space, or click Sync, as each line is sung.
4. Export the finished `.lrc` file.

## Keyboard Shortcuts

| Action | Shortcut |
|---|---|
| Add timestamp | Space |
| Play / Pause | Ctrl + P |
| Undo | Ctrl + Z |
| Redo | Ctrl + Y |
| Seek back 2s | Left Arrow |
| Seek forward 2s | Right Arrow |
| Next line | Enter |
| Find and replace | Ctrl + H |

## Configuration

### URL Parameters

Customize the initial load settings with query parameters:

`https://hajirsync.haiere.workers.dev/?theme=dark&tutorial=false`

| Parameter | Allowed values | Default | Description |
|---|---|---|---|
| `theme` | `dark`, `light` | `dark` | Sets the initial UI color theme. |
| `tutorial` | `true`, `false` | `true` | Toggles the tutorial on first visit. |

### Environment Variables

When deploying as a Cloudflare Worker, configure these variables:

| Variable | Description |
|---|---|
| `HOST` | Server host address. |
| `PORT` | Server listening port. |

## Contributing

Contributions are welcome.

1. Fork the project.
2. Create a feature branch.
3. Commit your changes.
4. Push to the branch.
5. Open a pull request.

### Development Guidelines

- Keep the existing minimal visual style.
- Preserve the offline-first approach.
- Avoid external runtime dependencies unless necessary.
- Test in modern browsers such as Chrome, Firefox, Safari, and Edge.
- Ensure semantic HTML and ARIA labels are used properly.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments

- Built with vanilla JavaScript, HTML5, and CSS3.
- Styled using Tailwind CSS.
- Typography uses DM Sans, Syne, and JetBrains Mono.

<p align="center">Made with care in your browser — 100%</p>