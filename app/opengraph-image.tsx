import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "GenomeJS — Design tokens that respond";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(
    join(process.cwd(), "public/images/genome-no-bg.png"),
  );

  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background: "linear-gradient(135deg, #08090c 0%, #17110c 100%)",
        color: "#f7f8fb",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "58px",
              height: "58px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "999px",
              background:
                "radial-gradient(circle, rgba(255,105,1,0.32) 0%, rgba(255,105,1,0.12) 56%, rgba(255,105,1,0) 72%)",
            }}
          >
            <img
              src={logoSrc}
              alt="GenomeJS logo"
              width="48"
              height="48"
              style={{
                width: "48px",
                height: "48px",
                objectFit: "contain",
              }}
            />
          </div>

          <div
            style={{
              fontSize: "27px",
              fontWeight: 700,
              letterSpacing: "-0.6px",
            }}
          >
            GenomeJS
          </div>
        </div>

        <div
          style={{
            padding: "10px 16px",
            border: "1px solid rgba(255,255,255,0.16)",
            borderRadius: "999px",
            color: "#aeb6c8",
            fontSize: "16px",
            letterSpacing: "1.4px",
            textTransform: "uppercase",
          }}
        >
          Reactive token compiler
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "920px",
        }}
      >
        <div
          style={{
            fontSize: "76px",
            lineHeight: 1.02,
            fontWeight: 750,
            letterSpacing: "-4px",
          }}
        >
          Design tokens that respond.
        </div>

        <div
          style={{
            marginTop: "28px",
            maxWidth: "850px",
            color: "#aeb6c8",
            fontSize: "27px",
            lineHeight: 1.4,
          }}
        >
          Declare relationships once. Resolve runtime context into safe,
          reactive CSS custom properties.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        {["Context", "Dependencies", "Resolved traits", "CSS variables"].map(
          (label, index) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                style={{
                  padding: "13px 18px",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.035)",
                  color: index === 3 ? "#ff6901" : "#d9deea",
                  fontSize: "17px",
                }}
              >
                {label}
              </div>

              {index < 3 ? (
                <div
                  style={{
                    color: "#ff6901",
                    fontSize: "24px",
                  }}
                >
                  →
                </div>
              ) : null}
            </div>
          ),
        )}
      </div>
    </div>,
    {
      ...size,
    },
  );
}
