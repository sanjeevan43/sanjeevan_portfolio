import React, { useRef, useEffect } from "react";
import { X, Trash2, Sparkles, RefreshCw } from "lucide-react";
import { ChatMessage, ModelProgress, AIState } from "../../ai/types";
import { AIMessage } from "./AIMessage";
import { AIWelcome } from "./AIWelcome";
import { AIModelLoader } from "./AIModelLoader";
import { AIError } from "./AIError";
import { AIInput } from "./AIInput";

interface AIChatWindowProps {
  state: AIState;
  isWebGPUSupported: boolean;
  modelProgress: ModelProgress;
  errorMessage: string | null;
  messages: ChatMessage[];
  isGenerating: boolean;
  onClose: () => void;
  onSendMessage: (text: string) => void;
  onClear: () => void;
  onRetry: () => void;
}

export const AIChatWindow: React.FC<AIChatWindowProps> = ({
  state,
  isWebGPUSupported,
  modelProgress,
  errorMessage,
  messages,
  isGenerating,
  onClose,
  onSendMessage,
  onClear,
  onRetry
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  return (
    <div className="fixed bottom-40 right-6 sm:bottom-48 sm:right-10 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[540px] max-h-[calc(100vh-12rem)] bg-[#141414] border border-[#efeee9]/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-[#efeee9] animate-in fade-in slide-in-from-bottom-5 duration-300 font-hn">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1c1c1c] border-b border-[#efeee9]/10 select-none">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-[#efeee9]/10 border border-[#efeee9]/20 flex items-center justify-center text-[#efeee9]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-[#efeee9] tracking-tight">
              Sanjeev AI
            </h3>
            <p className="text-[11px] text-[#efeee9]/50 flex items-center gap-1.5">
              <span
                className={`h-2 w-2 rounded-full ${
                  state === "ready"
                    ? "bg-emerald-500"
                    : state === "downloading" || state === "loading"
                    ? "bg-amber-400 animate-pulse"
                    : "bg-rose-500"
                }`}
              />
              {state === "ready"
                ? "Ready (Local Engine)"
                : state === "downloading"
                ? "Downloading Model..."
                : state === "loading"
                ? "Loading Model..."
                : state === "checking"
                ? "Checking WebGPU..."
                : "Unavailable"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button
              onClick={onClear}
              title="Clear Conversation"
              aria-label="Clear Conversation"
              className="p-1.5 rounded-lg text-[#efeee9]/50 hover:text-[#efeee9] hover:bg-[#282828] transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close Chat Window"
            className="p-1.5 rounded-lg text-[#efeee9]/50 hover:text-[#efeee9] hover:bg-[#282828] transition-colors"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col space-y-2">
        {state !== "ready" && state !== "error" ? (
          <AIModelLoader state={state} progress={modelProgress} />
        ) : state === "error" ? (
          <AIError
            isWebGPUSupported={isWebGPUSupported}
            errorMessage={errorMessage}
            onRetry={onRetry}
          />
        ) : messages.length === 0 ? (
          <AIWelcome onSelectSuggestion={onSendMessage} />
        ) : (
          messages.map((msg) => <AIMessage key={msg.id} message={msg} />)
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer Input */}
      <AIInput
        onSend={onSendMessage}
        disabled={state !== "ready"}
        isGenerating={isGenerating}
      />
    </div>
  );
};
