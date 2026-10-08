import React from "react";
import { AlertCircle, RefreshCw, Globe } from "lucide-react";

interface AIErrorProps {
  isWebGPUSupported: boolean;
  errorMessage: string | null;
  onRetry: () => void;
}

export const AIError: React.FC<AIErrorProps> = ({ isWebGPUSupported, errorMessage, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center space-y-5 my-auto">
      <div className="h-12 w-12 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/30 text-rose-400">
        <AlertCircle className="w-6 h-6" />
      </div>

      <div className="space-y-2">
        <h4 className="text-base font-medium text-[#efeee9] tracking-tight">
          {!isWebGPUSupported
            ? "WebGPU Not Supported On This Device"
            : "AI Assistant Initialization Failed"}
        </h4>
        <p className="text-xs text-[#efeee9]/70 max-w-xs mx-auto leading-relaxed">
          {!isWebGPUSupported
            ? "Your current browser or hardware does not support WebGPU, which is required to run the local AI assistant directly on your device."
            : errorMessage || "The AI model could not be loaded. Please check your connection and try again."}
        </p>
      </div>

      {!isWebGPUSupported ? (
        <div className="bg-[#1c1c1c] p-4 rounded-xl border border-[#efeee9]/10 text-left max-w-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#efeee9]">
            <Globe className="w-4 h-4 text-[#efeee9]/60" />
            <span>Compatible Browsers:</span>
          </div>
          <ul className="text-[11px] text-[#efeee9]/60 space-y-1 list-disc pl-4">
            <li>Google Chrome (v113+)</li>
            <li>Microsoft Edge (v113+)</li>
            <li>Opera / Arc Browser</li>
            <li>Safari (macOS 15+ / iOS 18+)</li>
          </ul>
        </div>
      ) : (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 bg-[#efeee9] text-black text-xs font-medium rounded-lg hover:bg-white transition-colors duration-200"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Loading AI</span>
        </button>
      )}
    </div>
  );
};
