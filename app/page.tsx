"use client";

import { useState } from "react";
import { trpc } from "@/frontend/utils/trpc";

export default function Home() {
  const { data: health } = trpc.health.useQuery();
  const counsel = trpc.ai.counsel.useMutation();
  const [input, setInput] = useState("");

  async function onAsk(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    await counsel.mutateAsync({ userInput: input });
  }

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Career Chatbot</h1>
      <div className="text-sm text-muted-foreground">
        trpc ok: {String(health?.ok)} at {health?.time}
      </div>

      <form onSubmit={onAsk} className="flex gap-2 items-center">
        <input
        className="border rounded px-3 py-2 flex-1"
        placeholder="Ask a career-related question..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
          disabled={counsel.isPending}
        >
          {counsel.isPending ? "Thinking..." : "Ask"}
        </button>
      </form>

      {counsel.data && (
        <div className="mt-2 text-green-700 text-sm">
          <strong>AI Reply:</strong> {counsel.data.reply}
        </div>
      )}
      {counsel.error ? (
        <div className="mt-2 text-red-600 text-sm">
          {counsel.error.message}
        </div>
      ) : null}
    </main>
  );
}