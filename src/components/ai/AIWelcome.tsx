import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";

interface AIWelcomeProps {
  onSelectSuggestion: (suggestion: string) => void;
}

const SUGGESTIONS = [
  "What projects has he built?",
  "What technologies does he know?",
  "Tell me about Selvagam.",
  "What services does he offer?",
  "How can I contact him?"
];

export const AIWelcome: React.FC<AIWelcomeProps> = ({ onSelectSuggestion }) => {
  return (
    <div className="flex flex-col items-center justify-center p-5 text-center space-y-5 my-auto">
      <div className="h-10 w-10 rounded-full bg-[#efeee9]/10 flex items-center justify-center border border-[#efeee9]/20 text-[#efeee9]">
        <Sparkles className="w-5 h-5" />
      </div>

      <div className="space-y-1">
        <h4 className="text-base font-medium text-[#efeee9] tracking-tight">
          Hi, I'm the AI assistant for this portfolio.
        </h4>
        <p className="text-xs text-[#efeee9]/60 max-w-xs mx-auto leading-relaxed">
          Ask me about Sanjeev's projects, skills, technologies, experience, or services.
        </p>
      </div>

      <div className="w-full space-y-1.5 pt-2">
        <span className="text-[10px] uppercase tracking-wider text-[#efeee9]/40 font-medium block text-left px-1">
          Quick Questions:
        </span>
        <div className="flex flex-col gap-1.5 text-left">
          {SUGGESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => onSelectSuggestion(q)}
              className="group flex items-center justify-between p-2.5 rounded-xl bg-[#1c1c1c] hover:bg-[#282828] border border-[#efeee9]/10 text-xs text-[#efeee9]/80 hover:text-[#efeee9] transition-colors duration-200"
            >
              <span>{q}</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
