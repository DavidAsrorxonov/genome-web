import * as React from "react";

export interface CopyToClipboardState {
  isCopied: boolean;
  error: Error | null;
}

export interface UseCopyToClipboardReturn extends CopyToClipboardState {
  copyToClipboard: (text: string) => Promise<boolean>;
  reset: () => void;
}

export function useCopyToClipboard(timeout = 2000): UseCopyToClipboardReturn {
  const [isCopied, setIsCopied] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);

  const copyToClipboard = React.useCallback(
    async (text: string): Promise<boolean> => {
      if (!navigator?.clipboard) {
        const navError = new Error(
          "Clipboard API is not supported in this browser or context.",
        );
        setError(navError);
        setIsCopied(false);
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setError(null);

        // Reset the copied state after the specified timeout
        setTimeout(() => {
          setIsCopied(false);
        }, timeout);

        return true;
      } catch (err) {
        const copyError =
          err instanceof Error
            ? err
            : new Error("Failed to copy text to clipboard.");
        setError(copyError);
        setIsCopied(false);
        return false;
      }
    },
    [timeout],
  );
  const reset = React.useCallback(() => {
    setIsCopied(false);
    setError(null);
  }, []);
  return { copyToClipboard, isCopied, error, reset };
}
