import { ChatArea } from "@/components/chat/chatArea";
import { Sidebar } from "@/components/chat/sidebar";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/chat")({
  component: Chat,
});

function Chat() {
  return (
    <main>
      <div className="flex h-screen">
        <Sidebar />
        <ChatArea />
      </div>
    </main>
  );
}
