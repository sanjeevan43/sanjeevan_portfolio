import React from "react";
import { AIState, ModelProgress } from "../../ai/types";

interface AIStatusProps {
  state: AIState;
  isWebGPUSupported: boolean;
  progress: ModelProgress;
}

export const AIStatus: React.FC<AIStatusProps> = ({ state, isWebGPUSupported, progress }) => {
  if (!isWebGPUSupported || state === "error") {
    return (
      <span className="text-[11px] text-rose-400 flex items-center gap-1.5 font-medium">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
        Local AI unavailable (WebGPU required)
      </span>
    );
  }

  if (state === "ready") {
    return (
      <span className="text-[11px] text-emerald-400 flex items-center gap-1.5 font-medium">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        ● AI Ready
      </span>
    );
  }

  const pct = Math.round((progress.progress || 0) * 100);

  return (
    <div className="flex flex-col items-start text-[11px] text-[#efeee9]/70">
      <span className="flex items-center gap-1.5 font-medium text-amber-300">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
        ○ Preparing local AI... {pct > 0 ? `${pct}%` : ""}
      </span>
      <span className="text-[10px] text-[#efeee9]/40 truncate max-w-[200px]">
        You can continue browsing while this finishes
      </span>
    </div>
  );
};
