/**
 * Card Renderer for JICF Graduation Cards
 * Generates beautiful cards with floral designs
 */

import puppeteer from "puppeteer";
import { CardTemplate, CardElement } from "./card-templates";
import { Card } from "@prisma/client";

export interface CardData {
  id: string;
  templateId: string;
  recipientName?: string;
  customMessage?: string;
  createdAt: Date;
  // Additional fields for special cards
  serviceOutline?: string; // CSV format - each line is a service item
  eventName?: string;
  eventDate?: string;
  mcName?: string;
  graduatesList?: string; // JSON format - array of graduate objects
  meetOurGraduatesData?: string; // Detailed graduates data for the multi-page document
}

/**
 * Convert Prisma Card model to CardData interface
 */
export function cardToCardData(card: Card): CardData {
  return {
    id: card.id,
    templateId: card.templateId,
    recipientName: card.recipientName || undefined,
    customMessage: card.customMessage || undefined,
    serviceOutline: card.serviceOutline || undefined,
    eventName: card.eventName || undefined,
    eventDate: card.eventDate || undefined,
    mcName: card.mcName || undefined,
    graduatesList: card.graduatesList || undefined,
    meetOurGraduatesData: card.meetOurGraduatesData || undefined,
    createdAt: card.createdAt,
  };
}

export class CardRenderer {
  private template: CardTemplate;
  private cardData: CardData;

  constructor(template: CardTemplate, cardData: CardData) {
    this.template = template;
    this.cardData = cardData;
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
   * Generate HTML for the card (optimized for downloads)
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
          
          /* Print styles for PDF */
          @media print {
            body { 
              padding: 0; 
              background: white;
              display: block;
              min-height: auto;
            }
            .card-container {
              box-shadow: none;
              margin: 0;
              page-break-inside: avoid;
              transform: none;
            }
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
          }
          
          @page {
            size: ${settings.width}px ${settings.height}px;
            margin: 0;
          }
        </style>
      </head>
      <body>
        <div class="card-container">
          ${elementsHtml}
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Generate HTML for preview (optimized for web display)
   */ async generatePreviewHTML(): Promise<string> {
    const { settings, elements } = this.template;

    // Process elements and replace placeholders
    const processedElements = elements.map((element) =>
      this.processElement(element)
    );

    const elementsHtml = processedElements
      .map((element) => this.renderElement(element))
      .join("\n");

    // Check if this is a multi-page document (Meet Our Graduates)
    const isMultiPage =
      this.template.id === "meet-our-graduates" &&
      this.cardData.meetOurGraduatesData;

    return `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Georgia:ital,wght@0,400;0,700;1,400&family=Times+New+Roman:ital,wght@0,400;0,700;1,400&display=swap');
        
        .card-preview-container {
          position: relative;
          width: ${settings.width}px;
          ${
            isMultiPage
              ? "height: auto; min-height: " + settings.height + "px;"
              : "height: " + settings.height + "px;"
          }
          background-color: ${settings.backgroundColor};
          ${
            settings.backgroundImage
              ? `background-image: url(${settings.backgroundImage});`
              : ""
          }
          background-size: cover;
          background-position: center;
          ${isMultiPage ? "" : "border-radius: 20px;"}
          ${isMultiPage ? "" : "box-shadow: 0 10px 40px rgba(0,0,0,0.15);"}
          overflow: visible;
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
        }
        
        .card-preview-container .card-image {
          max-width: 100%;
          height: auto;
          object-fit: contain;
        }
        
        .card-preview-container svg {
          display: block;
        }
        
        /* Multi-page specific styles */
        ${
          isMultiPage
            ? `
        .card-preview-container {
          overflow: visible;
        }
        
        /* Page break styles for screen preview */
        [style*="page-break-after: always"] {
          margin-bottom: 30px;
          border-bottom: 2px dashed #ccc;
          padding-bottom: 20px;
        }
        `
            : ""
        }
      </style>
      <div class="card-preview-container">
        ${elementsHtml}
      </div>
    `;
  }

  /**
   * Process element and replace placeholders
   */ private processElement(element: CardElement): CardElement {
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

    if (content.includes("{{customMessage}}")) {
      if (this.cardData.customMessage && this.cardData.customMessage.trim()) {
        content = content.replace(
          "{{customMessage}}",
          this.cardData.customMessage
        );
      } else {
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

    if (content.includes("{{date}}")) {
      const formattedDate = this.cardData.createdAt.toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );
      content = content.replace("{{date}}", formattedDate);
    } // Handle service outline - split into individual lines
    if (content.includes("{{serviceOutlineItems}}")) {
      console.log(
        "🔍 Processing serviceOutlineItems, cardData.serviceOutline:",
        this.cardData.serviceOutline
      );
      if (this.cardData.serviceOutline && this.cardData.serviceOutline.trim()) {
        const serviceItems = this.cardData.serviceOutline
          .split("\n")
          .filter((item) => item.trim());
        console.log("🔍 Service items:", serviceItems);
        const itemsHtml = serviceItems
          .map(
            (item) =>
              `<div style="margin-bottom: 3px; padding: 4px 6px; background: rgba(255,255,255,0.08); border-radius: 3px; font-size: 12px; line-height: 1.1; border-left: 2px solid rgba(255,255,255,0.3);">${item.trim()}</div>`
          )
          .join("");
        console.log("🔍 Generated items HTML:", itemsHtml);
        content = content.replace("{{serviceOutlineItems}}", itemsHtml);
      } else {
        console.log("🔍 No service outline data found, hiding element");
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
    // Handle other event-specific fields
    if (content.includes("{{eventName}}")) {
      content = content.replace(
        "{{eventName}}",
        this.cardData.eventName || "SERVICE OUTLINE"
      );
    }

    if (content.includes("{{eventDate}}")) {
      content = content.replace(
        "{{eventDate}}",
        this.cardData.eventDate || new Date().toLocaleDateString()
      );
    }
    if (content.includes("{{mcName}}")) {
      if (this.cardData.mcName && this.cardData.mcName.trim()) {
        content = content.replace("{{mcName}}", this.cardData.mcName);
      } else {
        return {
          ...element,
          content: "",
          style: {
            ...element.style,
            display: "none",
          },
        };
      }
    } // Handle graduates list - parse formatted string and convert to HTML
    if (content.includes("{{graduatesList}}")) {
      console.log(
        "🔍 Processing graduatesList, cardData.graduatesList:",
        this.cardData.graduatesList
      );
      if (this.cardData.graduatesList && this.cardData.graduatesList.trim()) {
        try {
          // First, try to parse as JSON (new format)
          let graduates;
          if (this.cardData.graduatesList.startsWith("[")) {
            graduates = JSON.parse(this.cardData.graduatesList);
          } else {
            // Parse formatted string (current format)
            const lines = this.cardData.graduatesList
              .split("\n")
              .filter((line) => line.trim());
            graduates = lines
              .map((line) => {
                // Parse format: "1. Name • Country • University • Major"
                const match = line.match(
                  /^\d+\.\s*(.+?)\s*•\s*(.+?)\s*•\s*(.+?)\s*•\s*(.+)$/
                );
                if (match) {
                  return {
                    name: match[1].trim(),
                    country: match[2].trim(),
                    university: match[3].trim(),
                    major: match[4].trim(),
                  };
                }
                return null;
              })
              .filter(Boolean);
          }

          console.log("🔍 Parsed graduates:", graduates);
          if (Array.isArray(graduates) && graduates.length > 0) {
            const graduatesHtml = graduates
              .map((graduate, index) => {
                const name = graduate.name || graduate.Name || "N/A";
                const country = graduate.country || graduate.Country || "N/A";
                const university =
                  graduate.university || graduate.University || "N/A";
                const major =
                  graduate.major ||
                  graduate.Major ||
                  graduate.academicMajor ||
                  graduate["Academic Major"] ||
                  "N/A";

                return `<div style="margin-bottom: 6px; padding: 4px 6px; background: rgba(255,255,255,0.15); border-radius: 3px; font-size: 11px; line-height: 1.2; border-left: 2px solid rgba(255,255,255,0.5);">
                  <div style="font-weight: bold; color: #fff; margin-bottom: 1px; font-size: 12px;">${
                    index + 1
                  }. ${name}</div>
                  <div style="font-size: 9px; opacity: 0.9; color: #fff;">
                    <span style="margin-right: 10px;">🌍 ${country}</span>
                    <span style="margin-right: 10px;">🎓 ${university}</span>
                    <span>📚 ${major}</span>
                  </div>
                </div>`;
              })
              .join("");
            console.log("🔍 Generated graduates HTML:", graduatesHtml);
            content = content.replace("{{graduatesList}}", graduatesHtml);
          } else {
            console.log("🔍 No graduates data found, showing placeholder");
            content = content.replace(
              "{{graduatesList}}",
              "<div style='text-align: center; font-style: italic; opacity: 0.7;'>No graduates data available</div>"
            );
          }
        } catch (error) {
          console.error("❌ Error parsing graduates list:", error);
          console.log(
            "🔍 Raw graduatesList data:",
            this.cardData.graduatesList
          );
          content = content.replace(
            "{{graduatesList}}",
            "<div style='text-align: center; font-style: italic; opacity: 0.7; color: #ff6b6b;'>Error loading graduates data</div>"
          );
        }
      } else {
        console.log("🔍 No graduates list data found, hiding element");
        return {
          ...element,
          content: "",
          style: {
            ...element.style,
            display: "none",
          },
        };
      }
    } // Handle Meet Our Graduates - Multi-page content generation
    if (content.includes("{{meetOurGraduatesContent}}")) {
      console.log(
        "🔍 Processing meetOurGraduatesContent, cardData.meetOurGraduatesData:",
        this.cardData.meetOurGraduatesData
      );

      if (
        this.cardData.meetOurGraduatesData &&
        this.cardData.meetOurGraduatesData.trim()
      ) {
        try {
          const graduatesData = JSON.parse(this.cardData.meetOurGraduatesData);
          console.log("🔍 Parsed detailed graduates data:", graduatesData);

          if (Array.isArray(graduatesData) && graduatesData.length > 0) {
            const multiPageContent =
              this.generateMeetOurGraduatesPages(graduatesData);
            console.log(
              "🔍 Generated multi-page content length:",
              multiPageContent.length
            );
            console.log(
              "🔍 Multi-page content preview:",
              multiPageContent.substring(0, 500) + "..."
            );
            content = content.replace(
              "{{meetOurGraduatesContent}}",
              multiPageContent
            );
            console.log("🔍 Content after replacement length:", content.length);
          } else {
            console.log("🔍 No graduates data - showing placeholder");
            content = content.replace(
              "{{meetOurGraduatesContent}}",
              "<div style='text-align: center; font-style: italic; opacity: 0.7;'>No graduates data available</div>"
            );
          }
        } catch (error) {
          console.error("❌ Error parsing meet our graduates data:", error);
          content = content.replace(
            "{{meetOurGraduatesContent}}",
            "<div style='text-align: center; font-style: italic; opacity: 0.7; color: #ff6b6b;'>Error loading graduates data</div>"
          );
        }
      } else {
        console.log("🔍 No meet our graduates data found");
        content = content.replace(
          "{{meetOurGraduatesContent}}",
          "<div style='text-align: center; font-style: italic; opacity: 0.7;'>No graduates data available</div>"
        );
      }
    }

    return {
      ...element,
      content,
    };
  }

  /**
   * Generate multi-page content for Meet Our Graduates
   */
  private generateMeetOurGraduatesPages(
    graduatesData: Record<string, string | number>[]
  ): string {
    const pages: string[] = [];

    // Page 1: Cover Page with Church Information
    pages.push(this.generateChurchInfoPage());

    // Page 2: Graduation Blessing Page
    pages.push(this.generateGraduationBlessingPage());

    // Individual pages for each graduate
    graduatesData.forEach((graduate, index) => {
      pages.push(this.generateGraduateProfilePage(graduate, index + 1));
    }); // Combine all pages
    return pages.join(
      '<div style="page-break-after: always; height: 30px; border-bottom: 2px dashed #ddd; margin: 20px 0;"></div>'
    );
  }
  /**
   * Generate Church Information Page
   */
  private generateChurchInfoPage(): string {
    return `
      <div style="width: 595px; height: 842px; padding: 40px; background: linear-gradient(135deg, #0c436a 0%, #2596be 80%, #ccdce3 100%); color: white; font-family: Georgia, serif; position: relative; page-break-after: always; overflow: hidden; box-sizing: border-box;">
        <!-- JICF Logo -->
        <div style="text-align: center; margin-bottom: 25px;">
          <img src="/JICF_LOGO1.png" alt="JICF Logo" style="width: 100px; height: 50px; object-fit: contain;" />
        </div>
        
        <!-- Title -->
        <h1 style="text-align: center; font-size: 32px; margin-bottom: 30px; color: #fbbf24; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); line-height: 1.2;">
          JINAN INTERNATIONAL<br/>CHRISTIAN FELLOWSHIP
        </h1>
        
        <!-- Church Vision, Mission & Core Values -->
        <div style="background: rgba(255,255,255,0.15); padding: 20px; border-radius: 12px; margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.2);">
          <h2 style="color: #fbbf24; font-size: 20px; margin-bottom: 15px; text-align: center;">WHAT WE BELIEVE:</h2>
          <p style="font-size: 14px; line-height: 1.5; margin-bottom: 12px;">
            We are non-denominational, so we welcome all foreigners who believe in Christ to worship with us and become active members of the Fellowship. We believe in the following:
          </p>
          <ul style="font-size: 14px; line-height: 1.6; padding-left: 18px; margin: 0;">
            <li>Christ came to this earth</li>
            <li>Christ died for our sins</li>
            <li>Christ rose from the dead</li>
            <li>Christ is coming back again</li>
          </ul>
        </div>
        
        <!-- Mission and Vision -->
        <div style="background: rgba(255,255,255,0.15); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.2);">
          <h2 style="color: #fbbf24; font-size: 20px; margin-bottom: 15px; text-align: center;">MISSION AND VISION:</h2>
          <p style="font-size: 14px; line-height: 1.5; margin-bottom: 12px;">
            JICF basic mission is to provide an environment where all Christians can meet and Praise and Worship together. The secondary missions are:
          </p>
          <ul style="font-size: 13px; line-height: 1.5; padding-left: 18px; margin: 0;">
            <li>Develop leaders who can provide leadership at home or in other fellowships in China or wherever they may travel after leaving Jinan.</li>
            <li>Provide mission support for other areas of the world that may need our assistance. Presently the Fellowship assists in Kenya and Ghana via medical camp and school.</li>
            <li>Provide support and guidance both spiritually and physically for students who are away from home.</li>
          </ul>
        </div>
      </div>
    `;
  }
  /**
   * Generate Graduation Blessing Page
   */
  private generateGraduationBlessingPage(): string {
    return `
      <div style="width: 595px; height: 842px; padding: 60px 50px; background: linear-gradient(135deg, #436c87 0%, #0c436a 70%, #2c4a54 100%); color: white; font-family: Georgia, serif; text-align: center; page-break-after: always; overflow: hidden; box-sizing: border-box;">
        <!-- Decorative header -->
        <div style="margin-bottom: 50px;">
          <img src="/JICF_LOGO1.png" alt="JICF Logo" style="width: 90px; height: 45px; object-fit: contain; margin-bottom: 25px;" />
          <h1 style="font-size: 36px; color: #fbbf24; margin-bottom: 15px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); line-height: 1.2;">
            A Graduation Blessing
          </h1>
        </div>
        
        <!-- Blessing text -->
        <div style="background: rgba(255,255,255,0.15); padding: 40px; border-radius: 15px; border: 2px solid rgba(255,255,255,0.25);">
          <p style="font-size: 20px; line-height: 1.6; margin-bottom: 25px; font-weight: 300;">
            May the Lord guide your every step<br/>
            as you enter this exciting new season.<br/>
            May your gifts make room for you,<br/>
            your heart remain tender toward truth,<br/>
            and your mind stay curious and bold.
          </p>
          
          <p style="font-size: 20px; line-height: 1.6; margin-bottom: 25px; font-weight: 300;">
            Wherever you go, may you carry<br/>
            Christ's love, peace, and wisdom.
          </p>
          
          <p style="font-size: 22px; line-height: 1.6; margin-bottom: 30px; font-weight: 500; color: #fbbf24;">
            This graduation is not your finish line—<br/>
            it is your launching point.<br/>
            Go forward in faith.
          </p>
          
          <p style="font-size: 24px; line-height: 1.5; font-weight: 600; color: #fbbf24; margin-bottom: 25px;">
            We are proud of you.<br/>
            We are praying for you.
          </p>
          
          <p style="font-size: 28px; margin-top: 30px; font-weight: bold; color: #fbbf24; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">
            Congratulations, Graduate!
          </p>
        </div>
      </div>
    `;
  }
  /**
   * Generate individual graduate profile page
   */
  private generateGraduateProfilePage(
    graduate: Record<string, string | number>,
    graduateNumber: number
  ): string {
    const {
      Name = "N/A",
      Country = "N/A",
      University = "N/A",
      "Academic Major": academicMajor = "N/A",
      Email = "N/A",
      Phone = "N/A",
      "Position(s) Held at JICF": position = "N/A",
      "Message from the graduates": message = "",
      "Number of Pictures": numPictures = 0,
    } = graduate;

    // Generate image array based on number of pictures
    const images = [];
    const numPics = Math.min(parseInt(String(numPictures)) || 0, 3); // Allow up to 3 images

    // Just create placeholder entries, the actual paths will be determined in the mapping function
    for (let i = 0; i < numPics; i++) {
      images.push(`placeholder-${i}`);
    }
    return `
      <div style="width: 595px; height: 842px; padding: 35px; background: linear-gradient(135deg, #2596be 0%, #0c436a 60%, #436c87 100%); color: white; font-family: Arial, sans-serif; page-break-after: always; overflow: hidden; box-sizing: border-box;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 25px;">
          <img src="/JICF_LOGO1.png" alt="JICF Logo" style="width: 70px; height: 35px; object-fit: contain; margin-bottom: 12px;" />
          <h1 style="font-size: 24px; color: #fbbf24; margin: 0; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">
            Meet Our Graduate
          </h1>
        </div>
        
        <!-- Graduate Photos Section -->
        <div style="display: flex; justify-content: center; gap: 15px; margin-bottom: 25px; min-height: 160px;">          ${images
          .map((imagePath, index) => {
            // Map exact file names as they exist in public/graduates/
            const getActualImagePaths = (
              graduateNum: number,
              picIndex: number
            ): string[] => {
              const paths = [];

              // Build exact paths based on the actual file naming patterns
              switch (graduateNum) {
                case 1:
                  if (picIndex === 0)
                    paths.push("/graduates/1-1-standing with certificate.JPG");
                  break;
                case 2:
                  if (picIndex === 0)
                    paths.push("/graduates/2-1-standing in gown.jpg");
                  break;
                case 3:
                  if (picIndex === 0)
                    paths.push("/graduates/3-1-standing in medical gown.png");
                  break;
                case 4:
                  if (picIndex === 0)
                    paths.push("/graduates/4-1-passport size pic.jpeg");
                  if (picIndex === 1)
                    paths.push("/graduates/4-2 standing in gown.jpg");
                  if (picIndex === 2)
                    paths.push("/graduates/4-3-standing in gown.jpg");
                  break;
                case 5:
                  if (picIndex === 0)
                    paths.push("/graduates/5-1- sitting in gown.jpg");
                  if (picIndex === 1)
                    paths.push("/graduates/5-2-standing in gown.jpg");
                  break;
                case 6:
                  if (picIndex === 0)
                    paths.push("/graduates/6-1-standing in gown.jpeg");
                  if (picIndex === 1)
                    paths.push("/graduates/6-2-standing in gown.jpeg");
                  break;
                case 7:
                  if (picIndex === 0) paths.push("/graduates/7-1-potrait.jpg");
                  if (picIndex === 1) paths.push("/graduates/7-2-standing.jpg");
                  break;
                case 8:
                  if (picIndex === 0)
                    paths.push("/graduates/8-1-standing in gown.jpeg");
                  break;
                case 9:
                  if (picIndex === 0)
                    paths.push(
                      "/graduates/9-1-standing with diploma and cap.jpg"
                    );
                  if (picIndex === 1)
                    paths.push(
                      "/graduates/9-2-sitting-with gown and diploma.jpg"
                    );
                  break;
                case 10:
                  if (picIndex === 0)
                    paths.push("/graduates/10-1- potrait-standing.jpg");
                  if (picIndex === 1)
                    paths.push("/graduates/10-2- potrait sitting.jpg");
                  break;
              }

              return paths;
            };

            const actualPaths = getActualImagePaths(graduateNumber, index);
            const primaryImagePath = actualPaths[0];

            if (!primaryImagePath) {
              // No image for this index, return empty string
              return "";
            }
            return `
              <div style="flex: 1; max-width: 150px; text-align: center;">
                <div style="width: 140px; height: 150px; background: rgba(255,255,255,0.15); border-radius: 10px; border: 2px solid rgba(251, 191, 36, 0.4); display: flex; align-items: center; justify-content: center; margin: 0 auto; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                  <img
                    src="${primaryImagePath}" 
                    alt="${Name} - Photo ${index + 1}" 
                    style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
                  />
                  <div style="color: rgba(255,255,255,0.8); font-size: 11px; text-align: center; display: none; background: rgba(0,0,0,0.6); padding: 8px; border-radius: 6px;">
                    Photo ${index + 1}<br/>
                    Graduate #${graduateNumber}
                  </div>
                </div>
              </div>
            `;
          })
          .join("")}
        </div>
          <!-- Graduate Information -->
        <div style="background: rgba(255,255,255,0.2); padding: 20px; border-radius: 12px; margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.3); backdrop-filter: blur(10px);">
          <h2 style="font-size: 20px; color: #fbbf24; margin-bottom: 15px; text-align: center; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">
            ${Name}
          </h2>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 13px; line-height: 1.4;">
            <div><strong style="color: #fbbf24;">Country:</strong> ${Country}</div>
            <div><strong style="color: #fbbf24;">University:</strong> ${University}</div>
            <div style="grid-column: 1 / -1;"><strong style="color: #fbbf24;">Academic Major:</strong> ${academicMajor}</div>
            <div><strong style="color: #fbbf24;">Email:</strong> ${Email}</div>
            <div><strong style="color: #fbbf24;">Phone:</strong> ${Phone}</div>
            <div style="grid-column: 1 / -1;"><strong style="color: #fbbf24;">Position at JICF:</strong> ${position}</div>
          </div>
        </div>
        
        <!-- Graduate Message -->
        ${
          message
            ? `
          <div style="background: rgba(255,255,255,0.15); padding: 18px; border-radius: 10px; border-left: 4px solid #fbbf24; border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(5px);">
            <h3 style="color: #fbbf24; font-size: 16px; margin-bottom: 12px; text-align: center;">Message from the Graduate</h3>
            <p style="font-size: 13px; line-height: 1.5; font-style: italic; text-align: center;">
              "${message}"
            </p>
          </div>
        `
            : ""
        }
      </div>
    `;
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
        const absoluteImageUrl = this.getAbsoluteUrl(content);
        return `<img id="${id}" class="card-element card-image" src="${absoluteImageUrl}" alt="Card Image" style="${styleString}" />`;
      case "decoration":
        return `<div id="${id}" class="card-element" style="${styleString}">${content}</div>`;

      default:
        return `<div id="${id}" class="card-element" style="${styleString}">${content}</div>`;
    }
  }

  /**
   * Build CSS style string from position and style
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
          "--disable-web-security",
          "--allow-running-insecure-content",
        ],
      });

      page = await browser.newPage();

      await page.setViewport({
        width: this.template.settings.width,
        height: this.template.settings.height,
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
      }); // Wait a bit more for rendering
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if this is multi-page content and capture accordingly
      const pageHtml = await page.content();
      const isMultiPage = pageHtml.includes("page-break-after: always");

      let screenshot;
      if (isMultiPage) {
        // For multi-page content, capture the full page
        screenshot = await page.screenshot({
          type: "png",
          fullPage: true,
          omitBackground: false,
        });
      } else {
        // For single-page content, use exact card dimensions
        screenshot = await page.screenshot({
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
      }

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
          "--disable-web-security",
          "--allow-running-insecure-content",
        ],
      });

      page = await browser.newPage();

      await page.setViewport({
        width: this.template.settings.width,
        height: this.template.settings.height,
        deviceScaleFactor: 2,
      });

      await page.setContent(html, {
        waitUntil: ["load", "domcontentloaded", "networkidle0"],
        timeout: 30000,
      });

      // Wait for fonts and rendering
      await page.evaluate(() => {
        if ("fonts" in document) {
          return (document as unknown as { fonts: { ready: Promise<unknown> } })
            .fonts.ready;
        }
        return Promise.resolve();
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate PDF with appropriate settings for multi-page content
      const isMultiPage = html.includes("page-break-after: always");

      let pdf;
      if (isMultiPage) {
        // For multi-page content, use A4 size and allow natural page breaks
        pdf = await page.pdf({
          format: "A4",
          printBackground: true,
          margin: { top: 0, right: 0, bottom: 0, left: 0 },
          preferCSSPageSize: false,
        });
      } else {
        // For single-page content, use exact template dimensions
        pdf = await page.pdf({
          width: `${this.template.settings.width}px`,
          height: `${this.template.settings.height}px`,
          printBackground: true,
          margin: { top: 0, right: 0, bottom: 0, left: 0 },
          preferCSSPageSize: true,
        });
      }

      return Buffer.from(pdf);
    } finally {
      if (page) await page.close();
      if (browser) await browser.close();
    }
  }
}

/**
 * Enhanced FOM Church Color Scheme for "Meet Our Graduates" Cards
 *
 * This implementation uses the official Fishers of Men church color palette:
 * - Primary: #0c436a (Deep Blue) - Main brand color
 * - Secondary: #2596be (Light Blue) - Supporting color
 * - Accent: #436c87 (Medium Blue) - For variety
 * - Accent-1: #2c4a54 (Darker variant) - For contrast
 * - Light Blue: #ccdce3 (Very Light Blue) - For highlights
 * - Gold: #fbbf24 (Yellow/Gold) - For text highlights and accents
 *
 * Background Gradients:
 * - Church Info Page: Deep blue to light blue (#0c436a → #2596be → #ccdce3)
 * - Blessing Page: Medium blue to deep blue to darker accent (#436c87 → #0c436a → #2c4a54)
 * - Graduate Profile: Light blue to deep blue to medium blue (#2596be → #0c436a → #436c87)
 *
 * Key improvements:
 * - Better contrast and readability
 * - More sophisticated glass-morphism effects with backdrop-filter
 * - Enhanced borders and shadows for elegance
 * - Gold accents for important text elements
 * - Consistent FOM branding throughout all pages
 */
