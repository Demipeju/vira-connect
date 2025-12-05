import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip, Smile, MoreVertical, Search, Phone, Video, MessageSquare } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { storesData } from "@/data/stores";

interface Conversation {
  id: number;
  storeId: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: number;
  sender: "me" | "other";
  text: string;
  time: string;
}

const Chat = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem("viraConversations");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
  const [chatMessages, setChatMessages] = useState<Record<number, Message[]>>(() => {
    const saved = localStorage.getItem("viraChatMessages");
    return saved ? JSON.parse(saved) : {};
  });

  // Handle opening chat from storefront
  useEffect(() => {
    const storeId = searchParams.get("store");
    if (storeId) {
      const store = storesData.find(s => s.id === parseInt(storeId));
      if (store) {
        const existingConv = conversations.find(c => c.storeId === store.id);
        if (existingConv) {
          setSelectedChat(existingConv);
        } else {
          const newConv: Conversation = {
            id: Date.now(),
            storeId: store.id,
            name: store.name,
            avatar: store.image,
            lastMessage: "",
            time: "Just now",
            unread: 0,
            online: true,
          };
          const updatedConvs = [newConv, ...conversations];
          setConversations(updatedConvs);
          localStorage.setItem("viraConversations", JSON.stringify(updatedConvs));
          setSelectedChat(newConv);
        }
      }
    }
  }, [searchParams]);

  const sendMessage = () => {
    if (!message.trim() || !selectedChat) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: "me",
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = {
      ...chatMessages,
      [selectedChat.id]: [...(chatMessages[selectedChat.id] || []), newMessage],
    };
    setChatMessages(updatedMessages);
    localStorage.setItem("viraChatMessages", JSON.stringify(updatedMessages));

    // Update conversation
    const updatedConvs = conversations.map(c =>
      c.id === selectedChat.id
        ? { ...c, lastMessage: message, time: "Just now" }
        : c
    );
    setConversations(updatedConvs);
    localStorage.setItem("viraConversations", JSON.stringify(updatedConvs));

    setMessage("");
  };

  const currentMessages = selectedChat ? (chatMessages[selectedChat.id] || []) : [];

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
              {conversations.length === 0 ? (
                <div className="p-6 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <MessageSquare className="w-12 h-12 text-primary/60" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">No messages yet</h3>
                  <p className="text-sm text-muted-foreground">
                    Visit a store and click "Message Seller" to start a conversation
                  </p>
                </div>
              ) : (
                <div className="p-2">
                  {conversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedChat(conv)}
                      className={`w-full p-3 rounded-xl hover:bg-accent/10 transition-colors mb-1 ${
                        selectedChat?.id === conv.id ? "bg-accent/10" : ""
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
                              {conv.lastMessage || "Start a conversation..."}
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
              )}
            </ScrollArea>
          </div>

          {/* Chat Window */}
          <div className="flex-1 glass rounded-2xl flex flex-col">
            {selectedChat ? (
              <>
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
                  {currentMessages.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                          <Send className="w-8 h-8 text-primary/60" />
                        </div>
                        <p className="text-muted-foreground">Send a message to start the conversation</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {currentMessages.map((msg) => (
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
                  )}
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
                          sendMessage();
                        }
                      }}
                    />
                    <Button
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      disabled={!message.trim()}
                      onClick={sendMessage}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center max-w-sm">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 flex items-center justify-center">
                    <MessageSquare className="w-16 h-16 text-primary/50" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Your Messages</h3>
                  <p className="text-muted-foreground">
                    Select a conversation from the list or visit a store to message a seller
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
