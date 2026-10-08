import { useState, useEffect, useCallback, useRef } from "react";
import { ChatMessage, ModelProgress, AIState } from "../ai/types";
import { AI_CONFIG } from "../ai/model";
import { supportsWebGPU, getOrInitWebLLMEngine, streamChatResponse } from "../ai/webllm";

export function useAIAssistant() {
  const [state, setState] = useState<AIState>("idle");
  const [isWebGPUSupported, setIsWebGPUSupported] = useState<boolean>(true);
  const [modelProgress, setModelProgress] = useState<ModelProgress>({ progress: 0, text: "" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const isInitializingRef = useRef<boolean>(false);

  // Load chat history from localStorage on mount and start background pre-loading
  useEffect(() => {
    const hasGPU = supportsWebGPU();
    setIsWebGPUSupported(hasGPU);
    try {
      const saved = localStorage.getItem(AI_CONFIG.storageKey);
      if (saved) {
        setMessages(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Could not load stored chat history", e);
    }

    // Silently pre-load model assets in background during idle time
    if (hasGPU) {
      const startPreload = () => {
        initEngine();
      };

      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(startPreload, { timeout: 3000 });
      } else {
        setTimeout(startPreload, 1200);
      }
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(AI_CONFIG.storageKey, JSON.stringify(messages));
    } catch (e) {
      console.warn("Could not save chat history to localStorage", e);
    }
  }, [messages]);

  // Initialize WebLLM engine lazily
  const initEngine = useCallback(async () => {
    if (!supportsWebGPU()) {
      setIsWebGPUSupported(false);
      setState("error");
      setErrorMessage("Your browser does not support WebGPU. Local AI inference requires WebGPU.");
      return;
    }

    if (state === "ready" || isInitializingRef.current) return;

    isInitializingRef.current = true;
    setState("checking");
    setErrorMessage(null);

    try {
      setState("downloading");
      await getOrInitWebLLMEngine((progress) => {
        setModelProgress(progress);
        if (progress.progress >= 1) {
          setState("loading");
        }
      });
      setState("ready");
    } catch (err: any) {
      console.error("WebLLM initialization error:", err);
      setState("error");
      setErrorMessage(
        err?.message || "Failed to download or initialize the local AI model. Please check your internet connection."
      );
    } finally {
      isInitializingRef.current = false;
    }
  }, [state]);

  // Send a user message and stream the assistant response
  const sendMessage = useCallback(
    async (userText: string) => {
      const text = userText.trim();
      if (!text || isGenerating) return;

      // Ensure model is ready before sending
      if (state !== "ready") {
        await initEngine();
      }

      const userMsg: ChatMessage = {
        id: "msg_" + Date.now() + "_user",
        role: "user",
        content: text,
        timestamp: Date.now()
      };

      const assistantMsgId = "msg_" + (Date.now() + 1) + "_assistant";
      const initialAssistantMsg: ChatMessage = {
        id: assistantMsgId,
        role: "assistant",
        content: "",
        timestamp: Date.now(),
        isStreaming: true
      };

      setMessages((prev) => [...prev, userMsg, initialAssistantMsg]);
      setIsGenerating(true);

      try {
        const historyForStream = messages.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content
        }));

        await streamChatResponse(text, historyForStream, (currentText) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMsgId
                ? { ...msg, content: currentText, isStreaming: true }
                : msg
            )
          );
        });

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId ? { ...msg, isStreaming: false } : msg
          )
        );
      } catch (err: any) {
        console.error("Error generating AI response:", err);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId
              ? {
                  ...msg,
                  content:
                    "I encountered an error generating a response. Please try again.",
                  isStreaming: false
                }
              : msg
          )
        );
      } finally {
        setIsGenerating(false);
      }
    },
    [state, initEngine, isGenerating, messages]
  );

  const clearConversation = useCallback(() => {
    setMessages([]);
    try {
      localStorage.removeItem(AI_CONFIG.storageKey);
    } catch (e) {}
  }, []);

  return {
    state,
    isWebGPUSupported,
    modelProgress,
    errorMessage,
    messages,
    isGenerating,
    initEngine,
    sendMessage,
    clearConversation
  };
}
