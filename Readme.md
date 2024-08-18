# Realtime Messaging Application

This is a modern, real-time messaging system built with React and Node.js. It enables users to engage in instant messaging with a rich set of features for a seamless communication experience.

## Key Features

1. **Real-time Messaging**: Instant message delivery between users using Socket.IO.
2. **Online/Offline Status**: Real-time updates of user status (online/offline).
3. **Typing Indicator**: "Typing..." indicator displayed while a user is composing a message.
4. **Read/Unread Message Sorting**: Messages are sorted based on read/unread status for easy tracking.
5. **Media Sharing**: Support for image and video uploads in conversations.
6. **Infinite Scrolling**: Load older messages seamlessly as users scroll up in a conversation.
7. User authentication with Clerk
8. Responsive design for both desktop and mobile
9. Conversation management

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- TanStack Router (for routing)
- Socket.IO Client (for real-time communication)
- Tailwind CSS (for styling)
- Clerk (for authentication)
- Radix UI (for UI components)
- Firebase (for storage of media)

### Backend

- Node.js
- Express.js
- Socket.IO (for real-time server)
- TypeScript
- Drizzle ORM (for database operations)
- PostgreSQL
