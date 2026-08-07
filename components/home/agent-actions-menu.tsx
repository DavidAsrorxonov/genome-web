"use client";

import { useMemo, useState } from "react";
import { Bot, Check, ChevronDown, Copy, ExternalLink } from "lucide-react";

import { ClaudeAI } from "@/components/icons/claude";
import { Grok } from "@/components/icons/grok";
import { OpenAI as ChatGPT } from "@/components/icons/chatgpt";
import { PerplexityAI } from "@/components/icons/perplexity";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type AgentActionsMenuProps = {
  llmsPath: string;
  llmsUrl: string;
};

type ExternalAgent = {
  label: string;
  description: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

function createPrompt(llmsUrl: string): string {
  return `Use ${llmsUrl} as context for GenomeJS. I want to ask questions about the project, its packages, APIs, and documentation.`;
}

function createAgentUrl(baseUrl: string, prompt: string): string {
  const url = new URL(baseUrl);

  url.searchParams.set("q", prompt);

  return url.toString();
}

function MenuItemContent({
  icon: Icon,
  label,
  description,
  external = false,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  description: string;
  external?: boolean;
}) {
  return (
    <span className="flex min-w-0 items-start gap-3">
      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center text-muted-foreground">
        <Icon className="size-4" aria-hidden="true" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2 text-sm font-medium text-foreground">
          {label}
          {external ? (
            <ExternalLink
              className="size-3.5 text-muted-foreground"
              aria-hidden="true"
            />
          ) : null}
        </span>

        <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">
          {description}
        </span>
      </span>
    </span>
  );
}

export function AgentActionsMenu({ llmsPath, llmsUrl }: AgentActionsMenuProps) {
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(() => createPrompt(llmsUrl), [llmsUrl]);

  const agents = useMemo<ExternalAgent[]>(
    () => [
      {
        label: "Open in ChatGPT",
        description: "Ask ChatGPT questions with llms.txt context.",
        href: createAgentUrl("https://chatgpt.com/", prompt),
        icon: ChatGPT,
      },
      {
        label: "Open in Claude",
        description: "Ask Claude questions with llms.txt context.",
        href: createAgentUrl("https://claude.ai/new", prompt),
        icon: ClaudeAI,
      },
      {
        label: "Open in Perplexity",
        description: "Ask Perplexity questions with llms.txt context.",
        href: createAgentUrl("https://www.perplexity.ai/search/", prompt),
        icon: PerplexityAI,
      },
      {
        label: "Open in Grok",
        description: "Ask Grok questions with llms.txt context.",
        href: createAgentUrl("https://grok.com/", prompt),
        icon: Grok,
      },
    ],
    [prompt],
  );

  async function copyLlmsContent(): Promise<void> {
    const response = await fetch(llmsPath);

    if (!response.ok) {
      throw new Error("Unable to fetch llms.txt.");
    }

    const content = await response.text();

    await navigator.clipboard.writeText(content);

    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1800);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({
            variant: "outline",
            size: "sm",
          }),
          "gap-2 bg-background/60 font-mono",
        )}
      >
        {copied ? (
          <Check className="size-3.5 text-primary" aria-hidden="true" />
        ) : (
          <Copy className="size-3.5" aria-hidden="true" />
        )}
        {copied ? "Copied" : "Copy content"}
        <ChevronDown className="size-3.5" aria-hidden="true" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-100 border bg-popover/95 p-2 shadow-2xl backdrop-blur-xl"
      >
        <DropdownMenuItem
          className="items-start gap-3 px-3 py-2.5"
          onClick={() => {
            void copyLlmsContent();
          }}
        >
          <MenuItemContent
            icon={copied ? Check : Copy}
            label={copied ? "Copied content" : "Copy the content"}
            description="Copy the canonical llms.txt content."
          />
        </DropdownMenuItem>

        <DropdownMenuItem
          render={
            <a href={llmsPath} target="_blank" rel="noreferrer">
              <MenuItemContent
                icon={Bot}
                label="Open llms.txt"
                description="View the machine-readable source."
                external
              />
            </a>
          }
          className="items-start gap-3 px-3 py-2.5"
        />

        <DropdownMenuSeparator />

        {agents.map((agent) => (
          <DropdownMenuItem
            key={agent.label}
            render={
              <a href={agent.href} target="_blank" rel="noreferrer">
                <MenuItemContent
                  icon={agent.icon}
                  label={agent.label}
                  description={agent.description}
                  external
                />
              </a>
            }
            className="items-start gap-3 px-3 py-2.5"
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
