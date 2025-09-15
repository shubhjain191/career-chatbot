"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot, User, Check, CheckCheck, Clock } from "lucide-react";

interface MessageItemProps {
  id: string;  
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  status?: "sending" | "sent" | "delivered" | "read" | "failed";
}

export function MessageItem({ id, role, content, createdAt, status }: MessageItemProps) {
  return (
    <div className={`flex gap-4 items-start ${role === "user" ? "flex-row-reverse" : ""}`}>
      <Avatar className="w-10 h-10 shadow-md">
        <AvatarFallback className={role === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}>
          {role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-sm font-semibold ${role === "user" ? "text-blue-700" : "text-indigo-700"}`}>
            {role === "user" ? "You" : "Career Counselor"}
          </span>
          <span className="text-xs text-gray-400">
            {new Date(createdAt).toLocaleTimeString()}
          </span>
          {status && (
            <span className="ml-2 flex items-center gap-1 text-xs">
              {status === "sending" && <Clock className="w-4 h-4 text-gray-400 animate-pulse" />}
              {status === "sent" && <Check className="w-4 h-4 text-gray-400" />}
              {status === "delivered" && <CheckCheck className="w-4 h-4 text-blue-400" />}
              {status === "read" && <CheckCheck className="w-4 h-4 text-green-500" />}
              {status === "failed" && <span className="text-red-500">Failed</span>}
            </span>
          )}
        </div>
        <Card className={`p-4 rounded-xl shadow transition-all duration-200 ${role === "user" ? "bg-blue-50 border border-blue-200" : "bg-gradient-to-br from-indigo-50 to-white border border-indigo-100"}`}>
          {role === "assistant" ? (
            <div className="prose prose-indigo max-w-none text-base leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-2 text-indigo-700" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-2 text-indigo-700" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-bold text-indigo-900" {...props} />,
                  p: ({node, ...props}) => <p className="mb-2" {...props} />,
                  li: ({node, ...props}) => <li className="mb-1" {...props} />,
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="whitespace-pre-wrap text-base leading-relaxed">{content}</p>
          )}
        </Card>
      </div>
    </div>
  );
}

