import {
  JICF_CHURCH_ADDRESS,
  JICF_WEDDING_COLORS as C,
  type JicfWeddingCertificateData,
} from "@/lib/jicf/wedding-certificate-data";

const PASTOR_SIGNATURE_SRC = "/pastor_Joe_signaturepng.png";

export const JICF_WEDDING_PAGE_WIDTH_MM = 297;
export const JICF_WEDDING_PAGE_HEIGHT_MM = 210;

function HandSignature({
  name,
  label,
  reserveName = false,
}: {
  name: string;
  label: string;
  reserveName?: boolean;
}) {
  const shown = name.trim();
  return (
    <div className="jicf-hand-sign">
      {shown ? (
        <p className="jicf-hand-name">{shown}</p>
      ) : reserveName ? (
        <p className="jicf-hand-name" aria-hidden="true">
          {"\u00a0"}
        </p>
      ) : null}
      <div className="jicf-sign-space" aria-hidden="true" />
      <div className="jicf-sig-line" aria-hidden="true" />
      <p className="jicf-sig-line-label">{label}</p>
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
  const churchAddress = data.churchAddress.trim() || JICF_CHURCH_ADDRESS;
  const wife = data.brideName.trim() || "Miss Ruphine Manaweh Harmon";
  const husband = data.groomName.trim() || "Mr. Joshua Bosco Barvor";
  const pastorDate = `${day.replace(/(st|nd|rd|th)$/i, "")} ${month} ${year}`.trim();
  const officiant = data.officiantName.trim() || "Joseph Summers";
  const pastorName = /^pastor\b/i.test(officiant)
    ? officiant
    : `Pastor ${officiant}`;
  const org =
    data.organizationName.trim() || "Jinan International Christian Fellowship";

  return (
    <article
      className="jicf-wedding-page"
      aria-label={`${data.title} — ${data.organizationName}`}
    >
      <div className="jicf-wedding-frame jicf-wedding-frame-inner" />

      <div className="jicf-wedding-inner">
        <header className="jicf-wedding-header">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/JICF_LOGO1.png" alt="JICF" className="jicf-wedding-logo" />
          <div className="jicf-wedding-header-copy">
            <p className="jicf-org-name">{org}</p>
            <p className="jicf-place">{churchAddress}</p>
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

        <div className="jicf-cert-body">
          <p className="jicf-cert-lead">
            This is to certify that on the <strong>{day}</strong> day of{" "}
            <strong>{month}</strong>, <strong>{year}</strong>, a sacred marriage
            ceremony was solemnly officiated and completed in{" "}
            <strong>{location}</strong>.
          </p>
          <p className="jicf-oversight">
            The holy matrimony was celebrated under the authority and pastoral
            oversight of {org}, uniting the below two persons in lawful and
            sacred marriage before God and witnesses.
          </p>
          <p className="jicf-party-name">{husband}</p>
          <p className="jicf-party-name">{wife}</p>
          <p className="jicf-covenant">{data.covenantText}</p>
        </div>

        <footer className="jicf-sign-layout">
          <div className="jicf-sign-couples">
            <HandSignature name="" label="(Husband's signature)" />
            <HandSignature name="" label="(Wife's signature)" />
          </div>
          <div className="jicf-sign-witnesses">
            <HandSignature name="" label="(Witness 1)" />
            <HandSignature name="" label="(Witness 2)" />
          </div>
          <div className="jicf-sign-pastor">
            <p className="jicf-sign-note">
              This marriage was celebrated between us
            </p>
            <p className="jicf-presence">In the Presence of</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PASTOR_SIGNATURE_SRC}
              alt="Signature of Pastor Joseph Summers"
              className="jicf-pastor-signature"
            />
            <p className="jicf-pastor-name">{pastorName}</p>
            <p className="jicf-pastor-role">(Officiating Minister)</p>
            <p className="jicf-sig-date">{pastorDate}</p>
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
    background: #fffef8;
    color: var(--jicf-ink);
    font-family: Georgia, "Times New Roman", Times, serif;
    box-shadow: 0 12px 40px rgba(25, 5, 112, 0.18);
  }
  .jicf-wedding-page *,
  .jicf-wedding-page *::before,
  .jicf-wedding-page *::after { box-sizing: border-box; }
  .jicf-wedding-frame { pointer-events: none; position: absolute; }
  .jicf-wedding-frame-inner {
    inset: 3.2mm;
    border: 4.2mm solid var(--jicf-red);
    background: #fffef8;
  }
  .jicf-wedding-inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    padding: 8mm 12mm 9mm;
  }
  .jicf-wedding-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 6mm;
    margin-left: -3mm;
  }
  .jicf-wedding-logo {
    width: 38mm;
    height: 38mm;
    object-fit: contain;
    flex: 0 0 auto;
  }
  .jicf-wedding-header-copy { min-width: 0; text-align: center; }
  .jicf-org-name {
    margin: 0;
    color: var(--jicf-navy);
    font-size: 6.8mm;
    font-weight: 700;
    letter-spacing: 0.04mm;
    line-height: 1.12;
    text-transform: uppercase;
  }
  .jicf-place {
    margin: 1.2mm auto 0;
    max-width: 220mm;
    color: var(--jicf-navy);
    font-size: 4.4mm;
    font-weight: 700;
    line-height: 1.25;
  }
  .jicf-subtitle {
    margin: 1.4mm 0 0;
    color: var(--jicf-red);
    font-size: 4.8mm;
    font-style: italic;
    font-weight: 700;
  }
  .jicf-title-block { margin-top: 0; text-align: center; }
  .jicf-title {
    margin: 0;
    color: var(--jicf-navy);
    font-size: 9.6mm;
    font-weight: 700;
    letter-spacing: 0.06mm;
    line-height: 1.05;
    text-transform: uppercase;
  }
  .jicf-ornament { display: flex; justify-content: center; margin-top: 1.4mm; }
  .jicf-ornament-rule {
    display: block;
    width: 70mm;
    height: 0.7mm;
    background: var(--jicf-gold);
    border-radius: 1mm;
  }
  .jicf-cert-id {
    margin: 1.2mm 0 0;
    color: var(--jicf-navy);
    font-size: 4.4mm;
    font-weight: 700;
    letter-spacing: 0;
    text-align: center;
  }
  .jicf-cert-body { margin-top: 0; text-align: center; }
  .jicf-cert-lead {
    margin: 0 6mm;
    color: var(--jicf-ink);
    font-size: 4.8mm;
    line-height: 1.32;
  }
  .jicf-cert-lead strong { font-weight: 700; }
  .jicf-oversight {
    margin: 1.2mm 6mm 0;
    color: var(--jicf-ink);
    font-size: 4.6mm;
    line-height: 1.32;
  }
  .jicf-party-name {
    margin: 1mm 0 0;
    color: var(--jicf-red);
    font-size: 5.8mm;
    font-style: italic;
    font-weight: 700;
    line-height: 1.15;
  }
  .jicf-covenant {
    margin: 1.2mm 6mm 0;
    color: var(--jicf-navy);
    font-size: 4.6mm;
    font-style: italic;
    line-height: 1.32;
  }
  .jicf-sign-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "couple witnesses"
      "pastor pastor";
    column-gap: 16mm;
    row-gap: 3mm;
    align-items: start;
    margin-top: 0;
    padding-bottom: 0;
  }
  .jicf-sign-note {
    margin: 0 0 1.2mm;
    color: var(--jicf-ink);
    font-size: 4.4mm;
    line-height: 1.25;
    text-align: center;
  }
  .jicf-sign-couples {
    grid-area: couple;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2mm;
  }
  .jicf-sign-witnesses {
    grid-area: witnesses;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2mm;
    min-width: 0;
  }
  .jicf-sign-pastor {
    grid-area: pastor;
    text-align: center;
  }
  .jicf-presence {
    margin: 0;
    color: var(--jicf-ink);
    font-size: 4.4mm;
    font-style: italic;
  }
  .jicf-hand-sign { width: 72mm; max-width: 100%; text-align: center; }
  .jicf-sign-witnesses .jicf-hand-sign { width: 64mm; }
  .jicf-hand-name {
    margin: 0;
    color: var(--jicf-navy);
    font-size: 3.5mm;
    font-weight: 700;
    line-height: 1.15;
  }
  .jicf-sign-space { height: 6mm; }
  .jicf-sig-line { border-bottom: 0.35mm solid var(--jicf-navy); }
  .jicf-sig-line-label {
    margin: 0.8mm 0 0;
    color: var(--jicf-muted);
    font-size: 4.2mm;
    font-style: italic;
  }
  .jicf-sig-role {
    margin: 0;
    color: var(--jicf-navy);
    font-size: 3.2mm;
    font-weight: 700;
    letter-spacing: 0.12mm;
    text-transform: uppercase;
  }
  .jicf-sig-body {
    margin: 0.8mm 0 0;
    color: var(--jicf-ink);
    font-size: 3.1mm;
    line-height: 1.28;
  }
  .jicf-pastor-testimony { margin-left: auto; margin-right: auto; max-width: 170mm; }
  .jicf-pastor-signature {
    display: block;
    height: 11mm;
    width: auto;
    max-width: 52mm;
    margin: 0.6mm auto 0;
    object-fit: contain;
  }
  .jicf-pastor-name {
    margin: 0.8mm 0 0;
    color: var(--jicf-navy);
    font-size: 5mm;
    font-weight: 700;
  }
  .jicf-pastor-role {
    margin: 0.3mm 0 0;
    color: var(--jicf-navy);
    font-size: 4.2mm;
    font-style: italic;
  }
  .jicf-sig-date {
    margin: 0.3mm 0 0;
    color: var(--jicf-navy);
    font-size: 4.4mm;
    font-weight: 700;
  }
`;
