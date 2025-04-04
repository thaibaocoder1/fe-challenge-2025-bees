# Frontend Developer Hiring Test

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)

## 📖 Table of Contents

- [✨ Structure](#-structure)
- [🎊 Features](#-features)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [💻 Usage](#-usage)
  - [Basic Example](#basic-example)
  - [API Documentation](#api-documentation)
- [👏 Acknowledgements](#-acknowledgements)

## ✨ Structure:

```markdown
## 📂 Source Directory Structure

### Core Directories

`src/` - Root source directory
├── api/
│ ├── axios-client.ts
├── assets/
├── components/
│ ├── shared/
├── hooks/
│ ├── use-debounce.ts
│ └── use-theme.ts
├── layout/
│ ├── RootLayout.tsx
├── lib/
│ ├── format-balance.ts
│ └── format-date-time.ts
├── pages/
│ ├── AppDevelopmentTest/
│ ├── LogicTest/
│ └── NotFound/
├── routes/
│ ├── index.route.tsx
├── services/
│ ├── customer.service.ts
├── types/
│ ├── api-response.type.ts
│ └── user.type.ts
└── utils/
├── app-error.ts
├── logic-test.ts
```

## 🎊 Features

- 🧠 Logic Test
- 💻 App Development Test

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm/yarn

### Installation

```bash
npm install && npm run dev
# or
yarn && yarn dev
```

## 💻 Usage

1. **Install dependencies** (common):

```bash
npm install
# or
yarn
```

### Logic Test

- **Run command** (see result in terminal):

```bash
npx tsx .\src\utils\logic-test.ts
```

### App Development Test

- **Run project**

```bash
npm run dev
# or
yarn dev
```

- **Navigate to _App Development Test page_**

![The result of development test!](/src/assets/development-test.png 'Development Test')

## 👏 Acknowledgements

Special thanks to **BEES Group** for this technical challenge opportunity.  
Built with ❤️ by **[Hoang Nguyen Thai Bao]** using modern React/TypeScript, TailwindCSS.  
Shoutout to the open-source community for amazing tools.
