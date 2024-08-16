import { ChatArea } from "@/components/chat/chatArea";
import { Sidebar } from "@/components/chat/sidebar";
import { createLazyFileRoute } from "@tanstack/react-router";
import { socket } from "@/lib/socket";
import { useEffect } from "react";
import { ChatProvider } from "@/contexts/chatContext";

export const Route = createLazyFileRoute("/chat")({
  component: Chat,
});

function Chat() {
  useEffect(() => {
    function onConnect() {
      console.log("Connected to server");
    }

    function onDisconnect() {
      console.log("Disconnected from server");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.connect();

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <ChatProvider>
      <main>
        <div className="flex h-screen">
          <Sidebar />
          <ChatArea />
        </div>
      </main>
    </ChatProvider>
  );
}
