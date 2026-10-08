export function isMobileDevice(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;
  return (
    window.innerWidth < 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  );
}

// Central configuration for the browser-side local WebLLM assistant
export const AI_CONFIG = {
  // Ultra-light model on mobile (40MB download, 100MB VRAM) to prevent phone lag
  get model() {
    return isMobileDevice()
      ? "SmolLM2-135M-Instruct-q0f16-MLC"
      : "Qwen2.5-0.5B-Instruct-q4f16_1-MLC";
  },
  get maxTokens() {
    return isMobileDevice() ? 80 : 120;
  },
  temperature: 0.2,
  topP: 0.8,
  repetitionPenalty: 1.15,
  storageKey: "sanjeev_portfolio_ai_chat_v1"
};

