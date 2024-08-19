import React, { createContext, useContext, useState, useEffect } from "react";
import { socket } from "@/lib/socket";
import { useUser } from "@clerk/clerk-react";
import { toast } from "sonner";

export interface User {
  id: number;
  email: string;
  isOnline: boolean;
  firstName: string;
  lastName: string;
}

export interface Message {
  id: number;
  createdAt: Date;
  senderId: number;
  conversationId: number;
  content: string;
  isRead: boolean;
  mediaUrl: string | null;
  mediaType: string | null;
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
  setAllUsers: (users: User[]) => void;
  sendMessage: (
    conversationId: number,
    content: string,
    senderId: number,
    mediaUrl?: string,
    mediaType?: string
  ) => void;
  joinChat: (email: string, firstName: string, lastName: string) => void;
  startConversation: (otherUserId: number, currentUserId: number) => void;
  activeConversation: number | null;
  setActiveConversation: (id: number | null) => void;
  currentReceipient: User | null;
  setCurrentReceipient: (user: User | null) => void;
  getConversation: (conversationId: number) => void;
  startTyping: (
    typeing: boolean,
    conversationId: number,
    senderId: number
  ) => void;
  isUserTyping: {
    [receipientId: number]: { isTyping: boolean; userId: number };
  };
  setIsUserTyping: (isTyping: {
    [receipientId: number]: { isTyping: boolean; userId: number };
  }) => void;
  isUserOnline: { [userId: number]: boolean | null };
  setIsUserOnline: (isOnline: { [userId: number]: boolean | null }) => void;
  getLatestMessages: (userId: number) => void;
  recentMessages: { conversationId: number; recentMessage: Message }[];
  setRecentMessages: (
    messages: { conversationId: number; recentMessage: Message }[]
  ) => void;
  markMessagesAsRead: (messageId: number) => void;
  fetchMoreMessages: (conversationId: number, limit: number) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const user = useUser();
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
  const [isUserTyping, setIsUserTyping] = useState<{
    [receipientId: number]: { isTyping: boolean; userId: number };
  }>({});
  const [isUserOnline, setIsUserOnline] = useState<{
    [userId: number]: boolean | null;
  }>({});
  const [recentMessages, setRecentMessages] = useState<
    { conversationId: number; recentMessage: Message }[]
  >([]);

  useEffect(() => {
    socket.on("joined", (user: User) => {
      setCurrentUser(user);
    });

    socket.on("conversationList", (convList: Conversation[]) => {
      setConversations(convList);
    });

    console.log(currentUser?.id.toString(), "current user id");
    socket.on(currentUser?.id.toString() || "", (message: Message) => {
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
      toast.success("Message sent");
    });

    socket.on("userList", (users: User[]) => {
      const filteredUsers = users.filter((user) => user.id !== currentUser?.id);
      setAllUsers(filteredUsers);
    });

    socket.on(
      "conversationReady",
      (conversationId: number, recentMessages: Message[]) => {
        setActiveConversation(conversationId);
        setMessages((prev) => {
          return { ...prev, [conversationId]: recentMessages?.reverse() };
        });
      }
    );

    socket.on(
      "userTyping",
      (isTyping: boolean, conversationId: number, userId: number) => {
        setIsUserTyping((prev) => {
          return { ...prev, [conversationId]: { isTyping, userId } };
        });
      }
    );

    socket.on("userOnline", (isOnline: boolean, userId: number) => {
      setIsUserOnline((prev) => {
        return { ...prev, [userId]: isOnline };
      });
    });

    socket.on("recentMessages", (messages) => {
      setRecentMessages(messages);
    });

    socket.on("messagesRead", (messageId: number, conversationId: number) => {
      const msg = recentMessages?.find(
        (msg) => msg.conversationId === conversationId
      );
      if (msg) {
        setRecentMessages((prev) => {
          return prev.map((item) => {
            if (
              item.conversationId === conversationId &&
              item.recentMessage.id === messageId
            ) {
              return {
                ...item,
                recentMessage: {
                  ...item.recentMessage,
                  isRead: true,
                },
              };
            }
            return item;
          });
        });
      }
    });

    socket.on("moreMessages", ({ conversationId, messages: newMessages }) => {
      setMessages((prev) => ({
        ...prev,
        [conversationId]: [...newMessages].reverse(),
      }));
    });

    return () => {
      socket.off("joined");
      socket.off("conversationList");
      socket.off(currentUser?.id.toString() || "");
      socket.off("userList");
      socket.off("conversationReady");
      socket.off("messageSent");
      socket.off("userTyping");
      socket.off("userOnline");
      socket.off("recentMessages");
      socket.off("messagesRead");
      socket.off("moreMessages");
    };
  }, [currentUser, user]);

  const joinChat = (email: string, firstName: string, lastName: string) => {
    socket.emit("join", email, firstName, lastName);
  };

  const sendMessage = (
    conversationId: number,
    content: string,
    senderId: number,
    mediaUrl?: string,
    mediaType?: string
  ) => {
    if (mediaUrl && mediaType) {
      socket.emit(
        "message",
        content,
        conversationId,
        senderId,
        mediaUrl,
        mediaType
      );
    } else {
      socket.emit("message", content, conversationId, senderId);
    }
  };

  const startConversation = (otherUserId: number, currentUserId: number) => {
    socket.emit("getOrCreateConversation", otherUserId, currentUserId);
  };

  const getConversation = (conversationId: number) => {
    socket.emit("getConversation", conversationId);
  };

  const startTyping = (
    typeing: boolean,
    conversationId: number,
    senderId: number
  ) => {
    socket.emit("typing", typeing, conversationId, senderId);
  };

  const getLatestMessages = (userId: number) => {
    socket.emit("getLatestMessages", userId);
  };

  const markMessagesAsRead = (messageId: number) => {
    socket.emit("readMessages", messageId);
  };

  const fetchMoreMessages = (conversationId: number, limit: number) => {
    const fetchNumberMessages = messages[conversationId].length + limit;
    socket.emit("loadMoreMessages", conversationId, fetchNumberMessages);
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
        startTyping,
        isUserTyping,
        setIsUserTyping,
        isUserOnline,
        setIsUserOnline,
        getLatestMessages,
        recentMessages,
        setRecentMessages,
        markMessagesAsRead,
        fetchMoreMessages,
        setAllUsers,
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
