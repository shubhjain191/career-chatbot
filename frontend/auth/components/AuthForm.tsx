"use client"

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { trpc } from "@/frontend/utils/trpc";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export function AuthForm() {
    const [mode, setMode] = useState<"signin" | "signup">("signin");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const signup = trpc.auth.signup.useMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        if (mode === "signup") {
            if (!name || !email || !password || !confirmPassword) {
                setError("All fields are required.");
                setLoading(false);
                return;
            }
            if (password !== confirmPassword) {
                setError("Passwords do not match.");
                setLoading(false);
                return;
            }
            try {
                await signup.mutateAsync({ name, email, password });
                await signIn("credentials", {
                    email,
                    password,
                    redirect: true,
                    callbackUrl: "/chat",
                });
            } catch (err: any) {
                setError(err?.message || "Signup failed");
            } finally {
                setLoading(false);
            }
        } else {
            if (!email || !password) {
                setError("Email and password required.");
                setLoading(false);
                return;
            }
            try {
                const res = await signIn("credentials", {
                    email,
                    password,
                    redirect: true,
                    callbackUrl: "/chat",
                });
                if ((res as any)?.error) setError("Invalid credentials");
            } catch {
                setError("Sign in failed");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="flex min-h-[500px] rounded-2xl shadow-2xl bg-white overflow-hidden border border-gray-200 max-w-3xl mx-auto">
            <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white w-1/2 p-10">
                <div className="text-4xl font-bold mb-4">Career Chatbot</div>
                <div className="text-lg opacity-80 mb-8">Your AI Career Assistant</div>
                <FaUser className="text-6xl opacity-60" />
            </div>
            <div className="flex-1 flex flex-col justify-center p-8">
                <div className="flex gap-4 mb-8">
                    <button
                        className={`flex-1 py-2 rounded-lg font-semibold transition-all ${mode === "signin" ? "bg-blue-600 text-white shadow" : "bg-gray-100 text-gray-700"}`}
                        onClick={() => setMode("signin")}
                        disabled={loading}
                    >
                        Sign In
                    </button>
                    <button
                        className={`flex-1 py-2 rounded-lg font-semibold transition-all ${mode === "signup" ? "bg-blue-600 text-white shadow" : "bg-gray-100 text-gray-700"}`}
                        onClick={() => setMode("signup")}
                        disabled={loading}
                    >
                        Sign Up
                    </button>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {mode === "signup" && (
                        <div className="relative">
                            <FaUser className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Full Name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                disabled={loading}
                                autoComplete="name"
                            />
                        </div>
                    )}
                    <div className="relative">
                        <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="email"
                            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            disabled={loading}
                            autoComplete="email"
                        />
                    </div>
                    <div className="relative">
                        <FaLock className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="password"
                            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            disabled={loading}
                            autoComplete={mode === "signup" ? "new-password" : "current-password"}
                        />
                    </div>
                    {mode === "signup" && (
                        <div className="relative">
                            <FaLock className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="password"
                                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                disabled={loading}
                                autoComplete="new-password"
                            />
                        </div>
                    )}
                    {error && <div className="text-red-600 text-sm font-medium text-center">{error}</div>}
                    <button
                        type="submit"
                        className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-all disabled:opacity-60"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : mode === "signup" ? "Create Account" : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}