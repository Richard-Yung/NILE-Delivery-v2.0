import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Support() {
  const nav = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: "m1", sender: "support", text: "Bonjour! Comment puis-je vous aider aujourd'hui?", time: "10:30" },
    { id: "m2", sender: "client", text: "Bonjour, j'ai une question sur les tarifs", time: "10:31" },
    { id: "m3", sender: "support", text: "Bien sûr! Les tarifs dépendent de la distance, du type de véhicule et de la taille du colis. Que souhaitez-vous savoir exactement?", time: "10:32" },
    { id: "m4", sender: "client", text: "Comment sont calculés les frais de livraison?", time: "10:33" },
    { id: "m5", sender: "support", text: "Les frais sont calculés selon: 500 XOF de base + 10 XOF/km + supplément selon le type de véhicule. Avez-vous d'autres questions?", time: "10:35" },
  ]);

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
    <div className="container py-6 md:py-10 h-[90vh] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="secondary" size="icon" onClick={() => nav(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-extrabold">Support Client</h1>
          <p className="text-sm text-muted-foreground">Assistance disponible 24/7</p>
        </div>
        <Button variant="outline" size="icon">
          <Phone className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages Container */}
      <Card className="flex-1 flex flex-col border overflow-hidden mb-4">
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "client" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === "client"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-muted text-foreground rounded-bl-none"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className="text-xs mt-1 opacity-70">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className="border-t p-4 flex gap-2 bg-card">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Écrivez votre message..."
            className="flex-1"
          />
          <Button onClick={sendMessage} className="gap-2">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* Info */}
      <p className="text-xs text-muted-foreground text-center">
        Les réponses du support peuvent prendre quelques minutes
      </p>
    </div>
  );
}
