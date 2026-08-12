# HajirSync 🎵

> **Free LRC Editor & Audio Sync Tool** > Sync lyrics to music, create timed LRC files, and export with ease — directly in your browser.

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-3.1.1-brightgreen.svg)](#)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](#)
[![Website](https://img.shields.io/badge/website-hajirsync.app-3B82F6.svg)](https://hajirsync.haiere.workers.dev)

---

## ✨ Features

* **Offline-First:** Works entirely in your browser with no server requirement.
* **Real-time Synchronization:** Effortlessly sync lyrics with live audio playback.
* **Flexible Modes:** Supports both line-by-line and word-by-word timing.
* **Drag & Drop:** Instant support for `MP3`, `WAV`, `OGG`, and `M4A` formats.
* **Import & Export:** Seamlessly handle `.lrc` and `.txt` files.
* **Productivity Booster:** Rich keyboard shortcuts, Find & Replace, and Undo/Redo support.
* **Themes & Preferences:** Built-in Dark and Light themes with local storage consent management.

---

## 🚀 Quick Start

### Installation

Clone the repository to your local machine:

```bash
git clone [https://github.com/yourusername/hajirsync.git](https://github.com/yourusername/hajirsync.git)
cd hajirsync

Usage
Open index.html directly in your browser, or launch a local development server:
# Option 1: Python 3
python -m http.server 8000

# Option 2: Node.js (via serve)
npx serve .

# Option 3: PHP
php -S localhost:8000

After starting the server, navigate to http://localhost:8000 in your browser.
📖 Usage Examples
Basic Workflow
 * Load Audio: Drag and drop an audio file, or click inside the audio player area.
 * Enter Lyrics: Type, paste, or import a .txt / .lrc file.
 * Sync Lyrics: Play the audio and press Space (or click Sync) as each line is sung.
 * Export: Download your completed .lrc file.
⌨️ Keyboard Shortcuts
| Action | Shortcut |
|---|---|
| Add Timestamp | Space |
| Play / Pause | Ctrl + P |
| Undo | Ctrl + Z |
| Redo | Ctrl + Y |
| Seek Back (2s) | Left Arrow |
| Seek Forward (2s) | Right Arrow |
| Next Line (Sync) | Enter |
| Find & Replace | Ctrl + H |
⚙️ Configuration
URL Parameters
Customize initial load settings directly via query string:
[https://hajirsync.haiere.workers.dev/?theme=dark&tutorial=false](https://hajirsync.haiere.workers.dev/?theme=dark&tutorial=false)

| Parameter | Allowed Values | Default | Description |
|---|---|---|---|
| theme | dark, light | dark | Sets the initial UI color theme |
| tutorial | true, false | true | Toggles showing the tutorial on first visit |
Environment Variables
When deploying as a Cloudflare Worker, configure the following variables:
| Variable | Description |
|---|---|
| HOST | Server host address |
| PORT | Server listening port |
🤝 Contributing
Contributions make the open-source community an amazing place! Here's how you can help:
 * Fork the Project
 * Create your Feature Branch (git checkout -b feature/AmazingFeature)
 * Commit your Changes (git commit -m 'Add some AmazingFeature')
 * Push to the Branch (git push origin feature/AmazingFeature)
 * Open a Pull Request
Development Guidelines
 * Visual Consistency: Maintain the existing minimal visual style.
 * Offline-First Principle: Avoid introducing external runtime dependencies unless necessary.
 * Cross-Browser Compatibility: Test across modern browsers (Chrome, Firefox, Safari, Edge).
 * Accessibility: Ensure ARIA labels and semantic HTML standards are met.
📄 License
Distributed under the MIT License. See LICENSE for more information.
🙏 Acknowledgments
 * Built with vanilla JavaScript, HTML5, and CSS3.
 * Styled using Tailwind CSS.
 * Typography: DM Sans, Syne, and JetBrains Mono.
<p center>Made with care in your browser – 100%</p>