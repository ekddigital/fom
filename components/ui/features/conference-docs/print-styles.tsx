"use client";

export function ConferencePrintStyles() {
  return (
    <style jsx global>{`
      @page {
        size: A4 portrait;
        margin: 0;
      }

      .fom-export-source {
        position: fixed;
        top: 0;
        left: -200vw;
        width: 210mm;
        pointer-events: none;
        z-index: -1;
      }

      .a4-stack {
        display: grid;
        gap: 1rem;
      }

      .a4-page {
        --a4-side-margin: 14mm;
        --a4-top-margin: 14mm;
        --a4-bottom-margin: 22mm;

        position: relative;
        width: 100%;
        max-width: 210mm;
        min-height: 297mm;
        margin: 0 auto;
        border: 1px solid rgb(203 213 225);
        border-radius: 0.75rem;
        background: white;
        box-shadow: 0 1px 2px rgb(0 0 0 / 0.08);
      }

      .a4-page-body {
        padding: var(--a4-top-margin) var(--a4-side-margin)
          var(--a4-bottom-margin);
      }

      .a4-page-header {
        position: absolute;
        top: 7mm;
        left: var(--a4-side-margin);
        width: calc(100% - (var(--a4-side-margin) * 2));
        right: auto;
        border-bottom: 2px solid rgb(12 67 106 / 0.7);
        padding-bottom: 2mm;
        text-align: center;
        box-sizing: border-box;
      }

      .a4-page-header-scripture {
        font-size: 10px;
        font-style: italic;
        color: rgb(71 85 105);
      }

      .a4-page-footer {
        position: absolute;
        bottom: 7mm;
        left: var(--a4-side-margin);
        width: calc(100% - (var(--a4-side-margin) * 2));
        right: auto;
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: flex-end;
        gap: 0.75rem;
        border-top: 2px solid rgb(12 67 106 / 0.7);
        padding-top: 2mm;
        font-size: 11px;
        color: rgb(100 116 139);
        box-sizing: border-box;
      }

      .a4-page-footer-note {
        justify-self: start;
      }

      .a4-page-footer-page {
        justify-self: end;
      }

      .a4-page-footer-scripture {
        justify-self: center;
        text-align: center;
        font-size: 10px;
        font-style: italic;
        color: rgb(71 85 105);
      }

      .a4-page--word {
        --a4-side-margin: 25.4mm;
        --a4-top-margin: 25.4mm;
        --a4-bottom-margin: 25.4mm;
      }

      .a4-page--word .a4-page-header {
        top: 12.7mm;
      }

      .a4-page--word .a4-page-footer {
        bottom: 12.7mm;
      }

      @media print {
        .fom-print-hide {
          display: none !important;
        }

        .fom-screen-hide {
          display: block !important;
        }

        .fom-preview-screen {
          display: none !important;
        }

        .fom-export-source {
          position: static !important;
          top: auto !important;
          left: auto !important;
          width: auto !important;
          pointer-events: auto !important;
          z-index: auto !important;
        }

        .a4-stack {
          display: block !important;
          gap: 0 !important;
        }

        .a4-page {
          width: 210mm !important;
          min-height: 297mm !important;
          max-width: none !important;
          margin: 0 auto !important;
          border: 0 !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          page-break-after: always;
          break-after: page;
        }

        .a4-page--word {
          --a4-side-margin: 25.4mm !important;
          --a4-top-margin: 25.4mm !important;
          --a4-bottom-margin: 25.4mm !important;
        }

        .a4-page:last-child {
          page-break-after: auto;
          break-after: auto;
        }

        .fom-print-root {
          max-width: none !important;
          margin: 0 !important;
          border: 0 !important;
          border-radius: 0 !important;
          padding: 0 !important;
          box-shadow: none !important;
        }
      }
    `}</style>
  );
}
