import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip, Smile, MoreVertical, Search, Phone, Video } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const conversations = [
  {
    id: 1,
    name: "Artisan Pottery Studio",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop",
    lastMessage: "Absolutely! We offer custom orders.!",
    time: "20m ago",
    unread: 0,
    online: true,
  },
  {
    id: 2,
    name: "Tech Gadgets Hub",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop",
    lastMessage: "The item ships tomorrow",
    time: "1h ago",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "Vintage Fashion Co",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop",
    lastMessage: "Let me check the size",
    time: "3h ago",
    unread: 1,
    online: true,
  },
];

const messages = [
  {
    id: 1,
    sender: "other",
    text: "Hi! Thanks for your interest in our handmade ceramic vase!",
    time: "10:30 AM",
  },
  {
    id: 2,
    sender: "me",
    text: "Hello! I love the design. Is it dishwasher safe?",
    time: "10:32 AM",
  },
  {
    id: 3,
    sender: "other",
    text: "Yes, it is! All our pieces are made with food-safe, dishwasher-safe glaze.",
    time: "10:33 AM",
  },
  {
    id: 4,
    sender: "me",
    text: "Perfect! What about custom colors? Can I request a specific shade?",
    time: "10:35 AM",
  },
  {
    id: 5,
    sender: "other",
    text: "Absolutely! We offer custom orders. What color did you have in mind?",
    time: "10:36 AM",
  },
];

const Chat = () => {
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(conversations[0]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16 h-screen flex">
        <div className="container mx-auto px-6 py-6 flex gap-6 h-[calc(100vh-4rem)]">
          {/* Conversations List */}
          <div className="w-80 glass rounded-2xl flex flex-col">
            <div className="p-4 border-b border-border/40">
              <h2 className="text-xl font-bold mb-3">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10 bg-background/50"
                />
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-2">
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedChat(conv)}
                    className={`w-full p-3 rounded-xl hover:bg-accent/10 transition-colors mb-1 ${
                      selectedChat.id === conv.id ? "bg-accent/10" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={conv.avatar}
                          alt={conv.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {conv.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-accent rounded-full border-2 border-background" />
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-sm">{conv.name}</h3>
                          <span className="text-xs text-muted-foreground">{conv.time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground truncate">
                            {conv.lastMessage}
                          </p>
                          {conv.unread > 0 && (
                            <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Window */}
          <div className="flex-1 glass rounded-2xl flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={selectedChat.avatar}
                    alt={selectedChat.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {selectedChat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-accent rounded-full border-2 border-background" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{selectedChat.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {selectedChat.online ? "Active now" : "Offline"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] ${
                        msg.sender === "me"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted/50"
                      } rounded-2xl px-4 py-2`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <span
                        className={`text-xs mt-1 block ${
                          msg.sender === "me"
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-border/40">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Smile className="w-4 h-4" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 bg-background/50"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && message.trim()) {
                      setMessage("");
                    }
                  }}
                />
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={!message.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
