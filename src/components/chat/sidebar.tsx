import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useChat, User } from "@/contexts/chatContext";
import { Spinner } from "../spinner";
import { cn } from "@/lib/utils";
import { CHAT_CATEGORIES } from "@/constants/chat-categories";
import { SearchIcon } from "../icons";

const Sidebar = () => {
  const {
    conversations,
    allUsers,
    setActiveConversation,
    startConversation,
    setCurrentReceipient,
    getConversation,
    currentReceipient,
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
          <div className="p-4 flex items-center">
            <SearchIcon className="absolute left-5" />
            <Input
              type="search"
              placeholder="Search"
              className="w-full pl-8 bg-[#F6F6F6] text-[#6E6D6D] border-[#D1D1D1] border-[1px]"
            />
          </div>
          <div className="flex gap-3 p-2 mb-2">
            {CHAT_CATEGORIES.map((category) => {
              return (
                <button
                  key={category}
                  className="text-xs text-[#DC4A2D] bg-[#FEF4F2] border-[#FCB4A5] border-[1px] rounded-full px-2"
                >
                  {category}
                </button>
              );
            })}
          </div>
          <div className="overflow-y-auto h-[calc(100vh-8rem)]">
            {allUsers.map((user) => (
              <div
                key={user.id}
                className={cn(
                  "flex items-start p-4 border-b cursor-pointer",
                  currentReceipient?.id === user.id &&
                    "bg-[#F6F6F6] border-l-2 border-l-[#DC4A2D]"
                )}
                onClick={() => handleUserClick(user)}
              >
                <Avatar className="mr-4">
                  <AvatarImage src="/placeholder-user.jpg" alt={user.email} />
                  <AvatarFallback>{user.email[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{`${user.firstName} ${user.lastName}`}</div>
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
