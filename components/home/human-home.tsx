import { Badge } from "@/components/ui/badge";

import { CapabilityGrid } from "./capability-grid";
import { FinalCta } from "./final-cta";
import { FrameworkShowcase } from "./framework-showcase";
import { HeroCompilerDemo } from "./hero-compiler-demo";
import { HowItWorks } from "./how-it-works";
import { Landing } from "./landing";
import { ProblemComparison } from "./problem-comparison";
import { ReliabilitySection } from "./reliability-section";

function CompilerDemoSection() {
  return (
    <section className="relative" aria-labelledby="compiler-demo-heading">
      <div className="mx-auto w-full max-w-310 px-4 pb-20 sm:px-6 sm:pb-24 lg:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="rounded-full">
            Live compiler
          </Badge>

          <h2
            id="compiler-demo-heading"
            className="mt-5 text-balance font-heading text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl"
          >
            Watch runtime context resolve into CSS.
          </h2>

          <p className="mt-5 text-pretty text-lg leading-8 text-muted-foreground">
            Mutate mode, scale, contrast, and viewport state to see the related
            token values update in the graph and rendered interface.
          </p>
        </div>

        <div className="mt-14">
          <HeroCompilerDemo />
        </div>
      </div>
    </section>
  );
}

export function HumanHome() {
  return (
    <main className="relative overflow-hidden">
      <Landing />

      <CompilerDemoSection />

      <ProblemComparison />

      <HowItWorks />

      <FrameworkShowcase />

      <CapabilityGrid />

      <ReliabilitySection />

      <FinalCta />
    </main>
  );
}
