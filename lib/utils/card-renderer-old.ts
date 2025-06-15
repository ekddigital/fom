/**
 * Card Renderer for JICF Graduation Cards
 * Generates beautiful cards with floral designs
 */

import puppeteer from "puppeteer";
import { CardTemplate, CardElement } from "./card-templates";

export interface CardData {
  id: string;
  templateId: string;
  recipientName?: string;
  customMessage?: string;
  createdAt: Date;
}

export class CardRenderer {
  private template: CardTemplate;
  private cardData: CardData;

  constructor(template: CardTemplate, cardData: CardData) {
    this.template = template;
    this.cardData = cardData;
  }
  /**
   * Generate HTML for the card
   */
  async generateHTML(): Promise<string> {
    const { settings, elements } = this.template;

    // Process elements and replace placeholders
    const processedElements = elements.map((element) =>
      this.processElement(element)
    );

    const elementsHtml = processedElements
      .map((element) => this.renderElement(element))
      .join("\n");

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>JICF Graduation Card - ${this.cardData.id}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Georgia:ital,wght@0,400;0,700;1,400&family=Times+New+Roman:ital,wght@0,400;0,700;1,400&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Georgia', serif;
            background: transparent;
            padding: 0;
            margin: 0;
            width: ${settings.width}px;
            height: ${settings.height}px;
            overflow: hidden;
          }
          
          .card-container {
            position: relative;
            width: ${settings.width}px;
            height: ${settings.height}px;
            background-color: ${settings.backgroundColor};
            ${
              settings.backgroundImage
                ? `background-image: url(${this.getAbsoluteUrl(
                    settings.backgroundImage
                  )});`
                : ""
            }
            background-size: cover;
            background-position: center;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.15);
            overflow: hidden;
            margin: 0;
            padding: 0;
          }
          
          .card-element {
            position: absolute;
            box-sizing: border-box;
          }
          
          .card-text {
            word-wrap: break-word;
            overflow-wrap: break-word;
            hyphens: auto;
          }
          
          .card-image {
            max-width: 100%;
            height: auto;
            object-fit: contain;
          }
          
          /* Ensure floral SVGs render properly */
          svg {
            display: block;
          }
          
          /* Remove any hover effects for downloads */
          .card-container:hover {
            transform: none;
          }
        </style>
      </head>
      <body>
        <div class="card-container">
          ${elementsHtml}        </div>
      </body>
      </html>
    `;
  }
  /**
   * Convert relative URLs to absolute URLs for downloads
   */
  private getAbsoluteUrl(url: string): string {
    if (url.startsWith("http")) {
      return url;
    }
    // For local images, use the full URL
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    return `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
  }

  /**
   * Generate HTML for preview (optimized for embedding)
   */
  async generatePreviewHTML(): Promise<string> {
    const { settings, elements } = this.template;

    // Process elements and replace placeholders
    const processedElements = elements.map((element) =>
      this.processElement(element)
    );

    const elementsHtml = processedElements
      .map((element) => this.renderElement(element))
      .join("\n");

    return `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Georgia:ital,wght@0,400;0,700;1,400&family=Times+New+Roman:ital,wght@0,400;0,700;1,400&display=swap');
        
        .card-preview-container {
          position: relative;
          width: ${settings.width}px;
          height: ${settings.height}px;
          background-color: ${settings.backgroundColor};
          ${
            settings.backgroundImage
              ? `background-image: url(${settings.backgroundImage});`
              : ""
          }
          background-size: cover;
          background-position: center;
          border-radius: 20px;
          overflow: hidden;
          font-family: 'Georgia', serif;
          margin: 0 auto;
        }
        
        .card-preview-container .card-element {
          position: absolute;
          box-sizing: border-box;
        }
        
        .card-preview-container .card-text {
          word-wrap: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .card-preview-container .card-image {
          max-width: 100%;
          height: auto;
          object-fit: contain;
        }
        
        .card-preview-container .card-decoration {
          pointer-events: none;
        }
      </style>
      <div class="card-preview-container">
        ${elementsHtml}
      </div>
    `;
  }

  /**
   * Process element and replace placeholders
   */
  private processElement(element: CardElement): CardElement {
    let content = element.content;

    // Replace placeholders
    if (content.includes("{{recipientName}}")) {
      // Only show recipient name if it's provided and not empty
      if (this.cardData.recipientName && this.cardData.recipientName.trim()) {
        content = content.replace(
          "{{recipientName}}",
          this.cardData.recipientName
        );
      } else {
        // If no recipient name, hide this element by making it transparent
        return {
          ...element,
          content: "",
          style: {
            ...element.style,
            display: "none",
          },
        };
      }
    }

    return {
      ...element,
      content,
    };
  }

  /**
   * Render individual element to HTML
   */
  private renderElement(element: CardElement): string {
    const { id, type, content, position, style } = element;
    if (!content || style?.display === "none") {
      return "";
    }

    const styleString = this.buildStyleString(position, style);

    switch (type) {
      case "text":
        return `<div id="${id}" class="card-element card-text" style="${styleString}">${content}</div>`;

      case "image":
        return `<img id="${id}" class="card-element card-image" src="${content}" alt="${id}" style="${styleString}" />`;

      case "decoration":
        if (content.startsWith("<svg") || content.startsWith("<div")) {
          return `<div id="${id}" class="card-element card-decoration" style="${styleString}">${content}</div>`;
        } else {
          return `<div id="${id}" class="card-element card-decoration" style="${styleString}; background-image: url(${content});"></div>`;
        }

      default:
        return `<div id="${id}" class="card-element" style="${styleString}">${content}</div>`;
    }
  }

  /**
   * Build CSS style string from position and style objects
   */
  private buildStyleString(
    position: CardElement["position"],
    style: CardElement["style"]
  ): string {
    const styles: string[] = [
      `left: ${position.x}px`,
      `top: ${position.y}px`,
      `width: ${position.width}px`,
      `height: ${position.height}px`,
    ];

    if (style.fontSize) styles.push(`font-size: ${style.fontSize}px`);
    if (style.fontFamily) styles.push(`font-family: ${style.fontFamily}`);
    if (style.fontWeight) styles.push(`font-weight: ${style.fontWeight}`);
    if (style.fontStyle) styles.push(`font-style: ${style.fontStyle}`);
    if (style.color) styles.push(`color: ${style.color}`);
    if (style.textAlign) styles.push(`text-align: ${style.textAlign}`);
    if (style.lineHeight) styles.push(`line-height: ${style.lineHeight}`);
    if (style.letterSpacing)
      styles.push(`letter-spacing: ${style.letterSpacing}`);
    if (style.transform) styles.push(`transform: ${style.transform}`);
    if (style.opacity !== undefined) styles.push(`opacity: ${style.opacity}`);
    if (style.zIndex !== undefined) styles.push(`z-index: ${style.zIndex}`);
    if (style.border) styles.push(`border: ${style.border}`);
    if (style.borderRadius) styles.push(`border-radius: ${style.borderRadius}`);
    if (style.padding) styles.push(`padding: ${style.padding}`);

    return styles.join("; ");
  }
  /**
   * Generate PNG image of the card
   */
  async generatePNG(): Promise<Buffer> {
    const html = await this.generateHTML();

    let browser;
    let page;

    try {
      browser = await puppeteer.launch({
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-gpu",
        ],
      });

      page = await browser.newPage();

      await page.setViewport({
        width: this.template.settings.width + 100,
        height: this.template.settings.height + 100,
        deviceScaleFactor: 2,
      });

      await page.setContent(html, {
        waitUntil: ["load", "domcontentloaded", "networkidle0"],
        timeout: 30000,
      });

      // Wait for any fonts to load
      await page.evaluate(() => {
        if ("fonts" in document) {
          return (document as unknown as { fonts: { ready: Promise<unknown> } })
            .fonts.ready;
        }
        return Promise.resolve();
      });

      // Take screenshot
      const screenshot = await page.screenshot({
        type: "png",
        fullPage: false,
        clip: {
          x: 0,
          y: 0,
          width: this.template.settings.width,
          height: this.template.settings.height,
        },
        omitBackground: false,
      });

      return Buffer.from(screenshot);
    } finally {
      if (page) await page.close();
      if (browser) await browser.close();
    }
  }

  /**
   * Generate PDF of the card
   */
  async generatePDF(): Promise<Buffer> {
    const html = await this.generateHTML();

    let browser;
    let page;

    try {
      browser = await puppeteer.launch({
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-gpu",
        ],
      });

      page = await browser.newPage();

      await page.setViewport({
        width: this.template.settings.width + 100,
        height: this.template.settings.height + 100,
        deviceScaleFactor: 2,
      });

      await page.setContent(html, {
        waitUntil: ["load", "domcontentloaded"],
        timeout: 30000,
      });

      // Wait for fonts
      await page.evaluate(() => {
        if ("fonts" in document) {
          return (document as unknown as { fonts: { ready: Promise<unknown> } })
            .fonts.ready;
        }
        return Promise.resolve();
      });

      // Generate PDF
      const pdf = await page.pdf({
        width: `${this.template.settings.width}px`,
        height: `${this.template.settings.height}px`,
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
      });

      return Buffer.from(pdf);
    } finally {
      if (page) await page.close();
      if (browser) await browser.close();
    }
  }
}
