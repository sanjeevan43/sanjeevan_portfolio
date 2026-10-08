import React, { useState, useEffect } from "react";
import { useAIAssistant } from "../../hooks/useAIAssistant";
import { AIButton } from "./AIButton";
import { AIChatWindow } from "./AIChatWindow";

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    state,
    isWebGPUSupported,
    modelProgress,
    errorMessage,
    messages,
    isGenerating,
    initEngine,
    sendMessage,
    clearConversation
  } = useAIAssistant();

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (state === "idle" || state === "error") {
      initEngine();
    }
  };

  // Global trigger listener so header/nav buttons open the chat
  useEffect(() => {
    const handleGlobalTrigger = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const trigger = target?.closest?.("[data-ai-trigger]");
      if (trigger) {
        e.preventDefault();
        setIsOpen(true);
        if (state === "idle" || state === "error") {
          initEngine();
        }
      }
    };
    document.addEventListener("click", handleGlobalTrigger);
    return () => document.removeEventListener("click", handleGlobalTrigger);
  }, [state, initEngine]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <AIButton isOpen={isOpen} onClick={handleToggle} state={state} />

      {isOpen && (
        <AIChatWindow
          state={state}
          isWebGPUSupported={isWebGPUSupported}
          modelProgress={modelProgress}
          errorMessage={errorMessage}
          messages={messages}
          isGenerating={isGenerating}
          onClose={() => setIsOpen(false)}
          onSendMessage={sendMessage}
          onClear={clearConversation}
          onRetry={initEngine}
        />
      )}
    </>
  );
};
