import React, { useState, useRef, KeyboardEvent } from "react";
import { Send, Loader2 } from "lucide-react";

interface AIInputProps {
  onSend: (text: string) => void;
  disabled: boolean;
  isGenerating: boolean;
}

export const AIInput: React.FC<AIInputProps> = ({ onSend, disabled, isGenerating }) => {
  const [text, setText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (text.trim() && !disabled && !isGenerating) {
      onSend(text);
      setText("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-3 bg-[#141414] border-t border-[#efeee9]/10">
      <div className="relative flex items-center bg-[#1c1c1c] rounded-xl border border-[#efeee9]/15 focus-within:border-[#efeee9]/40 transition-colors">
        <textarea
          ref={textareaRef}
          value={text}
          disabled={disabled || isGenerating}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={disabled ? "AI Assistant initializing..." : "Ask something about Sanjeev... (Shift + Enter for new line)"}
          rows={1}
          className="w-full resize-none bg-transparent px-4 py-3 text-xs sm:text-sm text-[#efeee9] placeholder-[#efeee9]/40 focus:outline-none max-h-24 overflow-y-auto"
        />

        <button
          onClick={handleSend}
          disabled={!text.trim() || disabled || isGenerating}
          aria-label="Send Message"
          className="mr-2 p-2 rounded-lg bg-[#efeee9] text-black hover:bg-white disabled:opacity-30 disabled:hover:bg-[#efeee9] transition-opacity flex-shrink-0"
        >
          {isGenerating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </div>
      <p className="text-[10px] text-[#efeee9]/40 text-center mt-2">
        AI runs locally in your browser. Messages are not sent to external APIs.
      </p>
    </div>
  );
};
