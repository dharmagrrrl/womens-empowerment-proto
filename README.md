# EmpowerU

A journey of self-discovery and empowerment through interactive levels and energy tracking.

## Features

- Interactive map with multiple levels
- Energy tracking with gain and loss items
- Beautiful UI with animations and effects
- MongoDB integration for data persistence
- Responsive design for all devices

## Prerequisites

- Node.js 18.x or later
- MongoDB running locally or a MongoDB Atlas connection string
- npm or yarn package manager

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/empoweru.git
cd empoweru
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with your MongoDB connection string:
```
MONGODB_URI=mongodb://localhost:27017/empoweru
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

- `npm run dev` - Start the development server
- `npm run build` - Build the production application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint

## Project Structure

```
empoweru/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── level/             # Level page
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── MapPage.tsx       # Map page component
│   └── LevelPage.tsx     # Level page component
├── lib/                   # Utility functions
│   └── mongodb.ts        # MongoDB connection
├── models/               # Database models
│   └── Level.ts         # Level model
└── public/              # Static assets
```

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- MongoDB with Mongoose
- Tailwind CSS
- Emotion (styled-components)
- Google Fonts (Nunito)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
