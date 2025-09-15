import { Card } from "@/components/ui/card";
import { Bot } from "lucide-react";

export function TypingIndicator() {
	return (
		<Card className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow rounded-xl animate-pulse">
			<span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
				<Bot className="w-5 h-5 text-blue-600 animate-bounce" />
			</span>
			<span className="font-medium text-blue-700">Career Counselor is typing</span>
			<span className="flex gap-1 ml-2">
				<span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
				<span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
				<span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
			</span>
		</Card>
	);
}