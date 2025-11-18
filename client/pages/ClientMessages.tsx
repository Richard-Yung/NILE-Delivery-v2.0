import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send, Phone, Settings, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  status: string;
}

const CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    name: "Awa K.",
    avatar: "AK",
    lastMessage: "Je suis à 5 minutes",
    time: "à l'instant",
    unread: true,
    status: "Conversation active",
  },
  {
    id: "2",
    name: "Koffi Y.",
    avatar: "KY",
    lastMessage: "Merci pour la livraison rapide!",
    time: "hier",
    unread: false,
    status: "Hors ligne",
  },
];

interface Message {
  id: string;
  sender: "client" | "other";
  text: string;
  time: string;
}

export default function ClientMessages() {
  const nav = useNavigate();
  const [activeConversation, setActiveConversation] = useState<Conversation>(CONVERSATIONS[0]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: "m1", sender: "other", text: "Bonjour je viens de recevoir votre demande", time: "10 h 24" },
    { id: "m2", sender: "client", text: "Oui, c'est pour une livraison à Plateau", time: "10 h 25" },
    { id: "m3", sender: "other", text: "D'accord, je viens de partir", time: "10 h 26" },
    { id: "m4", sender: "client", text: "Oui, c'est pour une livraison à Plateau", time: "10 h 47" },
    { id: "m5", sender: "other", text: "J'accord, je par maintenant", time: "11 h 48" },
    { id: "m6", sender: "client", text: "Je suis à 5 minutes", time: "13 h 49" },
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages([
      ...messages,
      {
        id: `m${messages.length + 1}`,
        sender: "client",
        text: message,
        time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setMessage("");
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-card p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => nav(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Messages</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Conversations sidebar */}
        <div
          className={cn(
            "border-r bg-card transition-all overflow-hidden flex flex-col",
            isSidebarOpen ? "w-64" : "w-0"
          )}
        >
          {/* Search */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher..." className="pl-10" />
            </div>
          </div>

          {/* Conversations list */}
          <div className="flex-1 overflow-y-auto">
            {CONVERSATIONS.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveConversation(conv)}
                className={cn(
                  "w-full p-4 border-b text-left transition hover:bg-muted",
                  activeConversation.id === conv.id && "bg-primary/10 border-l-2 border-l-primary"
                )}
              >
                {/* Avatar + Info */}
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold text-sm flex-shrink-0">
                    {conv.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-sm truncate">{conv.name}</h3>
                      <span className="text-xs text-muted-foreground flex-shrink-0">{conv.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread && <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="border-b bg-card p-4 flex items-center justify-between">
            <div>
              <h2 className="font-semibold">{activeConversation.name}</h2>
              <p className="text-xs text-muted-foreground">{activeConversation.status}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn("flex", msg.sender === "client" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-xs px-4 py-2 rounded-lg text-sm",
                    msg.sender === "client"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted text-foreground rounded-bl-none"
                  )}
                >
                  <p>{msg.text}</p>
                  <p className="text-xs mt-1 opacity-70">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input area */}
          <div className="border-t bg-card p-4 flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Votre message..."
              className="flex-1"
            />
            <Button onClick={sendMessage} className="gap-2" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
