import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "./constants";
import { CANONICAL_HOST } from "./site-url";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export function brandOgImage(opts: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #172554 0%, #1e3a8a 58%, #0c436a 100%)",
          color: "#FFFFFF",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 96,
            height: 6,
            background: "#fbbf24",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: 3,
              color: "#fbbf24",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            {opts.eyebrow ?? SITE_NAME}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: opts.title.length > 42 ? 52 : 64,
              fontWeight: 700,
              marginTop: 22,
              lineHeight: 1.15,
              maxWidth: 1040,
            }}
          >
            {opts.title}
          </div>
          {opts.subtitle ? (
            <div
              style={{
                display: "flex",
                fontSize: 26,
                color: "rgba(255,255,255,0.72)",
                marginTop: 22,
                maxWidth: 920,
                lineHeight: 1.35,
              }}
            >
              {opts.subtitle}
            </div>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "rgba(255,255,255,0.55)",
            }}
          >
            {CANONICAL_HOST}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 18,
              color: "#fbbf24",
              letterSpacing: 1,
            }}
          >
            {SITE_TAGLINE}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
