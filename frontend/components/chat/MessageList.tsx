
import React from "react";

import { trpc } from "../../utils/trpc";
import { MessageItem } from "./MessageItem";
import { TypingIndicator } from "./TypingIndicator";
import { Bot } from "lucide-react";

interface MessageListProps {
  sessionId: string;
  isTyping?: boolean;
  pendingMessages?: Array<{
    id: string;
    role: "user" | "assistant";
    content: string;
    createdAt: string;
    status?: string;
  }>;
}

export function MessageList({ sessionId, isTyping = false, pendingMessages = [] }: MessageListProps) {

  const { data, isLoading } = trpc.message.listBySession.useQuery({
    sessionId,
    limit: 50,
  });

  // Auto-scroll to bottom when messages change
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data?.items?.length, pendingMessages?.length, isTyping]);

  if (isLoading) {
    return (
      <div className="flex-1 p-4 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
              <div className="h-16 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!data?.items?.length) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <Bot className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>Start a conversation with your AI career counselor</p>
        </div>
      </div>
    );
  }

  return (
  <div className="flex-1 p-4 space-y-4 overflow-y-auto">
      {/* Render confirmed messages */}
      {data.items
        .filter((message) => message.role === "user" || message.role === "assistant")
        .map((message) => (
          <MessageItem
            key={message.id}
            id={message.id}
            role={message.role as "user" | "assistant"}
            content={message.content}
            createdAt={typeof message.createdAt === "string" ? message.createdAt : message.createdAt.toISOString()}
          />
        ))}
      {/* Render optimistic/pending messages */}
      {pendingMessages?.map((msg) => (
        <MessageItem
          key={msg.id}
          id={msg.id}
          role={msg.role}
          content={msg.content}
          createdAt={msg.createdAt}
          status={msg.status as "sending" | "sent" | "delivered" | "read" | "failed" | undefined}
        />
      ))}
      {isTyping && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
}
