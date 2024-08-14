import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const Sidebar = () => {
  return (
    <>
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
          {[
            {
              name: "Parik",
              days: "11 days",
              message:
                "Parik: 3rd Hello, I wanted to know more about the product design position opened at Atlassian.",
            },
            {
              name: "Naina",
              days: "11 days",
              message:
                "Naina: 4th Hello, I wanted to know more about the product design position opened at Atlassian.",
            },
            {
              name: "John",
              days: "11 days",
              message:
                "John: 5th Hello, I wanted to know more about the product design position opened at Atlassian.",
            },
            {
              name: "Kristine",
              days: "11 days",
              message:
                "Kristine: 4th Hello, I wanted to know more about the product design position opened at Atlassian.",
            },
            {
              name: "John",
              days: "11 days",
              message:
                "John: 5th Hello, I wanted to know more about the product design position opened at Atlassian.",
            },
          ].map((item, index) => (
            <div key={index} className="flex items-start p-4 border-b">
              <Avatar className="mr-4">
                <AvatarImage src="/placeholder-user.jpg" alt={item.name} />
                <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{item.name}</div>
                <div className="text-xs text-muted-foreground">{item.days}</div>
                <div className="mt-1">{item.message}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export { Sidebar };
