import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function ChatPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        redirect("/auth/signin");
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
            <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-10 border border-gray-100 flex flex-col items-center gap-6">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Career Chatbot</h1>
                <p className="text-gray-600 text-center text-lg mb-4">
                    You're signed in as <span className="font-semibold text-black">{session.user?.email ?? "your Account"}</span>.
                </p>
                <div className="w-full h-64 flex items-center justify-center bg-gray-50 rounded-xl border border-gray-200 text-gray-400">
                    {/* Chat UI goes here */}
                    Start chatting with your AI career assistant!
                </div>
            </div>
        </main>
    );
}