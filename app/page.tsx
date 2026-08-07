import { AgentHome } from "@/components/home/agent-home";
import { HomeModeShell } from "@/components/home/home-mode-shell";
import { HumanHome } from "@/components/home/human-home";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url.origin}/#website`,
      name: siteConfig.name,
      url: siteConfig.url.origin,
      description: siteConfig.description,
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteConfig.url.origin}/#software`,
      name: siteConfig.name,
      url: siteConfig.url.origin,
      description: siteConfig.description,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      programmingLanguage: "TypeScript",
      codeRepository: siteConfig.githubUrl,
      downloadUrl: siteConfig.npmUrl,
      license: `${siteConfig.githubUrl}/blob/main/LICENSE`,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <HomeModeShell
        header={<SiteHeader />}
        human={<HumanHome />}
        agent={<AgentHome />}
        footer={<SiteFooter />}
      />
    </>
  );
}
