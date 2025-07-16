# MERN Bug Tracker

A full-stack bug tracking application built with the MERN stack (MongoDB, Express, React, Node.js) with comprehensive testing and debugging.

## Features

- Create, read, update, and delete bugs
- Track bug status (open, in-progress, resolved)
- Set bug priority (low, medium, high)
- Comprehensive testing at all levels
- Error handling and debugging tools

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd client
   npm install
   cd ..
3. Set up environment variables:

- Create .env file in server/config/config.env
- Add your MongoDB connection string:


MONGO_URI=mongodb://localhost:27017/bug-tracker

4. Start the development servers:
- Backend (from root directory):

cd server
npm run dev

- Frontend (in a new terminal):

cd client
npm start

## Testing
### Backend Tests

cd server
npm test

### Frontend Unit/Integration Tests

cd client
npm test

### End-to-End Tests (Cypress)

cd client
npm run cypress:open

## Debugging Techniques

1. Console Logging:

- Strategic console.log() statements throughout the code

- Particularly in form handlers and API calls

2. Chrome DevTools:

- Inspect network requests

- Use React DevTools for component inspection

- Set breakpoints in frontend code

3. Node.js Inspector:

- Start server with node --inspect server/src/server.js

- Connect Chrome DevTools for server-side debugging

4. Error Boundaries:

- Implemented to catch component errors

- Provides fallback UI when errors occur

## Testing Approach
- Unit Tests: Test individual functions and components in isolation

- Integration Tests: Test how different parts work together (API routes, component interactions)

- End-to-End Tests: Test complete user flows with Cypress

- Mocking: Used extensively to isolate tests (mock API calls, database operations)

- Code Coverage: Configured to track test coverage across the application

## Project Structure

mern-bug-tracker/
├── client/                 # React front-end
│   ├── src/                # React source code
│   │   ├── components/     # React components
│   │   ├── tests/          # Client-side tests
│   │   │   ├── unit/       # Unit tests
│   │   │   └── integration/ # Integration tests
│   │   └── App.jsx         # Main application component
│   └── cypress/            # End-to-end tests
├── server/                 # Express.js back-end
│   ├── src/                # Server source code
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── middleware/     # Custom middleware
│   └── tests/              # Server-side tests
│       ├── unit/           # Unit tests
│       └── integration/    # Integration tests
├── jest.config.js          # Jest configuration
└── package.json            # Project dependencies


This implementation provides a complete MERN stack bug tracker application with comprehensive testing at all levels (unit, integration, and end-to-end) and demonstrates various debugging techniques. The project follows the specified structure and includes all the required features and testing requirements.

![alt text](<Screenshot 2025-07-16 225557.png>)

![alt text](<Screenshot 2025-07-16 230414.png>)

