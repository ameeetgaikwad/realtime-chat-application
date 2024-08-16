import React, { createContext, useContext, useState, useEffect } from "react";
import { socket } from "@/lib/socket";

export interface User {
  id: number;
  email: string;
  isOnline: boolean;
  firstName: string;
}

export interface Message {
  id: number;
  senderId: number;
  content: string;
  createdAt: string;
  isRead: boolean;
  conversationId: number;
}

export interface Conversation {
  id: number;
  user1Id: number;
  user2Id: number;
  lastMessageAt: string;
}

interface ChatContextType {
  currentUser: User | null;
  conversations: Conversation[];
  messages: { [conversationId: number]: Message[] };
  allUsers: User[];
  sendMessage: (
    conversationId: number,
    content: string,
    senderId: number
  ) => void;
  joinChat: (email: string, firstName: string, lastName: string) => void;
  startConversation: (otherUserId: number) => void;
  activeConversation: number | null;
  setActiveConversation: (id: number | null) => void;
  currentReceipient: User | null;
  setCurrentReceipient: (user: User | null) => void;
  getConversation: (conversationId: number) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<{
    [conversationId: number]: Message[];
  }>({});
  const [activeConversation, setActiveConversation] = useState<number | null>(
    null
  );
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [currentReceipient, setCurrentReceipient] = useState<User | null>(null);

  useEffect(() => {
    socket.on("joined", (user: User) => {
      console.log("inside joined event");
      setCurrentUser(user);
    });

    socket.on("conversationList", (convList: Conversation[]) => {
      setConversations(convList);
    });

    console.log(currentUser?.id.toString(), "current user id");
    socket.on(currentUser?.id.toString() || "", (message: Message) => {
      console.log("reached");
      setMessages((prev) => ({
        ...prev,
        [message.conversationId]: [
          ...(prev[message.conversationId] || []),
          message,
        ],
      }));
    });

    socket.on("messageSent", (message: Message) => {
      setMessages((prev) => ({
        ...prev,
        [message.conversationId]: [
          ...(prev[message.conversationId] || []),
          message,
        ],
      }));
    });

    socket.on("userList", (users: User[]) => {
      setAllUsers(users);
    });

    socket.on(
      "conversationReady",
      (conversationId: number, recentMessages: Message[]) => {
        console.log("conversation ready",recentMessages,conversationId);
        setActiveConversation(conversationId);
        setMessages((prev) => {
          return { ...prev, [conversationId]: recentMessages.reverse() };
        });
      }
    );

    return () => {
      socket.off("joined");
      socket.off("conversationList");
      socket.off(currentUser?.id.toString() || "");
      socket.off("userList");
      socket.off("conversationReady");
      socket.off("messageSent");
    };
  }, [currentUser]);

  const joinChat = (email: string, firstName: string, lastName: string) => {
    socket.emit("join", email, firstName, lastName);
  };

  const sendMessage = (
    conversationId: number,
    content: string,
    senderId: number
  ) => {
    socket.emit("message", content, conversationId, senderId);
  };

  const startConversation = (otherUserId: number) => {
    socket.emit("getOrCreateConversation", otherUserId);
  };

  const getConversation = (conversationId: number) => {
    socket.emit("getConversation", conversationId);
  };

  return (
    <ChatContext.Provider
      value={{
        currentUser,
        conversations,
        messages,
        allUsers,
        sendMessage,
        joinChat,
        startConversation,
        activeConversation,
        setActiveConversation,
        currentReceipient,
        setCurrentReceipient,
        getConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
