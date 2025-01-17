import { useState } from "react";

export function useClipboard() {
  const [copied, setCopied] = useState(false);

  async function copyToClipboard(text) {
    if (!navigator?.clipboard) {
      console.warn("Clipboard API não está disponível nesse navegador.");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Falha ao copiar para a área de transferência:", error);
    }
  }

  return {
    copyToClipboard,
    copied,
  };
}
