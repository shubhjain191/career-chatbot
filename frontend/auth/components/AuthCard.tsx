"use client";

import { signIn } from "next-auth/react";
import { GithubIcon } from "lucide-react";

export function AuthCard() {
    return (
        <div className="max-w-sm mx-auto mt-16 p-8 bg-white rounded-2xl shadow-xl flex flex-col items-center gap-6 border border-gray-100">
            <h1 className="text-3xl font-bold text-gray-900">Welcome</h1>
            <p className="text-gray-500 text-center">Sign in to continue to <span className="font-semibold text-black">Career Chatbot</span></p>
            <button
                onClick={() => signIn("github")}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-black text-white rounded-lg font-medium shadow hover:bg-gray-900 transition-all duration-150"
            >
                <GithubIcon className="w-5 h-5" />
                Sign in with Github
            </button>
        </div>
    );
}