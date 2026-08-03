import { CapabilityGrid } from "@/components/capability-grid";
import { FinalCta } from "@/components/final-cta";
import { FrameworkShowcase } from "@/components/framework-showcase";
import { HeroCompilerDemo } from "@/components/hero-compiler-demo";
import { HowItWorks } from "@/components/how-it-works";
import { Landing } from "@/components/landing";
import { ProblemComparison } from "@/components/problem-comparison";
import { ReliabilitySection } from "@/components/reliability-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";

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

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

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

      <SiteFooter />
    </div>
  );
}
