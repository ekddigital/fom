import {
  JICF_WEDDING_COLORS as C,
  buildCertificationText,
  buildOversightText,
  displayPartyName,
  displayWitnessName,
  type JicfWeddingCertificateData,
} from "@/lib/jicf/wedding-certificate-data";

export const JICF_WEDDING_PAGE_WIDTH_MM = 297;
export const JICF_WEDDING_PAGE_HEIGHT_MM = 210;

function CrossSeal() {
  return (
    <svg
      width="68"
      height="68"
      viewBox="0 0 80 80"
      role="img"
      aria-label="JICF cross seal"
      className="jicf-wedding-seal"
    >
      <circle cx="40" cy="40" r="38" fill={C.navy} />
      <circle cx="40" cy="40" r="34" fill="none" stroke={C.gold} strokeWidth="2.4" />
      <circle
        cx="40"
        cy="40"
        r="30"
        fill="none"
        stroke={C.yellow}
        strokeWidth="0.7"
        opacity="0.85"
      />
      <rect x="36.4" y="18" width="7.2" height="44" rx="1.4" fill={C.gold} />
      <rect x="22" y="32.4" width="36" height="7.2" rx="1.4" fill={C.gold} />
    </svg>
  );
}

function SignatureBlock({
  heading,
  name,
  role,
  lineLabel,
}: {
  heading: string;
  name: string;
  role: string;
  lineLabel: string;
}) {
  return (
    <div className="jicf-sig-block">
      {heading ? <p className="jicf-sig-heading">{heading}</p> : null}
      {role ? <p className="jicf-sig-role">{role}</p> : null}
      <p className="jicf-sig-name">{name || "\u00a0"}</p>
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
  const bride = displayPartyName(data.brideName, "Bride");
  const groom = displayPartyName(data.groomName, "Groom");
  const certificateId = data.certificateId.trim();

  return (
    <article
      className="jicf-wedding-page"
      aria-label={`${data.title} — ${data.organizationName}`}
    >
      <div className="jicf-wedding-frame jicf-wedding-frame-outer" />
      <div className="jicf-wedding-frame jicf-wedding-frame-gold" />
      <div className="jicf-wedding-frame jicf-wedding-frame-cream" />
      <div className="jicf-wedding-frame jicf-wedding-frame-inner" />

      <div className="jicf-wedding-inner">
        <header className="jicf-wedding-header">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/JICF_LOGO1.png" alt="JICF" className="jicf-wedding-logo" />
          <div className="jicf-wedding-header-copy">
            <p className="jicf-org-name">{data.organizationName}</p>
            <p className="jicf-subtitle">{data.subtitle}</p>
          </div>
          <CrossSeal />
        </header>

        <div className="jicf-title-block">
          <h1 className="jicf-title">{data.title}</h1>
          <div className="jicf-ornament" aria-hidden="true">
            <span className="jicf-ornament-rule" />
            <span className="jicf-ornament-mark">✦</span>
            <span className="jicf-ornament-rule" />
          </div>
        </div>

        <p className="jicf-cert-lead">{buildCertificationText(data)}</p>
        <p className="jicf-oversight">{buildOversightText(data)}</p>

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

        <footer className="jicf-wedding-footer">
          <div className="jicf-verify-col">
            <h2 className="jicf-section-title">{data.officiantHeading}</h2>
            <p className="jicf-section-body">{data.officiantTestimony}</p>
            <SignatureBlock
              heading=""
              role={data.officiantRole}
              name={data.officiantName.trim()}
              lineLabel={data.officiantSignatureLabel}
            />
          </div>
          <div className="jicf-verify-col">
            <h2 className="jicf-section-title">{data.witnessHeading}</h2>
            <p className="jicf-section-body">{data.witnessTestimony}</p>
            <div className="jicf-witness-grid">
              <SignatureBlock
                heading="Witness 1"
                role=""
                name={displayWitnessName(data.witness1Name)}
                lineLabel={data.witnessSignatureLabel}
              />
              <SignatureBlock
                heading="Witness 2"
                role=""
                name={displayWitnessName(data.witness2Name)}
                lineLabel={data.witnessSignatureLabel}
              />
            </div>
          </div>
        </footer>

        {certificateId ? (
          <p className="jicf-cert-id">Certificate ID: {certificateId}</p>
        ) : null}
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
    --jicf-ivory: ${C.ivory};
    --jicf-ink: ${C.ink};
    --jicf-muted: ${C.muted};
    box-sizing: border-box;
    position: relative;
    width: ${JICF_WEDDING_PAGE_WIDTH_MM}mm;
    height: ${JICF_WEDDING_PAGE_HEIGHT_MM}mm;
    overflow: hidden;
    background: var(--jicf-ivory);
    color: var(--jicf-ink);
    font-family: Georgia, "Times New Roman", Times, serif;
    box-shadow: 0 12px 40px rgba(15, 3, 64, 0.18);
  }
  .jicf-wedding-page *,
  .jicf-wedding-page *::before,
  .jicf-wedding-page *::after { box-sizing: border-box; }
  .jicf-wedding-frame { pointer-events: none; position: absolute; }
  .jicf-wedding-frame-outer { inset: 4mm; border: 1.6mm solid var(--jicf-navy); }
  .jicf-wedding-frame-gold { inset: 6.2mm; border: 0.55mm solid var(--jicf-gold); }
  .jicf-wedding-frame-cream { inset: 7.4mm; background: var(--jicf-cream); }
  .jicf-wedding-frame-inner {
    inset: 8.8mm;
    border: 0.35mm solid var(--jicf-red);
    background: var(--jicf-ivory);
  }
  .jicf-wedding-inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 12mm 16mm 10mm;
  }
  .jicf-wedding-header {
    display: grid;
    grid-template-columns: 18mm 1fr 18mm;
    align-items: center;
    column-gap: 6mm;
  }
  .jicf-wedding-logo,
  .jicf-wedding-seal {
    width: 17mm;
    height: 17mm;
    object-fit: contain;
    justify-self: center;
  }
  .jicf-wedding-header-copy { min-width: 0; text-align: center; }
  .jicf-org-name {
    margin: 0;
    color: var(--jicf-navy);
    font-size: 5mm;
    font-weight: 700;
    letter-spacing: 0.22mm;
    line-height: 1.15;
    text-transform: uppercase;
  }
  .jicf-subtitle {
    margin: 1mm 0 0;
    color: var(--jicf-red);
    font-size: 3.2mm;
    font-style: italic;
    font-weight: 600;
  }
  .jicf-title-block { margin-top: 3.6mm; text-align: center; }
  .jicf-title {
    margin: 0;
    color: var(--jicf-navy);
    font-size: 8mm;
    font-weight: 700;
    letter-spacing: 0.6mm;
    line-height: 1;
    text-transform: uppercase;
  }
  .jicf-ornament {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3mm;
    margin-top: 1.8mm;
  }
  .jicf-ornament-rule {
    display: block;
    width: 28mm;
    height: 0.45mm;
    background: var(--jicf-yellow);
  }
  .jicf-ornament-mark { color: var(--jicf-gold); font-size: 3.2mm; line-height: 1; }
  .jicf-cert-lead, .jicf-oversight, .jicf-covenant {
    margin: 0;
    text-align: center;
    line-height: 1.35;
  }
  .jicf-cert-lead { margin-top: 3.4mm; font-size: 3.45mm; color: var(--jicf-ink); }
  .jicf-oversight { margin-top: 1.8mm; font-size: 3.1mm; color: var(--jicf-muted); }
  .jicf-parties {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: end;
    column-gap: 5mm;
    margin: 3.4mm 0 0;
    padding: 2.6mm 6mm 2.8mm;
    border-top: 0.35mm solid var(--jicf-gold);
    border-bottom: 0.35mm solid var(--jicf-gold);
    background: linear-gradient(180deg, rgba(239, 227, 30, 0.12), rgba(255, 253, 231, 0.65));
  }
  .jicf-party { min-width: 0; text-align: center; }
  .jicf-party-label {
    margin: 0 0 1mm;
    color: var(--jicf-navy);
    font-size: 2.4mm;
    font-weight: 700;
    letter-spacing: 0.6mm;
    text-transform: uppercase;
  }
  .jicf-party-name {
    margin: 0;
    color: var(--jicf-red);
    font-size: 6mm;
    font-style: italic;
    font-weight: 700;
    line-height: 1.15;
    overflow-wrap: anywhere;
  }
  .jicf-parties-and {
    margin: 0 0 1mm;
    color: var(--jicf-gold);
    font-size: 5.2mm;
    font-weight: 700;
  }
  .jicf-covenant {
    margin-top: 2.8mm;
    font-size: 3.05mm;
    font-style: italic;
    color: var(--jicf-muted);
  }
  .jicf-wedding-footer {
    display: grid;
    grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.15fr);
    column-gap: 7mm;
    margin-top: 3.2mm;
    flex: 1 1 auto;
    min-height: 0;
  }
  .jicf-section-title {
    margin: 0 0 1mm;
    color: var(--jicf-navy);
    font-size: 3mm;
    font-weight: 700;
    letter-spacing: 0.22mm;
    text-transform: uppercase;
  }
  .jicf-section-body {
    margin: 0 0 1.8mm;
    color: var(--jicf-ink);
    font-size: 2.6mm;
    line-height: 1.3;
  }
  .jicf-witness-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 5mm;
  }
  .jicf-sig-role, .jicf-sig-heading, .jicf-sig-line-label {
    margin: 0;
    font-size: 2.3mm;
  }
  .jicf-sig-role { color: var(--jicf-muted); font-weight: 700; }
  .jicf-sig-heading { margin-top: 0.4mm; color: var(--jicf-red); font-weight: 700; }
  .jicf-sig-name {
    margin: 0.6mm 0 0;
    min-height: 4.6mm;
    color: var(--jicf-navy);
    font-size: 3.3mm;
    font-weight: 700;
    line-height: 1.15;
    overflow-wrap: anywhere;
  }
  .jicf-sig-line { margin-top: 5.6mm; border-bottom: 0.28mm solid var(--jicf-navy); }
  .jicf-sig-line-label { margin-top: 0.8mm; color: var(--jicf-muted); font-style: italic; }
  .jicf-cert-id {
    margin: 1.6mm 0 0;
    color: var(--jicf-muted);
    font-size: 2.4mm;
    letter-spacing: 0.14mm;
    text-align: center;
  }
`;
