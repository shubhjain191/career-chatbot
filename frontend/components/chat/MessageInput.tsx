"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function MessageInput({ onSend, disabled }: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t bg-gradient-to-br from-white to-gray-50 rounded-b-2xl shadow-lg">
      <div className="flex gap-3 items-end">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about your career..."
          className="flex-1 min-h-[60px] max-h-[120px] resize-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-base shadow focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-150"
          disabled={disabled}
        />
        <Button
          type="submit"
          disabled={disabled || !message.trim()}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 transition-all duration-150 disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
          <span className="hidden sm:inline">Send</span>
        </Button>
      </div>
    </form>
  );
}