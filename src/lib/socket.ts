// Client code (socket.ts)
import { io } from "socket.io-client";

const URL = process.env.VITE_BACKEND_URL || "http://localhost:8000";

export const socket = io(URL);
