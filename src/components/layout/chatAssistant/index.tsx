"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Field, FieldContent } from "@/components/ui/field";
import { useChat } from "@ai-sdk/react";
import { Bot, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

export default function ChatAssistant() {
    const { messages, sendMessage } = useChat();
    const [input, setInput] = useState("");
    const [open, setOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const t = useTranslations("chatAssistant");

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const initialMessage = {
        id: "welcome",
        role: "assistant",
        parts: [{ type: "text", text: t("initialMessage") }],
    };

    const allMessages = open ? [initialMessage, ...messages] : [];

    return (
        <>
            <Button
                onClick={() => setOpen((prev) => !prev)}
                className="
                    fixed bottom-6 right-6 z-50
                    rounded-full px-2 py-6
                    bg-light-cream
                    border-6 border-salmon
                    shadow-[0_0_0_0_rgba(255,126,106,0.6)]
                    transition-all duration-300 ease-out
                    cursor-pointer
                    hover:scale-105
                    active:scale-95
                    "
            >
                <Bot className="w-8 h-8 text-brown" />
            </Button>

            {open && (
                <Card
                    ref={containerRef}
                    className="fixed bottom-22 right-6 z-50 w-80 h-105 flex flex-col border-6 border-salmon shadow-xl overflow-hidden pt-0"
                >
                    <CardHeader className="flex justify-between items-center text-brown bg-salmon border-b border-light-gray py-2! px-3">
                        <CardTitle className="text-body-bolder">
                            Wise Paws · {t("header")}
                        </CardTitle>
                        <Button
                            onClick={() => setOpen(false)}
                            variant="ghost"
                            className="px-4"
                        >
                            <X className="w-4 h-4 text-brown" />
                        </Button>
                    </CardHeader>

                    <CardContent className="flex-1 p-3 space-y-2 overflow-y-auto text-body text-dark-gray">
                        {allMessages.map((message) => (
                            <div key={message.id}>
                                {message.parts.map((part, i) => {
                                    if (part.type !== "text") return null;

                                    const isUser = message.role === "user";

                                    return (
                                        <div
                                            key={`${message.id}-${i}`}
                                            className={`max-w-[85%] rounded-lg px-3 py-2 ${
                                                isUser
                                                    ? "ml-auto bg-salmon text-white"
                                                    : "mr-auto bg-white border border-light-gray"
                                            }`}
                                        >
                                            {part.text}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </CardContent>

                    <CardFooter className="p-2 pb-0 flex gap-2">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (!input.trim()) return;
                                sendMessage({ text: input });
                                setInput("");
                            }}
                            className="flex flex-1 gap-2"
                        >
                            <Field className="flex-1">
                                <FieldContent>
                                    <input
                                        value={input}
                                        onChange={(e) =>
                                            setInput(e.target.value)
                                        }
                                        placeholder={t("inputPlaceholder")}
                                        className="w-full rounded-md border border-light-gray px-3 py-2 text-body focus:outline-none"
                                    />
                                </FieldContent>
                            </Field>

                            <Button
                                type="submit"
                                className="rounded-md bg-salmon px-3 py-2 text-white text-body-bolder"
                            >
                                {t("sendButton")}
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            )}
        </>
    );
}
