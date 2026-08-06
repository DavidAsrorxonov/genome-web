"use client";

import { useEffect, useRef, useState } from "react";

import { Check, Copy, Link2, RotateCcw } from "lucide-react";

import { usePlaygroundController } from "@/components/playground/playground-controller";

import { createCssOutput } from "@/lib/playground/compiler-output";

import type { PlaygroundResolvedTrait } from "@/lib/playground/compiler-output";

import { createPlaygroundRelativeUrl } from "@/lib/playground/url-state";

import { cn } from "@/lib/utils";
import { trackAnalyticsEvent } from "@/lib/analytics";

interface PlaygroundActionsProps {
  traits: readonly PlaygroundResolvedTrait[];

  changedNames: ReadonlySet<string>;
}

type ActionStatus =
  | "idle"
  | "shared"
  | "all-copied"
  | "changed-copied"
  | "reset"
  | "error";

async function copyText(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);

    return;
  }

  const textarea = document.createElement("textarea");

  textarea.value = text;
  textarea.setAttribute("readonly", "");

  textarea.style.position = "fixed";

  textarea.style.opacity = "0";

  document.body.appendChild(textarea);

  textarea.select();

  const successful = document.execCommand("copy");

  textarea.remove();

  if (!successful) {
    throw new Error("Clipboard copy failed.");
  }
}

function ActionButton({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;

  disabled?: boolean;

  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border bg-background px-3 text-xs font-medium shadow-sm transition-colors",
        "hover:bg-muted",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-45",
      )}
    >
      {children}
    </button>
  );
}

export function PlaygroundActions({
  traits,
  changedNames,
}: PlaygroundActionsProps) {
  const { presetId, context, resetPreset } = usePlaygroundController();

  const [status, setStatus] = useState<ActionStatus>("idle");

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function showStatus(nextStatus: ActionStatus): void {
    setStatus(nextStatus);

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setStatus("idle");
    }, 1800);
  }

  async function handleShare(): Promise<void> {
    try {
      const relativeUrl = createPlaygroundRelativeUrl(
        {
          presetId,
          context,
        },
        window.location.pathname,
      );

      const absoluteUrl = new URL(relativeUrl, window.location.origin);

      window.history.replaceState(
        null,
        "",
        `${relativeUrl}${window.location.hash}`,
      );

      await copyText(absoluteUrl.toString());

      trackAnalyticsEvent("Playground State Shared", {
        preset: presetId,
      });

      showStatus("shared");
    } catch {
      showStatus("error");
    }
  }

  async function handleCopyAll(): Promise<void> {
    try {
      await copyText(createCssOutput(traits));

      trackAnalyticsEvent("Playground CSS Copied", {
        preset: presetId,
        scope: "all",
      });

      showStatus("all-copied");
    } catch {
      showStatus("error");
    }
  }

  async function handleCopyChanged(): Promise<void> {
    try {
      await copyText(createCssOutput(traits, changedNames));

      trackAnalyticsEvent("Playground CSS Copied", {
        preset: presetId,
        scope: "changed",
      });

      showStatus("changed-copied");
    } catch {
      showStatus("error");
    }
  }

  function handleReset(): void {
    resetPreset();

    showStatus("reset");
  }

  const success = status !== "idle" && status !== "error";

  const statusMessage = {
    idle: "",
    shared: "Share URL copied.",
    "all-copied": "All CSS copied.",
    "changed-copied": "Changed CSS copied.",
    reset: "Preset reset.",
    error: "Action failed.",
  }[status];

  return (
    <div className="rounded-xl border bg-muted/15 p-3">
      <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
        <ActionButton
          onClick={() => {
            void handleShare();
          }}
        >
          {status === "shared" ? (
            <Check className="size-3.5" aria-hidden="true" />
          ) : (
            <Link2 className="size-3.5" aria-hidden="true" />
          )}
          Share
        </ActionButton>

        <ActionButton onClick={handleReset}>
          {status === "reset" ? (
            <Check className="size-3.5" aria-hidden="true" />
          ) : (
            <RotateCcw className="size-3.5" aria-hidden="true" />
          )}
          Reset
        </ActionButton>

        <ActionButton
          onClick={() => {
            void handleCopyAll();
          }}
        >
          {status === "all-copied" ? (
            <Check className="size-3.5" aria-hidden="true" />
          ) : (
            <Copy className="size-3.5" aria-hidden="true" />
          )}
          Copy CSS
        </ActionButton>

        <ActionButton
          disabled={changedNames.size === 0}
          onClick={() => {
            void handleCopyChanged();
          }}
        >
          {status === "changed-copied" ? (
            <Check className="size-3.5" aria-hidden="true" />
          ) : (
            <Copy className="size-3.5" aria-hidden="true" />
          )}
          Copy changed
        </ActionButton>
      </div>

      <div className="mt-2 min-h-5">
        <p
          aria-live="polite"
          className={cn(
            "text-xs",
            success && "text-emerald-600 dark:text-emerald-400",
            status === "error" && "text-destructive",
            status === "idle" && "text-muted-foreground",
          )}
        >
          {statusMessage ||
            (changedNames.size > 0
              ? `${changedNames.size} trait${changedNames.size === 1 ? "" : "s"} changed in the latest mutation.`
              : "Change a context value to enable changed-output copying.")}
        </p>
      </div>
    </div>
  );
}
