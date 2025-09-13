"use client";

import { trpc } from "../../utils/trpc";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Bot, User } from "lucide-react";

interface MessageListProps {
  sessionId: string;
}

export function MessageList({ sessionId }: MessageListProps) {
  const { data, isLoading } = trpc.message.listBySession.useQuery({
    sessionId,
    limit: 50,
  });

  if (isLoading) {
    return (
      <div className="flex-1 p-6 space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-4 items-start">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
            <div className="flex-1 space-y-3">
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
      <div className="flex-1 flex items-center justify-center text-gray-400 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
        <div className="text-center">
          <Bot className="w-14 h-14 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">Start a conversation with your <span className="text-blue-600">AI career counselor</span></p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-gradient-to-br from-white to-gray-50 rounded-xl">
      {data.items.map((message) => (
        <div key={message.id} className={`flex gap-4 items-start ${message.role === "user" ? "flex-row-reverse" : ""}`}>
          <Avatar className="w-10 h-10 shadow-md">
            <AvatarFallback className={message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}>
              {message.role === "user" ? (
                <User className="w-5 h-5" />
              ) : (
                <Bot className="w-5 h-5" />
              )}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-sm font-semibold ${message.role === "user" ? "text-blue-700" : "text-gray-700"}`}>
                {message.role === "user" ? "You" : "Career Counselor"}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(message.createdAt).toLocaleTimeString()}
              </span>
            </div>
            <Card className={`p-4 rounded-xl shadow ${message.role === "user" ? "bg-blue-50 border border-blue-200" : "bg-white border border-gray-200"}`}>
              <p className="whitespace-pre-wrap text-base leading-relaxed">{message.content}</p>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
}
