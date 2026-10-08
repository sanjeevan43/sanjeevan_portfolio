import React, { useState } from "react";
import { marked } from "marked";
import { Copy, Check, Bot, User } from "lucide-react";
import { ChatMessage } from "../../ai/types";

interface AIMessageProps {
  message: ChatMessage;
}

export const AIMessage: React.FC<AIMessageProps> = ({ message }) => {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState<boolean>(false);

  const renderContent = () => {
    if (isUser) {
      return <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>;
    }

    if (!message.content && message.isStreaming) {
      return (
        <div className="flex items-center gap-1.5 py-1">
          <span className="w-2 h-2 rounded-full bg-[#efeee9]/70 animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 rounded-full bg-[#efeee9]/70 animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 rounded-full bg-[#efeee9]/70 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      );
    }

    try {
      const html = marked.parse(message.content, { async: false }) as string;
      return (
        <div
          className="prose prose-invert max-w-none text-xs sm:text-sm leading-relaxed text-[#efeee9]/90 [&_a]:text-[#efeee9] [&_a]:underline [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_code]:bg-black/40 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_pre]:bg-[#0d0d0d] [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:border [&_pre]:border-[#efeee9]/10"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    } catch (e) {
      return <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-3 text-left ${isUser ? "justify-end" : "justify-start"} my-2`}>
      {!isUser && (
        <div className="h-7 w-7 rounded-full bg-[#efeee9]/10 border border-[#efeee9]/20 flex items-center justify-center text-[#efeee9] flex-shrink-0 mt-0.5">
          <Bot className="w-3.5 h-3.5" />
        </div>
      )}

      <div
        className={`group relative max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-3 shadow-md ${
          isUser
            ? "bg-[#282828] text-[#efeee9] rounded-br-xs border border-[#efeee9]/10"
            : "bg-[#181818] text-[#efeee9]/90 rounded-bl-xs border border-[#efeee9]/10"
        }`}
      >
        {renderContent()}

        {!isUser && message.content && (
          <button
            onClick={copyToClipboard}
            aria-label="Copy message text"
            className="absolute -bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#222] border border-[#efeee9]/20 rounded p-1 text-[#efeee9]/60 hover:text-[#efeee9]"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          </button>
        )}
      </div>

      {isUser && (
        <div className="h-7 w-7 rounded-full bg-[#efeee9] text-black flex items-center justify-center flex-shrink-0 mt-0.5 font-semibold text-xs">
          <User className="w-3.5 h-3.5" />
        </div>
      )}
    </div>
  );
};
