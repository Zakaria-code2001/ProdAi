# Fullstack AI-Powered Application with Next.js

This project is a learning-focused implementation It demonstrates the development of an AI-powered full-stack application using Next.js and several modern tools and frameworks.

## Project Overview

The application integrates AI capabilities, authentication, and database interactions to provide a comprehensive example of full-stack development. As this is a personal learning project, it will evolve significantly over time with customizations and added features.

## Technologies Used

- **Next.js**: React-based framework for building web applications.
- **Clerk**: Authentication provider to handle user authentication.
- **PlanetScale**: Serverless SQL database platform for data storage.
- **Prisma**: ORM for database interaction.
- **OpenAI API**: AI functionality like natural language processing.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **TypeScript**: Typed JavaScript for better development experience.

## Features

- User authentication via Clerk.
- Serverless database setup using PlanetScale.
- AI-powered features integrated through OpenAI API.
- Database interactions managed via Prisma.
- Scalable and maintainable architecture.

## Getting Started

Follow these steps to set up the project locally:

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [PlanetScale CLI](https://planetscale.com/) (for database management)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Hendrixer/fullstack-ai-nextjs.git
   cd fullstack-ai-nextjs
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   NEXT_PUBLIC_CLERK_FRONTEND_API=<your-clerk-frontend-api>
   CLERK_API_KEY=<your-clerk-api-key>
   DATABASE_URL=<your-database-url>
   OPENAI_API_KEY=<your-openai-api-key>
   ```

4. **Initialize the database:**
   ```bash
   npx prisma db push
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

## Folder Structure

```
fullstack-ai-nextjs/
├── prisma/         # Prisma schema
├── public/         # Static assets
├── src/            # Source code
│   ├── components/ # Reusable components
│   ├── pages/      # Next.js pages
│   ├── styles/     # Global styles
│   └── utils/      # Utility functions
└── .env.example    # Example environment variables
```

## Future Enhancements

As part of the learning journey, the following enhancements are planned:

- Customizing the UI and UX to fit personal preferences.
- Adding new AI-powered features.
- Exploring alternative databases like Supabase or Neon.
- Refactoring the codebase for better maintainability.
- Writing comprehensive tests for critical features.

## License

This project is based on a public repository for learning purposes and is not intended for commercial use. Any significant changes will be documented, and the license may evolve as the project progresses.

---

Feel free to contribute, share feedback, or explore new features with this project! 😊
