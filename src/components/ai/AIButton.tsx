import React from "react";
import { Sparkles, X, Loader2 } from "lucide-react";
import { AIState } from "../../ai/types";

interface AIButtonProps {
  isOpen: boolean;
  onClick: () => void;
  state: AIState;
}

export const AIButton: React.FC<AIButtonProps> = ({ isOpen, onClick, state }) => {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Close AI Assistant" : "Open Sanjeev AI Assistant"}
      className={`fixed bottom-28 right-6 sm:bottom-36 sm:right-10 z-40 flex items-center justify-center gap-1.5 h-10 px-4 rounded-full shadow-2xl backdrop-blur-md transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none font-hn text-xs tracking-wide font-medium ${
        isOpen
          ? "bg-[#1c1c1c]/90 text-[#efeee9] border border-[#efeee9]/30"
          : "bg-[#efeee9] text-black border border-white/50 shadow-[0_4px_25px_rgba(239,238,233,0.4)]"
      }`}
    >
      {isOpen ? (
        <>
          <X className="w-3.5 h-3.5 text-[#efeee9]" />
          <span>Close</span>
        </>
      ) : (
        <>
          {state === "downloading" || state === "loading" ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-black" />
          ) : (
            <Sparkles className="w-3.5 h-3.5 text-black" />
          )}
          <span>AI ✦</span>
          <span
            className={`h-2 w-2 rounded-full ${
              state === "ready"
                ? "bg-emerald-500 animate-pulse"
                : state === "downloading" || state === "loading"
                ? "bg-amber-500"
                : state === "error"
                ? "bg-rose-500"
                : "bg-neutral-400"
            }`}
          />
        </>
      )}
    </button>
  );
};
