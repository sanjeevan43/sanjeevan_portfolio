import React from "react";
import { Cpu, HardDriveDownload, CheckCircle2 } from "lucide-react";
import { ModelProgress, AIState } from "../../ai/types";

interface AIModelLoaderProps {
  state: AIState;
  progress: ModelProgress;
}

export const AIModelLoader: React.FC<AIModelLoaderProps> = ({ state, progress }) => {
  const percentage = Math.round((progress.progress || 0) * 100);

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center space-y-5 my-auto">
      <div className="h-12 w-12 rounded-full bg-[#efeee9]/10 flex items-center justify-center border border-[#efeee9]/20 text-[#efeee9] animate-pulse">
        {state === "checking" ? (
          <Cpu className="w-6 h-6 text-[#efeee9]" />
        ) : (
          <HardDriveDownload className="w-6 h-6 text-[#efeee9]" />
        )}
      </div>

      <div className="space-y-1">
        <h4 className="text-base font-medium text-[#efeee9] tracking-tight">
          {state === "checking"
            ? "Checking WebGPU & Browser Capabilities..."
            : state === "downloading"
            ? `Downloading Local AI Model (${percentage}%)`
            : state === "loading"
            ? "Preparing Local AI Inference..."
            : "AI Assistant Ready"}
        </h4>
        <p className="text-xs text-[#efeee9]/60 max-w-xs mx-auto leading-relaxed">
          {progress.text || "Initial setup in progress..."}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xs bg-[#1f1f1f] h-2 rounded-full overflow-hidden border border-[#efeee9]/10">
        <div
          className="bg-[#efeee9] h-full transition-all duration-300 ease-out"
          style={{ width: `${Math.max(percentage, 5)}%` }}
        />
      </div>

      <div className="bg-[#1c1c1c] p-3.5 rounded-xl border border-[#efeee9]/10 max-w-xs text-left">
        <p className="text-[11px] text-[#efeee9]/60 leading-normal">
          <span className="font-semibold text-[#efeee9]">Privacy &amp; Performance:</span> Your AI assistant runs 100% locally inside your browser via WebGPU. The open-weights model is downloaded to your browser storage once and runs offline without sending your messages to external APIs.
        </p>
      </div>
    </div>
  );
};
