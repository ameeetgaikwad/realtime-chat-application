import { ChatArea } from "@/components/chat/chatArea";
import { Sidebar } from "@/components/chat/sidebar";
import { createLazyFileRoute, useRouter } from "@tanstack/react-router";
import { socket } from "@/lib/socket";
import { useEffect } from "react";
import { ChatProvider } from "@/contexts/chatContext";
import { useUser } from "@clerk/clerk-react";
import { toast } from "sonner";

export const Route = createLazyFileRoute("/chat")({
  component: Chat,
});

function Chat() {
  const user = useUser();
  const router = useRouter();
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

    if (!user.isSignedIn && user.isLoaded) {
      toast.error("Please Signin");
      router.navigate({ to: "/" });
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [user]);

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
