"use client";

import { useState } from "react";
import { Send, Sparkles, Bot, User, Check, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader } from "@/components/shared/page-header";
import { aiChatMessages, aiRecommendations } from "@/lib/mock-data";

const QUICK_PROMPTS = [
  "Check my readiness for APP-001",
  "What documents are missing?",
  "Explain ingredient requirements",
  "Help me draft a Cleaning SOP",
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState(aiChatMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = {
      id: `msg-${Date.now()}`,
      role: "user" as const,
      content: input,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          role: "assistant" as const,
          content: `Thank you for your question. Based on the current state of your workspace, I can see that your overall readiness for APP-2024-001 is 78%. To improve this, I recommend focusing on the 4 blocking issues first:\n\n1. Renew Global Food Ingredients halal certificate\n2. Upload Process Flowchart document\n3. Address Perisa Pandan expired cert\n4. Resolve cross-contamination risk flag\n\nWould you like me to create tasks for any of these?`,
          timestamp: new Date().toISOString(),
        },
      ]);
    }, 1500);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  function formatMessage(content: string) {
    const lines = content.split("\n");
    return lines.map((line, i) => {
      const boldLine = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      return (
        <span key={i}>
          <span dangerouslySetInnerHTML={{ __html: boldLine }} />
          {i < lines.length - 1 && <br />}
        </span>
      );
    });
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title="AI Assistant"
        description="Get intelligent guidance for your halal certification journey"
      />

      <div className="grid lg:grid-cols-5 gap-4" style={{ height: "calc(100vh - 200px)", minHeight: "600px" }}>
        {/* Chat panel */}
        <div className="lg:col-span-3 flex flex-col">
          <Card className="flex-1 flex flex-col overflow-hidden">
            <CardHeader className="border-b pb-3 pt-4 shrink-0">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-sm">HalalCert AI</CardTitle>
                  <CardDescription className="text-xs">Context-aware compliance assistant</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <Avatar className="h-7 w-7 shrink-0">
                    <AvatarFallback className={`text-xs ${msg.role === "assistant" ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>
                      {msg.role === "assistant" ? <Bot className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`rounded-xl p-3 max-w-[85%] text-sm leading-relaxed ${
                      msg.role === "assistant"
                        ? "bg-muted text-foreground rounded-tl-none"
                        : "bg-primary text-primary-foreground rounded-tr-none"
                    }`}
                  >
                    {formatMessage(msg.content)}
                    <p className={`text-[10px] mt-1.5 opacity-60`}>
                      {new Date(msg.timestamp).toLocaleTimeString("en-MY", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div className="flex gap-2.5">
                  <Avatar className="h-7 w-7 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      <Bot className="h-3.5 w-3.5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-xl rounded-tl-none p-3 flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 animate-bounce"
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick prompts */}
            <div className="px-4 pb-2 flex gap-2 flex-wrap shrink-0">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleQuickPrompt(prompt)}
                  className="text-xs bg-secondary hover:bg-secondary/80 text-secondary-foreground px-2.5 py-1 rounded-full transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t shrink-0">
              <div className="flex gap-2 items-end">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about your halal compliance..."
                  className="min-h-[60px] max-h-[120px] text-sm resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                />
                <Button onClick={handleSend} disabled={!input.trim() || typing} className="h-10 w-10 p-0 shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">AI assists with compliance guidance only. Not a halal authority.</p>
            </div>
          </Card>
        </div>

        {/* Right panel */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col overflow-hidden">
            <Tabs defaultValue="recommendations" className="flex flex-col h-full">
              <CardHeader className="border-b pb-0 pt-4 shrink-0">
                <TabsList className="w-full">
                  <TabsTrigger value="recommendations" className="flex-1 text-xs">Recommendations</TabsTrigger>
                  <TabsTrigger value="insights" className="flex-1 text-xs">Readiness Insights</TabsTrigger>
                </TabsList>
              </CardHeader>

              <TabsContent value="recommendations" className="flex-1 overflow-y-auto p-4 space-y-3 mt-0">
                {aiRecommendations.map((rec) => (
                  <div key={rec.id} className="rounded-lg border p-3 space-y-2">
                    <div className="flex items-start gap-2">
                      <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${rec.priority === "High" ? "bg-red-500" : "bg-amber-500"}`} />
                      <p className="text-sm font-medium leading-tight">{rec.title}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{rec.description}</p>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Badge variant="outline" className="text-xs">{rec.linkedModule}</Badge>
                      <Badge variant="outline" className={`text-xs ${rec.priority === "High" ? "border-red-200 text-red-700" : "border-amber-200 text-amber-700"}`}>
                        {rec.priority}
                      </Badge>
                    </div>
                    <div className="flex gap-1.5">
                      <Button size="sm" variant="outline" className="h-6 gap-1 text-xs flex-1">
                        <Check className="h-3 w-3" /> Accept
                      </Button>
                      <Button size="sm" variant="ghost" className="h-6 gap-1 text-xs text-muted-foreground">
                        <X className="h-3 w-3" /> Dismiss
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="insights" className="flex-1 overflow-y-auto p-4 mt-0 space-y-4">
                <div className="rounded-lg bg-muted/50 p-4 space-y-3">
                  <h3 className="text-sm font-semibold">APP-2024-001 Summary</h3>
                  {[
                    { label: "Overall Readiness", value: "78%", color: "text-amber-600" },
                    { label: "Blocking Issues", value: "4", color: "text-red-600" },
                    { label: "Warnings", value: "7", color: "text-amber-600" },
                    { label: "Open Tasks", value: "8", color: "text-blue-600" },
                    { label: "Expiring Certs", value: "3", color: "text-amber-600" },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{label}</span>
                      <span className={`font-semibold ${color}`}>{value}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase">Top Risks</h3>
                  {[
                    "Perisa Pandan — expired halal cert",
                    "E471 — animal-derived, expired cert",
                    "Global Food Ingredients — expired supplier cert",
                    "Nurul Hidayah — cert expiring in 23 days",
                  ].map((risk) => (
                    <div key={risk} className="flex items-start gap-2 text-xs">
                      <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1 shrink-0" />
                      <span className="text-muted-foreground">{risk}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
