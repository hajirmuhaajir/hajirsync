HajirSync

Free LRC Editor & Audio Sync Tool – Sync lyrics to music, create timed LRC files, and export with ease.

https://img.shields.io/badge/License-MIT-blue.svg
https://img.shields.io/badge/version-3.1.1-brightgreen.svg
https://img.shields.io/badge/build-passing-brightgreen.svg
https://img.shields.io/badge/website-hajirsync.app-3B82F6.svg

---

Features

· Offline-first – works entirely in your browser, no server required
· Real-time lyric synchronization with audio playback
· Line-by-line and word-by-word timing modes
· Drag-and-drop audio support (MP3, WAV, OGG, M4A)
· Import/Export LRC and TXT files
· Keyboard shortcuts for efficient workflow
· Dark and light theme support
· Find and replace functionality
· Undo/Redo support
· Cookie consent management with local preferences

---

Quick Start

Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/hajirsync.git
cd hajirsync
```

Usage

Open index.html directly in your browser or serve via a local development server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (with serve)
npx serve .

# Using PHP
php -S localhost:8000
```

Then navigate to http://localhost:8000 in your browser.

---

Usage Examples

Basic Workflow

1. Load an audio file – drag and drop or click the audio player area
2. Enter your lyrics – type, paste, or load a .txt or .lrc file
3. Sync in real-time – play the audio and press the spacebar or click the sync button as each line is sung
4. Export the final .lrc file

Keyboard Shortcuts

Action Shortcut
Add Timestamp Space
Play / Pause Ctrl + P
Undo Ctrl + Z
Redo Ctrl + Y
Seek Back 2s Left Arrow
Seek Forward 2s Right Arrow
Next Line (Sync) Enter
Find & Replace Ctrl + H

---

Configuration

URL Parameters

The application can be configured via URL parameters:

```
https://hajirsync.haiere.workers.dev/?theme=dark&tutorial=false
```

Parameter Values Default Description
theme dark, light dark Initial theme preference
tutorial true, false true Show tutorial on first visit

Environment Variables

When deploying as a Cloudflare Worker, the following environment variables are supported:

Variable Description
HOST Host address for the server
PORT Port number for the server

---

Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

Development Guidelines

· Maintain the existing visual style and minimal design
· Keep the application offline-first – avoid external dependencies when possible
· Test across modern browsers (Chrome, Firefox, Safari, Edge)
· Ensure accessibility standards are met (ARIA labels, semantic HTML)
· Document any new features or significant changes

---

License

This project is licensed under the MIT License – see the LICENSE file for details.

---

Acknowledgments

· Built with vanilla JavaScript, HTML5, and CSS3
· Uses Tailwind CSS for styling
· Fonts: DM Sans, Syne, JetBrains Mono

---

Made with care in your browser – 100% offline