"use client";

import { trpc } from "@/frontend/utils/trpc";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, MessageSquare } from "lucide-react";

interface SessionListProps {
    currentSessionId: string;
    onSessionSelect: (sessionId: string) => void;
    onNewSession: () => void;
}

export function SessionList({ currentSessionId, onSessionSelect, onNewSession }: SessionListProps) {
    const { data, isLoading } = trpc.session.list.useQuery({limit: 20});

    return (
        <div className="flex flex-col h-full space-y-4 p-4">
            <Button 
                onClick={onNewSession}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
                <Plus className="w-5 h-5" />
                New Chat
            </Button>

            <div className="flex-1 space-y-2 overflow-y-auto">
                {isLoading ? (
                    <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="h-20 bg-gray-100 rounded-lg"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {data?.items.map((session) => (
                            <Card 
                                key={session.id} 
                                onClick={() => onSessionSelect(session.id)}
                                className={`
                                    cursor-pointer transition-all duration-200 hover:shadow-md
                                    ${currentSessionId === session.id 
                                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-md' 
                                        : 'hover:bg-gray-50'
                                    }
                                `}
                            >
                                <CardHeader className="py-4">
                                    <CardTitle className="flex items-center gap-3 text-lg">
                                        <MessageSquare className="w-5 h-5 text-blue-600" />
                                        <span className="truncate">{session.title}</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pb-4 pt-0">
                                    <div className="text-sm text-gray-500 flex items-center gap-2">
                                        <span>{session._count.messages} messages</span>
                                        <span>•</span>
                                        <span>{new Date(session.updatedAt).toLocaleDateString()}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}