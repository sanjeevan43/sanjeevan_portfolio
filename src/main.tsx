import React from "react";
import ReactDOM from "react-dom/client";
import { AIAssistant } from "./components/ai/AIAssistant";

const rootElement = document.getElementById("ai-assistant-root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AIAssistant />
    </React.StrictMode>
  );
}
