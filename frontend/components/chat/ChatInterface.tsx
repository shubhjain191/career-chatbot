"use client";

import { useState, useEffect } from "react";
import { trpc } from "../../utils/trpc";
import { SessionList } from "./SessionList";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "../../hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function ChatInterface() {
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isNewSessionOpen, setIsNewSessionOpen] = useState(false);
  const [newSessionTitle, setNewSessionTitle] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [optimisticMessages, setOptimisticMessages] = useState<any[]>([]);

  const utils = trpc.useUtils();
  const { toast } = useToast()

  const createSession = trpc.session.create.useMutation({
    onSuccess: (session) => {
      setCurrentSessionId(session.id);
      setIsNewSessionOpen(false);
      setNewSessionTitle("");
      utils.session.list.invalidate();
    },
  });

  const addUserMessage = trpc.message.addUserMessage.useMutation();
  const addAssistantMessage = trpc.message.addAssistantMessage.useMutation();
  const counsel = trpc.ai.counsel.useMutation();

  const handleNewSession = () => {
    if (newSessionTitle.trim()) {
      createSession.mutate({ title: newSessionTitle.trim() });
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!currentSessionId) return;

    // Optimistic UI: show user message immediately
    const optimisticId = `optimistic-${Date.now()}`;
    setOptimisticMessages((prev) => [
      ...prev,
      {
        id: optimisticId,
        role: "user",
        content,
        createdAt: new Date().toISOString(),
        status: "sending",
      },
    ]);
    setIsTyping(true);

    try {
      await addUserMessage.mutateAsync({
        sessionId: currentSessionId,
        content,
      });

      const sessionData = await utils.session.getById.fetch({ id: currentSessionId });
      const context = sessionData?.messages?.map((msg) => ({
        role: msg.role as "user" | "assistant" | "system",
        content: msg.content,
      })) || [];

      const aiResponse = await counsel.mutateAsync({
        userInput: content,
        context,
      });

      await addAssistantMessage.mutateAsync({
        sessionId: currentSessionId,
        content: aiResponse.reply,
      });

      setOptimisticMessages([]);
      setIsTyping(false);
      utils.message.listBySession.invalidate({ sessionId: currentSessionId });
      utils.session.list.invalidate();
    } catch (error) {
      setIsTyping(false);
      setOptimisticMessages([]);
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="w-80 min-w-[18rem] border-r bg-white shadow-xl flex flex-col">
        <SessionList
          currentSessionId={currentSessionId ?? ""}
          onSessionSelect={setCurrentSessionId}
          onNewSession={() => setIsNewSessionOpen(true)}
        />
      </div>

      <div className="flex-1 flex flex-col bg-gradient-to-br from-white to-gray-50">
        {currentSessionId ? (
          <>
            <div className="flex-1 flex flex-col justify-end">
              <MessageList sessionId={currentSessionId} isTyping={isTyping} pendingMessages={optimisticMessages} />
              <MessageInput
                onSend={handleSendMessage}
                disabled={addUserMessage.isPending || counsel.isPending}
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold mb-2 text-gray-900">Welcome to Career Chatbot</h2>
              <p className="text-gray-600 mb-6 text-lg">Start a new conversation to get career advice</p>
              <Button onClick={() => setIsNewSessionOpen(true)} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-150">
                Start New Chat
              </Button>
            </div>
          </div>
        )}
      </div>

      <Dialog open={isNewSessionOpen} onOpenChange={setIsNewSessionOpen}>
        <DialogContent className="max-w-md mx-auto rounded-2xl shadow-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Start New Chat</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Enter chat title..."
              value={newSessionTitle}
              onChange={(e) => setNewSessionTitle(e.target.value)}
              className="rounded-lg border-gray-300 px-4 py-3 text-base shadow focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-150"
            />
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsNewSessionOpen(false)} className="rounded-lg">
                Cancel
              </Button>
              <Button
                onClick={handleNewSession}
                disabled={!newSessionTitle.trim() || createSession.isPending}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-150"
              >
                {createSession.isPending ? "Creating..." : "Create"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}