import {
  JICF_WEDDING_COLORS as C,
  type JicfWeddingCertificateData,
} from "@/lib/jicf/wedding-certificate-data";

const PASTOR_SIGNATURE_SRC = "/pastor_Joe_signaturepng.png";

export const JICF_WEDDING_PAGE_WIDTH_MM = 297;
export const JICF_WEDDING_PAGE_HEIGHT_MM = 210;

function SignatureBlock({
  name,
  role,
  lineLabel,
}: {
  name: string;
  role: string;
  lineLabel: string;
}) {
  const shownName = name.trim();
  return (
    <div className="jicf-sig-block">
      <p className="jicf-sig-role">{role}</p>
      <p className="jicf-sig-name">{shownName || "\u00a0"}</p>
      <div className="jicf-sig-line" aria-hidden="true" />
      <p className="jicf-sig-line-label">{lineLabel}</p>
    </div>
  );
}

export function JicfWeddingCertificateDocument({
  data,
}: {
  data: JicfWeddingCertificateData;
}) {
  const certificateId = data.certificateId.trim();
  const day = data.ceremonyDay.trim() || "26th";
  const month = data.ceremonyMonth.trim() || "September";
  const year = data.ceremonyYear.trim() || "2026";
  const location = data.location.trim() || "Hangzhou, China";
  const bride = data.brideName.trim() || "Ruphine Manaweh Harmon";
  const groom = data.groomName.trim() || "Joshua Bosco Barvor";
  const org =
    data.organizationName.trim() || "Jinan International Christian Fellowship";

  return (
    <article
      className="jicf-wedding-page"
      aria-label={`${data.title} — ${data.organizationName}`}
    >
      <div className="jicf-wedding-frame jicf-wedding-frame-outer" />
      <div className="jicf-wedding-frame jicf-wedding-frame-gold" />
      <div className="jicf-wedding-frame jicf-wedding-frame-yellow" />
      <div className="jicf-wedding-frame jicf-wedding-frame-inner" />

      <div className="jicf-wedding-inner">
        <header className="jicf-wedding-header">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/JICF_LOGO1.png" alt="JICF" className="jicf-wedding-logo" />
          <div className="jicf-wedding-header-copy">
            <p className="jicf-org-name">{org}</p>
            <p className="jicf-subtitle">{data.subtitle}</p>
          </div>
        </header>

        <div className="jicf-title-block">
          <h1 className="jicf-title">{data.title}</h1>
          <div className="jicf-ornament" aria-hidden="true">
            <span className="jicf-ornament-rule" />
          </div>
          {certificateId ? (
            <p className="jicf-cert-id">Certificate ID: {certificateId}</p>
          ) : null}
        </div>

        <p className="jicf-cert-lead">
          This is to certify that on the {day} day of {month}, {year}, a sacred
          marriage ceremony was solemnly officiated and completed in {location}.
        </p>
        <p className="jicf-oversight">
          The holy matrimony was celebrated under the authority and pastoral
          oversight of {org}, uniting the below two persons in lawful and sacred
          marriage before God and witnesses.
        </p>

        <section className="jicf-parties" aria-label="Bride and groom">
          <div className="jicf-party">
            <p className="jicf-party-label">Bride</p>
            <p className="jicf-party-name">{bride}</p>
          </div>
          <p className="jicf-parties-and" aria-hidden="true">
            &amp;
          </p>
          <div className="jicf-party">
            <p className="jicf-party-label">Groom</p>
            <p className="jicf-party-name">{groom}</p>
          </div>
        </section>

        <p className="jicf-covenant">{data.covenantText}</p>

        <footer className="jicf-sign-row">
          <div className="jicf-sig-block">
            <p className="jicf-sig-role">{data.officiantHeading}</p>
            <p className="jicf-sig-body">{data.officiantTestimony}</p>
            <p className="jicf-sig-name">
              {data.officiantRole}: {data.officiantName}
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PASTOR_SIGNATURE_SRC}
              alt="Signature of Joseph Summers"
              className="jicf-pastor-signature"
            />
            <p className="jicf-sig-date">
              {day} {month} {year}
            </p>
            <div className="jicf-sig-line" aria-hidden="true" />
            <p className="jicf-sig-line-label">Signature &amp; Date</p>
          </div>
          <div className="jicf-witness-col">
            <p className="jicf-sig-role">{data.witnessHeading}</p>
            <p className="jicf-sig-body">{data.witnessTestimony}</p>
            <div className="jicf-witness-grid">
              <SignatureBlock
                name=""
                role="Witness 1"
                lineLabel="Signature"
              />
              <SignatureBlock
                name=""
                role="Witness 2"
                lineLabel="Signature"
              />
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
}

export const jicfWeddingCertificateStyles = `
  .jicf-wedding-page {
    --jicf-navy: ${C.navy};
    --jicf-red: ${C.red};
    --jicf-gold: ${C.gold};
    --jicf-yellow: ${C.yellow};
    --jicf-cream: ${C.cream};
    --jicf-ink: ${C.ink};
    --jicf-muted: ${C.muted};
    box-sizing: border-box;
    position: relative;
    width: ${JICF_WEDDING_PAGE_WIDTH_MM}mm;
    height: ${JICF_WEDDING_PAGE_HEIGHT_MM}mm;
    overflow: hidden;
    background: var(--jicf-yellow);
    color: var(--jicf-ink);
    font-family: Georgia, "Times New Roman", Times, serif;
    box-shadow: 0 12px 40px rgba(25, 5, 112, 0.18);
  }
  .jicf-wedding-page *,
  .jicf-wedding-page *::before,
  .jicf-wedding-page *::after { box-sizing: border-box; }
  .jicf-wedding-frame { pointer-events: none; position: absolute; }
  .jicf-wedding-frame-outer { inset: 3.5mm; border: 2.4mm solid var(--jicf-yellow); }
  .jicf-wedding-frame-gold { inset: 6mm; border: 0.7mm solid var(--jicf-gold); }
  .jicf-wedding-frame-yellow { inset: 7.4mm; background: var(--jicf-yellow); }
  .jicf-wedding-frame-inner {
    inset: 10mm;
    border: 0.45mm solid var(--jicf-navy);
    background: var(--jicf-cream);
  }
  .jicf-wedding-inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 14mm 18mm 12mm;
  }
  .jicf-wedding-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8mm;
  }
  .jicf-wedding-logo {
    width: 28mm;
    height: 28mm;
    object-fit: contain;
    flex: 0 0 auto;
  }
  .jicf-wedding-header-copy { min-width: 0; text-align: center; }
  .jicf-org-name {
    margin: 0;
    color: var(--jicf-navy);
    font-size: 6.4mm;
    font-weight: 700;
    letter-spacing: 0.18mm;
    line-height: 1.12;
    text-transform: uppercase;
  }
  .jicf-place {
    margin: 1.4mm 0 0;
    color: var(--jicf-navy);
    font-size: 4mm;
    font-weight: 700;
    line-height: 1.2;
  }
  .jicf-subtitle {
    margin: 1mm 0 0;
    color: var(--jicf-red);
    font-size: 3.8mm;
    font-style: italic;
    font-weight: 700;
  }
  .jicf-title-block { margin-top: 5mm; text-align: center; }
  .jicf-title {
    margin: 0;
    color: var(--jicf-navy);
    font-size: 9mm;
    font-weight: 700;
    letter-spacing: 0.8mm;
    line-height: 1;
    text-transform: uppercase;
  }
  .jicf-ornament { display: flex; justify-content: center; margin-top: 2.4mm; }
  .jicf-ornament-rule {
    display: block;
    width: 72mm;
    height: 1.3mm;
    background: var(--jicf-yellow);
    border-radius: 1mm;
    box-shadow: 0 0 0 0.35mm var(--jicf-gold);
  }
  .jicf-cert-id {
    margin: 2.2mm 0 0;
    color: var(--jicf-navy);
    font-size: 3.6mm;
    font-weight: 700;
    letter-spacing: 0.2mm;
    text-align: center;
  }
  .jicf-cert-lead {
    margin: 3.2mm 4mm 0;
    text-align: center;
    color: var(--jicf-ink);
    font-size: 4.1mm;
    line-height: 1.35;
  }
  .jicf-cert-lead strong { font-weight: 700; }
  .jicf-inline-name {
    color: var(--jicf-red);
    font-style: italic;
    font-weight: 700;
    font-size: 5.6mm;
  }
  .jicf-covenant {
    margin: 2.6mm 4mm 0;
    text-align: center;
    color: var(--jicf-navy);
    font-size: 3.6mm;
    font-style: italic;
    line-height: 1.35;
  }
  .jicf-sign-row {
    display: grid;
    grid-template-columns: 1fr 1.15fr;
    column-gap: 10mm;
    margin-top: 8mm;
  }
  .jicf-sig-block { min-width: 0; text-align: center; }
  .jicf-sig-role {
    margin: 0;
    color: var(--jicf-navy);
    font-size: 3.3mm;
    font-weight: 700;
    letter-spacing: 0.16mm;
    text-transform: uppercase;
  }
  .jicf-sig-name {
    margin: 1.4mm 0 0;
    min-height: 6mm;
    color: var(--jicf-navy);
    font-size: 4.2mm;
    font-weight: 700;
    line-height: 1.15;
    overflow-wrap: anywhere;
  }
  .jicf-sig-line {
    margin-top: 7mm;
    border-bottom: 0.4mm solid var(--jicf-navy);
  }
  .jicf-sig-line-label {
    margin: 1.2mm 0 0;
    color: var(--jicf-muted);
    font-size: 3mm;
    font-style: italic;
  }
  .jicf-sig-body {
    margin: 1mm 0 0;
    color: var(--jicf-ink);
    font-size: 2.8mm;
    line-height: 1.3;
    text-align: center;
  }
  .jicf-pastor-signature {
    display: block;
    height: 12mm;
    width: auto;
    max-width: 48mm;
    margin: 1mm auto 0;
    object-fit: contain;
  }
  .jicf-sig-date {
    margin: 0.6mm 0 0;
    color: var(--jicf-navy);
    font-size: 3mm;
    font-weight: 700;
    text-align: center;
  }
  .jicf-witness-col { min-width: 0; }
  .jicf-witness-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 5mm;
    margin-top: 2mm;
  }
  .jicf-parties {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: end;
    column-gap: 4mm;
    margin: 3mm 0 0;
  }
  .jicf-party { text-align: center; }
  .jicf-party-label {
    margin: 0;
    color: var(--jicf-navy);
    font-size: 2.8mm;
    font-weight: 700;
    letter-spacing: 0.4mm;
    text-transform: uppercase;
  }
  .jicf-party-name {
    margin: 0.8mm 0 0;
    color: var(--jicf-red);
    font-size: 5.2mm;
    font-style: italic;
    font-weight: 700;
  }
  .jicf-parties-and {
    margin: 0 0 1mm;
    color: var(--jicf-gold);
    font-size: 5mm;
    font-weight: 700;
  }
  .jicf-oversight {
    margin: 2.4mm 6mm 0;
    text-align: center;
    color: var(--jicf-ink);
    font-size: 3.8mm;
    line-height: 1.4;
  }
`;
