// Central configuration for the browser-side local WebLLM assistant
export const AI_CONFIG = {
  // Qwen2.5-0.5B-Instruct model for excellent instruction following & concise answers
  model: "Qwen2.5-0.5B-Instruct-q4f16_1-MLC",
  maxTokens: 128,
  temperature: 0.2,
  topP: 0.8,
  repetitionPenalty: 1.15,
  storageKey: "sanjeev_portfolio_ai_chat_v1"
};

