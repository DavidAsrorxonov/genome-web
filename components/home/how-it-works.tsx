"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AUTO_STAGE_DELAY_MS, stages } from "./content/how-it-works";

type StageId = "declare" | "discover" | "resolve" | "express";

export type Stage = {
  id: StageId;
  number: string;
  title: string;
  summary: string;
  description: string;
  icon: ComponentType<{
    className?: string;
    "aria-hidden"?: boolean;
  }>;
  code: string[];
  label: string;
};

function StageButton({
  stage,
  index,
  activeIndex,
  onSelect,
}: {
  stage: Stage;
  index: number;
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  const Icon = stage.icon;
  const active = index === activeIndex;
  const reached = index <= activeIndex;

  return (
    <li className="relative flex gap-4 md:block md:min-w-0 md:flex-1">
      {index < stages.length - 1 ? (
        <>
          <span
            aria-hidden="true"
            className="absolute left-4.5 top-10 h-[calc(100%+0.5rem)] w-px bg-border md:left-[calc(50%+1.5rem)] md:top-4.5 md:h-px md:w-[calc(100%-3rem)]"
          />

          <span
            aria-hidden="true"
            className={cn(
              "absolute left-4.5 top-10 h-0 w-px bg-primary transition-[height] duration-500 md:left-[calc(50%+1.5rem)] md:top-4.5 md:h-px md:w-0 md:transition-[width]",
              index < activeIndex &&
                "h-[calc(100%+0.5rem)] md:w-[calc(100%-3rem)]",
            )}
          />
        </>
      ) : null}

      <button
        type="button"
        onClick={() => onSelect(index)}
        aria-current={active ? "step" : undefined}
        className="group relative z-10 flex w-full items-start gap-4 text-left focus-visible:outline-none md:block md:text-center"
      >
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-full border bg-background text-muted-foreground transition-all duration-500 md:mx-auto",
            reached && "border-primary bg-primary text-primary-foreground",
            active &&
              "shadow-[0_0_0_5px_color-mix(in_oklab,var(--primary)_15%,transparent)]",
          )}
        >
          <Icon className="size-4" aria-hidden={true} />
        </span>

        <span className="block min-w-0 pb-8 md:mt-5 md:px-3 md:pb-0">
          <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground">
            {stage.number}
          </span>

          <span
            className={cn(
              "mt-1 block font-semibold transition-colors",
              active && "text-primary",
            )}
          >
            {stage.title}
          </span>

          <span className="mt-2 block text-sm leading-6 text-muted-foreground">
            {stage.summary}
          </span>
        </span>
      </button>
    </li>
  );
}

function CodePanel({ stage }: { stage: Stage }) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
      <div className="flex items-center justify-between gap-4 border-b px-4 py-3 sm:px-5">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-destructive" />
          <span className="size-2 rounded-full bg-primary/40" />
          <span className="size-2 rounded-full bg-primary" />
        </div>

        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          {stage.label}
        </p>
      </div>

      <pre className="min-h-76 overflow-x-auto p-5 font-mono text-[12px] leading-6 sm:p-6 sm:text-[13px]">
        <code>
          {stage.code.map((line, index) => (
            <span
              key={`${stage.id}-${index}`}
              className="grid min-w-max grid-cols-[2rem_1fr]"
            >
              <span
                aria-hidden="true"
                className="select-none pr-4 text-right text-muted-foreground/40"
              >
                {index + 1}
              </span>

              <span
                className={cn(
                  line.includes("──→") ||
                    line.includes("▼") ||
                    line.includes("--g-") ||
                    line.includes("notified")
                    ? "text-primary"
                    : "text-foreground",
                )}
              >
                {line || " "}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const hasAnimatedRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);

  const activeStage = stages[activeIndex];

  function clearTimers() {
    timersRef.current.forEach((timer) => clearTimeout(timer));

    timersRef.current = [];
  }

  function selectStage(index: number) {
    clearTimers();
    hasAnimatedRef.current = true;
    setActiveIndex(index);
  }

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasAnimatedRef.current) {
          return;
        }

        hasAnimatedRef.current = true;

        stages.forEach((_, index) => {
          const timer = setTimeout(() => {
            setActiveIndex(index);
          }, index * AUTO_STAGE_DELAY_MS);

          timersRef.current.push(timer);
        });
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      clearTimers();
    };
  }, []);

  if (!activeStage) {
    return null;
  }

  const ActiveIcon = activeStage.icon;

  return (
    <section
      ref={sectionRef}
      className="relative"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto w-full max-w-310 px-4 py-20 sm:px-6 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="rounded-full">
            How it works
          </Badge>

          <h2
            id="how-it-works-heading"
            className="mt-5 text-balance font-heading text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl"
          >
            From token definition to reactive CSS.
          </h2>

          <p className="mt-5 text-pretty text-lg leading-8 text-muted-foreground">
            GenomeJS discovers relationships, resolves them safely, and
            expresses the result through the platform primitives your interface
            already understands.
          </p>
        </div>

        <ol
          className="mx-auto mt-14 grid max-w-5xl md:grid-cols-4"
          aria-label="GenomeJS compilation stages"
        >
          {stages.map((stage, index) => (
            <StageButton
              key={stage.id}
              stage={stage}
              index={index}
              activeIndex={activeIndex}
              onSelect={selectStage}
            />
          ))}
        </ol>

        <div
          className="mt-10 grid items-stretch gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:gap-6"
          aria-live="polite"
        >
          <div className="flex flex-col rounded-2xl border bg-card p-6 text-card-foreground sm:p-8">
            <div className="flex size-11 items-center justify-center rounded-xl border bg-background text-primary shadow-sm">
              <ActiveIcon className="size-5" aria-hidden={true} />
            </div>

            <p className="mt-8 font-mono text-xs tracking-[0.16em] text-primary">
              STAGE {activeStage.number}
            </p>

            <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              {activeStage.title}
            </h3>

            <p className="mt-4 text-base leading-7 text-muted-foreground">
              {activeStage.description}
            </p>

            <div className="mt-auto pt-8">
              <div className="rounded-xl border bg-background px-4 py-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Pipeline
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-xs">
                  {stages.map((stage, index) => (
                    <span key={stage.id} className="contents">
                      <button
                        type="button"
                        onClick={() => selectStage(index)}
                        className={cn(
                          "rounded-md px-2 py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          index === activeIndex
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {stage.title}
                      </button>

                      {index < stages.length - 1 ? (
                        <span
                          aria-hidden="true"
                          className="text-muted-foreground/50"
                        >
                          →
                        </span>
                      ) : null}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <CodePanel stage={activeStage} />
        </div>
      </div>
    </section>
  );
}
