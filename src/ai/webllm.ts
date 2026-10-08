import { AI_CONFIG } from "./model";
import { ModelProgress } from "./types";
import { SYSTEM_PROMPT } from "./systemPrompt";
import { buildRelevantContext } from "./context";

export function supportsWebGPU(): boolean {
  return typeof navigator !== "undefined" && "gpu" in navigator && !!navigator.gpu;
}

let engineInstance: any = null;
let currentModelId: string = "";

export async function getOrInitWebLLMEngine(
  onProgress?: (progress: ModelProgress) => void
): Promise<any> {
  if (!supportsWebGPU()) {
    throw new Error("WebGPU is not supported on this browser or device.");
  }

  if (engineInstance && currentModelId === AI_CONFIG.model) {
    return engineInstance;
  }

  // Dynamically import WebLLM so initial bundle size stays light
  const webllm = await import("@mlc-ai/web-llm");

  const initProgressCallback = (report: any) => {
    let progress = 0;
    if (typeof report.progress === "number") {
      progress = report.progress;
    }
    onProgress?.({
      progress: progress,
      text: report.text || "Initializing local AI..."
    });
  };

  engineInstance = await webllm.CreateMLCEngine(AI_CONFIG.model, {
    initProgressCallback
  });

  currentModelId = AI_CONFIG.model;
  return engineInstance;
}

export async function streamChatResponse(
  userQuery: string,
  history: Array<{ role: "user" | "assistant"; content: string }>,
  onChunk: (text: string) => void
): Promise<string> {
  if (!engineInstance) {
    throw new Error("AI engine is not initialized.");
  }

  const contextInfo = buildRelevantContext(userQuery);
  const systemContent = `${SYSTEM_PROMPT}\n\nPORTFOLIO KNOWLEDGE CONTEXT:\n${contextInfo}`;

  const formattedMessages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
    { role: "system", content: systemContent }
  ];

  const recentHistory = history.slice(-4);
  for (const msg of recentHistory) {
    formattedMessages.push({ role: msg.role, content: msg.content });
  }

  formattedMessages.push({ role: "user", content: userQuery });

  const completion = await engineInstance.chatCompletion({
    messages: formattedMessages,
    temperature: AI_CONFIG.temperature,
    max_tokens: AI_CONFIG.maxTokens,
    top_p: AI_CONFIG.topP,
    repetition_penalty: AI_CONFIG.repetitionPenalty,
    stream: true
  });

  let fullText = "";
  for await (const chunk of completion) {
    const delta = chunk.choices[0]?.delta?.content || "";
    fullText += delta;

    // Detect and break out if repeating phrase loops occur
    if (fullText.length > 80) {
      const words = fullText.split(/\s+/);
      if (words.length > 20) {
        const last10 = words.slice(-8).join(" ");
        const firstPart = words.slice(0, -8).join(" ");
        if (firstPart.includes(last10)) {
          // Repetition loop detected, break stream
          break;
        }
      }
    }

    onChunk(fullText);
  }

  // Clean up any trailing partial repeated words
  let cleanText = fullText.trim();
  onChunk(cleanText);
  return cleanText;
}

export function resetEngineState() {
  engineInstance = null;
  currentModelId = "";
}
