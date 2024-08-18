# Realtime Messaging Application

This is a modern, real-time messaging system built with React and Node.js. It enables users to engage in instant messaging with a rich set of features, such as media upload, online/offline status, etc for a seamless communication experience.

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
- Shadcn UI (for UI components)
- Firebase (for storage of media)

### Backend

- Node.js
- Express.js
- Socket.IO (for real-time communication)
- TypeScript
- Drizzle ORM (for database operations)
- PostgreSQL

## Architecture

This realtime messaging application follows a modern, scalable architecture designed for real-time communication. Here's an overview of the system's architecture:

### Backend Architecture

1. **Node.js Server**:

   - Express.js framework handles HTTP requests and serves as the foundation for the API.

2. **WebSocket Server**:

   - Socket.IO server manages real-time bidirectional event-based communication.

3. **Database Layer**:

   - PostgreSQL serves as the primary database.
   - Drizzle ORM handles database operations, providing a type-safe query builder and migration system.

4. **API Structure**:
   - RESTful endpoints for non-real-time operations.
   - Socket event handlers for real-time features like messaging and status updates.

### Data Flow

1. **User Authentication**:

   - Frontend uses Clerk for authentication.
   - Upon successful auth, the backend receives user information and manages sessions.

2. **Real-time Messaging**:

   - Messages sent from the frontend via Socket.IO events.
   - Backend processes messages, stores in the database, and broadcasts to relevant clients.
   - Receiving clients update their UI in real-time.

3. **Status Updates**:

   - Online/offline status and typing indicators use Socket.IO for instant updates.
   - Backend tracks user status and propagates changes to relevant clients.

4. **Media Handling**:

   - Images and videos are uploaded to a file storage system (firebase storage).
   - Media URLs are then generated and stored in database, and rendered on the UI.

5. **Message History**:
   - Frontend requests paginated message history.
   - Backend queries the database and returns messages in batches, supporting infinite scrolling.

This architecture provides a solid foundation for a responsive, real-time messaging application, with clear separation of concerns and scalable components.
