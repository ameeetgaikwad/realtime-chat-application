import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useChat, User } from "@/contexts/chatContext";
import { Spinner } from "../spinner";

const Sidebar = () => {
  const {
    conversations,
    allUsers,
    setActiveConversation,
    startConversation,
    setCurrentReceipient,
    getConversation,
  } = useChat();
  // console.log(messages[27],'klj')
  const handleUserClick = (user: User) => {
    setCurrentReceipient(user);
    const existingConversation = conversations.find(
      (conv) => conv.user1Id === user.id || conv.user2Id === user.id
    );

    if (existingConversation) {
      setActiveConversation(existingConversation.id);
      getConversation(existingConversation.id);
    } else {
      startConversation(user.id);
    }
  };

  return (
    <>
      {allUsers.length > 0 ? (
        <div className="w-1/3 border-r">
          <div className="p-4">
            <Input type="search" placeholder="Search" className="w-full" />
          </div>
          <div className="flex justify-around p-2">
            <Button variant="default">All</Button>
            <Button variant="outline">Unread</Button>
            <Button variant="outline">Archived</Button>
            <Button variant="outline">Blocked</Button>
          </div>
          <div className="overflow-y-auto h-[calc(100vh-8rem)]">
            {allUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-start p-4 border-b cursor-pointer"
                onClick={() => handleUserClick(user)}
              >
                <Avatar className="mr-4">
                  <AvatarImage src="/placeholder-user.jpg" alt={user.email} />
                  <AvatarFallback>{user.email[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{user.email}</div>
                  <div className="text-xs text-muted-foreground">
                    {user.isOnline ? "Online" : "Offline"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="h-screen flex items-center justify-center w-[30%]">
            <Spinner />
          </div>
        </>
      )}
    </>
  );
};

export { Sidebar };
