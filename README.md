# 🎵 Melodia — Local Music & Video Player

<img width="1918" height="1079" alt="Melodia – Local Music & Video Player Screenshot" src="https://github.com/user-attachments/assets/38f5f163-cf4c-4fbb-9876-25c64f4b4544" />

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/SimpleCyber/local-player/pulls)

**A beautiful, privacy-first media player that runs entirely in your browser.**  
No uploads. No accounts. Just your music and videos — played locally.

[🐛 Report a Bug](https://github.com/SimpleCyber/local-player/issues/new?template=bug_report.md) · [✨ Request a Feature](https://github.com/SimpleCyber/local-player/issues/new?template=feature_request.md) · [🤝 Contribute](#contributing)

</div>

---

## ✨ Features

- 🎵 **Local Audio & Video Playback** — Play MP3, FLAC, WAV, OGG, MP4, WebM, and more directly from your device
- 📁 **Folder Management** — Add and browse entire folders; tracks are auto-organized
- 💿 **Playlists** — Create, rename, and manage custom playlists
- ❤️ **Liked Songs** — Star your favourites for quick access
- 🗂️ **Queue** — Build a play queue on the fly
- 🔍 **Search** — Instantly filter tracks by title or path
- 🌙 **Dark / Light Theme** — Elegant theming with smooth transitions
- 📺 **Video Panel** — Dedicated panel for video playback
- 🖥️ **Picture-in-Picture** — Pop the video out into a floating window
- 🎛️ **OS Media Controls** — Integrates with system media keys (Media Session API)
- 💾 **Fully Offline & Private** — Zero server, zero data collection

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/SimpleCyber/local-player.git

# 2. Navigate into the project
cd local-player

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser and start playing! 🎶

### Build for Production

```bash
npm run build
npm run start
```

---

## 🗂️ Project Structure

```
local-player/
├── app/
│   ├── components/
│   │   ├── HiddenMedia.tsx      # Hidden <audio>/<video> elements, core playback engine
│   │   ├── MainArea/            # Track table, header, search
│   │   ├── Modals/              # Add folder, create playlist, confirm dialogs
│   │   ├── PlayerBar/           # Bottom playback controls (play/pause, seek, volume)
│   │   ├── Sidebar/             # Navigation, folders list, playlists list
│   │   └── VideoPanel/          # Floating/docked video display
│   ├── context/
│   │   └── PlayerContext.tsx    # Global state via React Context
│   ├── hooks/                   # Custom React hooks
│   ├── lib/
│   │   └── utils.ts             # Shared utilities (color themes, formatters, etc.)
│   ├── types/                   # TypeScript type definitions
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout & metadata
│   ├── page.tsx                 # Root page entry
│   └── player.tsx               # Top-level Player component
├── public/                      # Static assets
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 🛠️ Tech Stack

| Tech | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16 | Framework & routing |
| [React](https://react.dev/) | 19 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Styling |
| [Lucide React](https://lucide.dev/) | latest | Icons |

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. **Any contributions you make are greatly appreciated!**

### How to Contribute

1. **Fork** the repository
2. **Create** your feature branch
   ```bash
   git checkout -b feature/your-amazing-feature
   ```
3. **Make** your changes and commit them
   ```bash
   git commit -m "feat: add your amazing feature"
   ```
4. **Push** to your branch
   ```bash
   git push origin feature/your-amazing-feature
   ```
5. **Open** a Pull Request on GitHub

### Contribution Guidelines

- Follow the existing code style (TypeScript + functional React components)
- Keep components focused and reusable
- Add comments for complex logic
- Test your changes before submitting a PR
- Write clear, descriptive commit messages (we follow [Conventional Commits](https://www.conventionalcommits.org/))

### Good First Issues

New to the project? Look for issues tagged [`good first issue`](https://github.com/SimpleCyber/local-player/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) — these are beginner-friendly tasks perfect for getting started.

### Ideas for Contributions

- 🎨 New color themes
- 🌐 Internationalization (i18n) support
- ⌨️ Keyboard shortcut improvements
- 📱 Better mobile responsiveness
- 🧪 Unit/integration tests
- 📖 Documentation improvements
- 🐛 Bug fixes

---

## 🐛 Reporting Bugs

Found a bug? Please [open an issue](https://github.com/SimpleCyber/local-player/issues/new) and include:

- A clear description of the problem
- Steps to reproduce it
- Your OS and browser version
- Screenshots if applicable

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for more information.

---

## 🌟 Show Your Support

If you find this project useful, please consider giving it a ⭐ on GitHub — it helps others discover the project and motivates continued development!

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/SimpleCyber">SimpleCyber</a> and <a href="https://github.com/SimpleCyber/local-player/graphs/contributors">contributors</a>
</div>
