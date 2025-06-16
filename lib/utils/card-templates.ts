/**
 * JICF Graduation Card Templates
 * Beautiful, elegant card designs with flowers for graduation celebrations
 */

export interface CardElement {
  id: string;
  type: "text" | "image" | "decoration";
  content: string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  style: {
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: string;
    fontStyle?: string;
    color?: string;
    textAlign?: "left" | "center" | "right";
    lineHeight?: number;
    letterSpacing?: string;
    transform?: string;
    opacity?: number;
    zIndex?: number;
    border?: string;
    borderRadius?: string;
    padding?: string;
    display?: string;
  };
}

export interface CardTemplate {
  id: string;
  name: string;
  description: string;
  category: "graduation" | "appreciation" | "blessing" | "invitation";
  elements: CardElement[];
  settings: {
    width: number;
    height: number;
    backgroundColor: string;
    backgroundImage?: string;
  };
}

// JICF Brand Colors
export const JICF_COLORS = {
  red: "#ed1c24",
  blue: "#190570",
  yellow: "#efe31e",
  white: "#ffffff",
  lightGray: "#f8f9fa",
  darkGray: "#343a40",
  gold: "#ffd700",
  lightBlue: "#e3f2fd",
  lightRed: "#ffebee",
  lightYellow: "#fffde7",
  purple: "#8e24aa",
  green: "#4caf50",
  darkBlue: "#0d47a1",
};

// Beautiful floral SVG decorations
export const FLORAL_DECORATIONS = {
  roseCorner: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.7">
      <!-- Rose petals -->
      <path d="M20,50 Q30,30 50,40 Q70,30 80,50 Q70,70 50,60 Q30,70 20,50" fill="${JICF_COLORS.red}" opacity="0.8"/>
      <path d="M25,50 Q35,35 50,45 Q65,35 75,50 Q65,65 50,55 Q35,65 25,50" fill="${JICF_COLORS.red}" opacity="0.6"/>
      <path d="M30,50 Q40,40 50,50 Q60,40 70,50 Q60,60 50,50 Q40,60 30,50" fill="${JICF_COLORS.red}" opacity="0.4"/>
      <!-- Leaves -->
      <path d="M15,60 Q25,70 35,65 Q30,55 15,60" fill="#4caf50" opacity="0.6"/>
      <path d="M65,35 Q75,25 85,30 Q80,40 65,35" fill="#4caf50" opacity="0.6"/>
      <!-- Stems -->
      <line x1="50" y1="50" x2="45" y2="80" stroke="#4caf50" stroke-width="2" opacity="0.6"/>
    </g>
  </svg>`,

  floralBorder: `<svg viewBox="0 0 400 50" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.6">
      <!-- Repeating floral pattern -->
      <g>
        <circle cx="25" cy="25" r="8" fill="${JICF_COLORS.yellow}" opacity="0.7"/>
        <circle cx="20" cy="20" r="6" fill="${JICF_COLORS.red}" opacity="0.8"/>
        <path d="M15,25 Q25,15 35,25 Q25,35 15,25" fill="#4caf50" opacity="0.6"/>
      </g>
      <g transform="translate(80,0)">
        <circle cx="25" cy="25" r="8" fill="${JICF_COLORS.red}" opacity="0.7"/>
        <circle cx="30" cy="20" r="6" fill="${JICF_COLORS.yellow}" opacity="0.8"/>
        <path d="M15,25 Q25,15 35,25 Q25,35 15,25" fill="#4caf50" opacity="0.6"/>
      </g>
      <g transform="translate(160,0)">
        <circle cx="25" cy="25" r="8" fill="${JICF_COLORS.blue}" opacity="0.7"/>
        <circle cx="20" cy="30" r="6" fill="${JICF_COLORS.yellow}" opacity="0.8"/>
        <path d="M15,25 Q25,15 35,25 Q25,35 15,25" fill="#4caf50" opacity="0.6"/>
      </g>
      <g transform="translate(240,0)">
        <circle cx="25" cy="25" r="8" fill="${JICF_COLORS.yellow}" opacity="0.7"/>
        <circle cx="30" cy="30" r="6" fill="${JICF_COLORS.red}" opacity="0.8"/>
        <path d="M15,25 Q25,15 35,25 Q25,35 15,25" fill="#4caf50" opacity="0.6"/>
      </g>
      <g transform="translate(320,0)">
        <circle cx="25" cy="25" r="8" fill="${JICF_COLORS.red}" opacity="0.7"/>
        <circle cx="20" cy="20" r="6" fill="${JICF_COLORS.blue}" opacity="0.8"/>
        <path d="M15,25 Q25,15 35,25 Q25,35 15,25" fill="#4caf50" opacity="0.6"/>
      </g>
    </g>
  </svg>`,

  elegantRoses: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.8">
      <!-- Large rose -->
      <g transform="translate(100,100)">
        <circle cx="0" cy="0" r="25" fill="${JICF_COLORS.red}" opacity="0.3"/>
        <circle cx="0" cy="0" r="20" fill="${JICF_COLORS.red}" opacity="0.5"/>
        <circle cx="0" cy="0" r="15" fill="${JICF_COLORS.red}" opacity="0.7"/>
        <circle cx="0" cy="0" r="10" fill="${JICF_COLORS.red}" opacity="0.9"/>
      </g>
      <!-- Smaller roses -->
      <g transform="translate(150,50)">
        <circle cx="0" cy="0" r="15" fill="${JICF_COLORS.yellow}" opacity="0.7"/>
        <circle cx="0" cy="0" r="10" fill="${JICF_COLORS.yellow}" opacity="0.9"/>
      </g>
      <g transform="translate(50,150)">
        <circle cx="0" cy="0" r="12" fill="${JICF_COLORS.blue}" opacity="0.7"/>
        <circle cx="0" cy="0" r="8" fill="${JICF_COLORS.blue}" opacity="0.9"/>
      </g>
      <!-- Leaves and stems -->
      <path d="M100,125 Q80,160 60,180" stroke="#4caf50" stroke-width="3" fill="none" opacity="0.6"/>
      <path d="M100,125 Q120,160 140,180" stroke="#4caf50" stroke-width="3" fill="none" opacity="0.6"/>
      <ellipse cx="85" cy="140" rx="8" ry="15" fill="#4caf50" opacity="0.6" transform="rotate(-30 85 140)"/>
      <ellipse cx="115" cy="140" rx="8" ry="15" fill="#4caf50" opacity="0.6" transform="rotate(30 115 140)"/>
    </g>
  </svg>`,
};

// Card Template 1: Graduation Blessing
export const graduationBlessingTemplate: CardTemplate = {
  id: "graduation-blessing",
  name: "Graduation Blessing Card",
  description: "Beautiful graduation blessing with floral design",
  category: "graduation",
  settings: {
    width: 500,
    height: 700,
    backgroundColor: JICF_COLORS.lightBlue,
  },
  elements: [
    // Background gradient
    {
      id: "background",
      type: "decoration",
      content: `<div style="
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, ${JICF_COLORS.lightBlue} 0%, ${JICF_COLORS.white} 50%, ${JICF_COLORS.lightYellow} 100%);
        border-radius: 20px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      "></div>`,
      position: { x: 0, y: 0, width: 500, height: 700 },
      style: { zIndex: 0 },
    },

    // Top floral decoration
    {
      id: "top-decoration",
      type: "decoration",
      content: FLORAL_DECORATIONS.elegantRoses,
      position: { x: 300, y: 20, width: 120, height: 120 },
      style: { opacity: 0.6, zIndex: 1 },
    }, // JICF Logo
    {
      id: "jicf-logo",
      type: "image",
      content: "/JICF_LOGO1.png", // Using the correct JICF logo from public folder
      position: { x: 200, y: 15, width: 100, height: 50 }, // Perfectly centered: (500-100)/2 = 200
      style: {
        zIndex: 4,
      },
    },

    // Main title
    {
      id: "title",
      type: "text",
      content: "A Graduation Blessing",
      position: { x: 50, y: 140, width: 400, height: 60 },
      style: {
        fontSize: 28,
        fontFamily: "Georgia, serif",
        fontWeight: "bold",
        color: JICF_COLORS.blue,
        textAlign: "center",
        lineHeight: 1.2,
        zIndex: 3,
      },
    },

    // Main blessing text
    {
      id: "blessing-text",
      type: "text",
      content: `May the Lord guide your every step
as you enter this exciting new season.
May your gifts make room for you,
your heart remain tender toward truth,
and your mind stay curious and bold.

Wherever you go, may you carry
Christ's love, peace, and wisdom.

This graduation is not your finish line—
it is your launching point.
Go forward in faith.`,
      position: { x: 50, y: 220, width: 400, height: 300 },
      style: {
        fontSize: 16,
        fontFamily: "Georgia, serif",
        color: JICF_COLORS.darkGray,
        textAlign: "center",
        lineHeight: 1.6,
        zIndex: 3,
      },
    },

    // Bottom message
    {
      id: "bottom-message",
      type: "text",
      content: `We are proud of you.
We are praying for you.`,
      position: { x: 50, y: 530, width: 400, height: 60 },
      style: {
        fontSize: 18,
        fontFamily: "Georgia, serif",
        fontWeight: "bold",
        color: JICF_COLORS.red,
        textAlign: "center",
        lineHeight: 1.4,
        zIndex: 3,
      },
    },

    // Congratulations
    {
      id: "congratulations",
      type: "text",
      content: "Congratulations, Graduate!",
      position: { x: 50, y: 600, width: 400, height: 40 },
      style: {
        fontSize: 24,
        fontFamily: "Georgia, serif",
        fontWeight: "bold",
        color: JICF_COLORS.blue,
        textAlign: "center",
        zIndex: 3,
      },
    },

    // Church name
    {
      id: "church-name",
      type: "text",
      content: "Jinan International Christian Fellowship",
      position: { x: 50, y: 650, width: 400, height: 30 },
      style: {
        fontSize: 14,
        fontFamily: "Arial, sans-serif",
        color: JICF_COLORS.blue,
        textAlign: "center",
        zIndex: 3,
      },
    },

    // Bottom floral decoration
    {
      id: "bottom-decoration",
      type: "decoration",
      content: FLORAL_DECORATIONS.floralBorder,
      position: { x: 50, y: 550, width: 400, height: 40 },
      style: { opacity: 0.4, zIndex: 1 },
    },

    // Optional recipient name (will be populated dynamically)
    {
      id: "recipient-name",
      type: "text",
      content: "{{recipientName}}",
      position: { x: 50, y: 680, width: 400, height: 20 },
      style: {
        fontSize: 12,
        fontFamily: "Arial, sans-serif",
        fontWeight: "italic",
        color: JICF_COLORS.darkGray,
        textAlign: "center",
        zIndex: 3,
      },
    },
  ],
};

// Card Template 2: Upside Down Biblical Verse
export const biblicalVerseTemplate: CardTemplate = {
  id: "biblical-verse-upside",
  name: "Biblical Verse Card (Upside Down)",
  description:
    "Beautiful card with upside down biblical text and floral design",
  category: "graduation",
  settings: {
    width: 500,
    height: 700,
    backgroundColor: JICF_COLORS.lightRed,
  },
  elements: [
    // Background gradient
    {
      id: "background",
      type: "decoration",
      content: `<div style="
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, ${JICF_COLORS.lightRed} 0%, ${JICF_COLORS.white} 50%, ${JICF_COLORS.lightYellow} 100%);
        border-radius: 20px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      "></div>`,
      position: { x: 0, y: 0, width: 500, height: 700 },
      style: { zIndex: 0 },
    },

    // Top corner roses
    {
      id: "top-left-rose",
      type: "decoration",
      content: FLORAL_DECORATIONS.roseCorner,
      position: { x: 20, y: 20, width: 80, height: 80 },
      style: { opacity: 0.7, zIndex: 1 },
    },

    {
      id: "top-right-rose",
      type: "decoration",
      content: FLORAL_DECORATIONS.roseCorner,
      position: { x: 400, y: 20, width: 80, height: 80 },
      style: { opacity: 0.7, zIndex: 1, transform: "rotate(90deg)" },
    },
    // Church logo
    {
      id: "church-logo",
      type: "image",
      content: "/JICF_LOGO1.png",
      position: { x: 210, y: 30, width: 80, height: 80 },
      style: { zIndex: 2 },
    },

    // Congratulations at top
    {
      id: "congratulations",
      type: "text",
      content: "Congratulations, Graduate!",
      position: { x: 50, y: 130, width: 400, height: 40 },
      style: {
        fontSize: 24,
        fontFamily: "Georgia, serif",
        fontWeight: "bold",
        color: JICF_COLORS.red,
        textAlign: "center",
        zIndex: 3,
      },
    },

    // Subtitle
    {
      id: "subtitle",
      type: "text",
      content: '"Not the End, But the Beginning"',
      position: { x: 50, y: 180, width: 400, height: 30 },
      style: {
        fontSize: 18,
        fontFamily: "Georgia, serif",
        fontWeight: "italic",
        color: JICF_COLORS.blue,
        textAlign: "center",
        zIndex: 3,
      },
    },

    // Regular Bible verse
    {
      id: "bible-verse",
      type: "text",
      content: `"For I know the plans I have for you,"
declares the Lord...
— Jeremiah 29:11`,
      position: { x: 50, y: 230, width: 400, height: 80 },
      style: {
        fontSize: 16,
        fontFamily: "Georgia, serif",
        color: JICF_COLORS.darkGray,
        textAlign: "center",
        lineHeight: 1.5,
        zIndex: 3,
      },
    },

    // Upside down inspirational text
    {
      id: "upside-text",
      type: "text",
      content: `Being confident of this,
that he who began a good work in you
will carry it on to completion
until the day of Christ Jesus.
— Philippians 1:6`,
      position: { x: 50, y: 350, width: 400, height: 120 },
      style: {
        fontSize: 14,
        fontFamily: "Georgia, serif",
        color: JICF_COLORS.blue,
        textAlign: "center",
        lineHeight: 1.4,
        transform: "rotate(180deg)",
        zIndex: 3,
      },
    },

    // Church name
    {
      id: "church-name",
      type: "text",
      content: "Jinan International Christian Fellowship",
      position: { x: 50, y: 500, width: 400, height: 30 },
      style: {
        fontSize: 16,
        fontFamily: "Georgia, serif",
        fontWeight: "bold",
        color: JICF_COLORS.blue,
        textAlign: "center",
        zIndex: 3,
      },
    },

    // Bottom corner roses
    {
      id: "bottom-left-rose",
      type: "decoration",
      content: FLORAL_DECORATIONS.roseCorner,
      position: { x: 20, y: 600, width: 80, height: 80 },
      style: { opacity: 0.7, zIndex: 1, transform: "rotate(270deg)" },
    },

    {
      id: "bottom-right-rose",
      type: "decoration",
      content: FLORAL_DECORATIONS.roseCorner,
      position: { x: 400, y: 600, width: 80, height: 80 },
      style: { opacity: 0.7, zIndex: 1, transform: "rotate(180deg)" },
    },

    // Optional recipient name
    {
      id: "recipient-name",
      type: "text",
      content: "{{recipientName}}",
      position: { x: 50, y: 680, width: 400, height: 20 },
      style: {
        fontSize: 12,
        fontFamily: "Arial, sans-serif",
        fontWeight: "italic",
        color: JICF_COLORS.darkGray,
        textAlign: "center",
        zIndex: 3,
      },
    },
  ],
};

// Card Template 3: Elegant Roses Design
export const elegantRosesTemplate: CardTemplate = {
  id: "elegant-roses",
  name: "Elegant Roses Graduation Card",
  description: "Sophisticated design with beautiful roses and gold accents",
  category: "graduation",
  settings: {
    width: 500,
    height: 700,
    backgroundColor: JICF_COLORS.white,
  },
  elements: [
    // Elegant background
    {
      id: "background",
      type: "decoration",
      content: `<div style="
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, #ffffff 0%, #f8f9fa 50%, #e8f4f8 100%);
        border: 3px solid ${JICF_COLORS.gold};
        border-radius: 25px;
        box-shadow: 0 12px 48px rgba(0,0,0,0.15);
      "></div>`,
      position: { x: 0, y: 0, width: 500, height: 700 },
      style: { zIndex: 0 },
    },

    // Large central rose arrangement
    {
      id: "central-roses",
      type: "decoration",
      content: FLORAL_DECORATIONS.elegantRoses,
      position: { x: 150, y: 80, width: 200, height: 200 },
      style: { opacity: 0.8, zIndex: 1 },
    },
    // Church logo with gold frame
    {
      id: "church-logo",
      type: "image",
      content: "/JICF_LOGO1.png",
      position: { x: 210, y: 30, width: 80, height: 80 },
      style: {
        zIndex: 2,
        // Add gold border around logo
        border: `2px solid ${JICF_COLORS.gold}`,
        borderRadius: "50%",
        padding: "5px",
      },
    },

    // Elegant title with gold accent
    {
      id: "title",
      type: "text",
      content: "GRADUATION BLESSING",
      position: { x: 50, y: 300, width: 400, height: 50 },
      style: {
        fontSize: 26,
        fontFamily: "Times New Roman, serif",
        fontWeight: "bold",
        color: JICF_COLORS.blue,
        textAlign: "center",
        letterSpacing: "2px",
        zIndex: 3,
      },
    },

    // Elegant blessing message
    {
      id: "blessing-message",
      type: "text",
      content: `May God's grace guide your journey ahead.
May His wisdom illuminate your path,
and His love sustain you always.

You have been equipped for greatness.
Step boldly into your destiny.`,
      position: { x: 60, y: 370, width: 380, height: 140 },
      style: {
        fontSize: 16,
        fontFamily: "Times New Roman, serif",
        color: JICF_COLORS.darkGray,
        textAlign: "center",
        lineHeight: 1.6,
        fontStyle: "italic",
        zIndex: 3,
      },
    },

    // Congratulations with gold color
    {
      id: "congratulations",
      type: "text",
      content: "Congratulations, Graduate!",
      position: { x: 50, y: 530, width: 400, height: 40 },
      style: {
        fontSize: 24,
        fontFamily: "Times New Roman, serif",
        fontWeight: "bold",
        color: JICF_COLORS.red,
        textAlign: "center",
        zIndex: 3,
      },
    },

    // Church name in elegant style
    {
      id: "church-name",
      type: "text",
      content: "JINAN INTERNATIONAL CHRISTIAN FELLOWSHIP",
      position: { x: 50, y: 590, width: 400, height: 30 },
      style: {
        fontSize: 12,
        fontFamily: "Times New Roman, serif",
        fontWeight: "bold",
        color: JICF_COLORS.blue,
        textAlign: "center",
        letterSpacing: "1px",
        zIndex: 3,
      },
    },

    // Decorative gold line
    {
      id: "decorative-line",
      type: "decoration",
      content: `<div style="
        width: 200px;
        height: 2px;
        background: linear-gradient(to right, transparent, ${JICF_COLORS.gold}, transparent);
        margin: 0 auto;
      "></div>`,
      position: { x: 150, y: 580, width: 200, height: 2 },
      style: { zIndex: 2 },
    },

    // Optional recipient name in elegant style
    {
      id: "recipient-name",
      type: "text",
      content: "{{recipientName}}",
      position: { x: 50, y: 640, width: 400, height: 25 },
      style: {
        fontSize: 14,
        fontFamily: "Times New Roman, serif",
        fontWeight: "italic",
        color: JICF_COLORS.gold,
        textAlign: "center",
        zIndex: 3,
      },
    },
  ],
};

// Card Template 4: JICF Graduates Celebration Invitation
export const celebrationInvitationTemplate: CardTemplate = {
  id: "celebration-invitation",
  name: "JICF Graduates Celebration Invitation",
  description:
    "Beautiful invitation card for the JICF Graduates Celebration event",
  category: "invitation",
  settings: {
    width: 500,
    height: 800,
    backgroundColor: JICF_COLORS.lightBlue,
  },
  elements: [
    // Elegant background gradient
    {
      id: "background-gradient",
      type: "decoration",
      content: `<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, #fdf2e9 0%, #faf0e6 25%, #f0f8ff 50%, #e6f3ff 75%, #ddeeff 100%); border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);"></div>`,
      position: { x: 0, y: 0, width: 500, height: 800 },
      style: { zIndex: 1 },
    },

    // Decorative border
    {
      id: "decorative-border",
      type: "decoration",
      content: `<div style="position: absolute; top: 15px; left: 15px; width: calc(100% - 30px); height: calc(100% - 30px); border: 3px solid ${JICF_COLORS.gold}; border-radius: 15px; background: linear-gradient(45deg, transparent 30%, rgba(237, 28, 36, 0.05) 50%, transparent 70%);"></div>`,
      position: { x: 0, y: 0, width: 500, height: 700 },
      style: { zIndex: 2 },
    },

    // Top floral decoration with celebration theme
    {
      id: "celebration-flowers",
      type: "decoration",
      content: `<svg viewBox="0 0 400 120" style="width: 100%; height: 100%;">
        <g opacity="0.8">
          <!-- Central celebration bouquet -->
          <g transform="translate(200,60)">
            <!-- Large celebration flower -->
            <circle cx="0" cy="0" r="20" fill="${JICF_COLORS.red}" opacity="0.3"/>
            <circle cx="0" cy="0" r="15" fill="${JICF_COLORS.red}" opacity="0.6"/>
            <circle cx="0" cy="0" r="10" fill="${JICF_COLORS.red}" opacity="0.9"/>
            <!-- Celebration rays -->
            <path d="M0,-20 L5,-35 L-5,-35 Z" fill="${JICF_COLORS.yellow}" opacity="0.7"/>
            <path d="M20,0 L35,5 L35,-5 Z" fill="${JICF_COLORS.yellow}" opacity="0.7"/>
            <path d="M0,20 L5,35 L-5,35 Z" fill="${JICF_COLORS.yellow}" opacity="0.7"/>
            <path d="M-20,0 L-35,5 L-35,-5 Z" fill="${JICF_COLORS.yellow}" opacity="0.7"/>
          </g>
          
          <!-- Side celebration flowers -->
          <g transform="translate(120,40)">
            <circle cx="0" cy="0" r="12" fill="${JICF_COLORS.blue}" opacity="0.7"/>
            <circle cx="0" cy="0" r="8" fill="${JICF_COLORS.blue}" opacity="0.9"/>
            <path d="M0,-12 Q6,-18 12,-12 Q6,-6 0,-12" fill="${JICF_COLORS.yellow}" opacity="0.8"/>
          </g>
          
          <g transform="translate(280,40)">
            <circle cx="0" cy="0" r="12" fill="${JICF_COLORS.purple}" opacity="0.7"/>
            <circle cx="0" cy="0" r="8" fill="${JICF_COLORS.purple}" opacity="0.9"/>
            <path d="M0,-12 Q-6,-18 -12,-12 Q-6,-6 0,-12" fill="${JICF_COLORS.yellow}" opacity="0.8"/>
          </g>
          
          <!-- Festive leaves and stems -->
          <path d="M200,80 Q150,100 120,90" stroke="#4caf50" stroke-width="2" fill="none" opacity="0.6"/>
          <path d="M200,80 Q250,100 280,90" stroke="#4caf50" stroke-width="2" fill="none" opacity="0.6"/>
          <ellipse cx="160" cy="85" rx="6" ry="12" fill="#4caf50" opacity="0.6" transform="rotate(-20 160 85)"/>
          <ellipse cx="240" cy="85" rx="6" ry="12" fill="#4caf50" opacity="0.6" transform="rotate(20 240 85)"/>
          
          <!-- Celebration confetti -->
          <circle cx="100" cy="20" r="3" fill="${JICF_COLORS.yellow}" opacity="0.8"/>
          <circle cx="300" cy="30" r="2" fill="${JICF_COLORS.red}" opacity="0.8"/>
          <circle cx="80" cy="80" r="2" fill="${JICF_COLORS.blue}" opacity="0.8"/>
          <circle cx="320" cy="70" r="3" fill="${JICF_COLORS.purple}" opacity="0.8"/>
          <rect x="110" y="15" width="3" height="3" fill="${JICF_COLORS.gold}" opacity="0.8" transform="rotate(45 110 15)"/>
          <rect x="290" y="25" width="4" height="4" fill="${JICF_COLORS.green}" opacity="0.8" transform="rotate(45 290 25)"/>
        </g>
      </svg>`,
      position: { x: 50, y: 40, width: 400, height: 120 },
      style: { zIndex: 3 },
    },

    // JICF Logo
    {
      id: "jicf-logo",
      type: "image",
      content: "/JICF_LOGO1.png",
      position: { x: 200, y: 180, width: 100, height: 100 },
      style: {
        borderRadius: "50%",
        border: `3px solid ${JICF_COLORS.gold}`,
        opacity: 0.95,
        zIndex: 4,
      },
    },

    // Main invitation title
    {
      id: "invitation-title",
      type: "text",
      content: "You're Invited!",
      position: { x: 50, y: 300, width: 400, height: 50 },
      style: {
        fontSize: 36,
        fontFamily: "Georgia, serif",
        fontWeight: "bold",
        color: JICF_COLORS.red,
        textAlign: "center",
        letterSpacing: "2px",
        zIndex: 4,
      },
    },

    // Event title
    {
      id: "event-title",
      type: "text",
      content: "JICF GRADUATES CELEBRATION",
      position: { x: 50, y: 360, width: 400, height: 40 },
      style: {
        fontSize: 24,
        fontFamily: "Georgia, serif",
        fontWeight: "bold",
        color: JICF_COLORS.blue,
        textAlign: "center",
        letterSpacing: "1px",
        zIndex: 4,
      },
    },

    // Date and time
    {
      id: "event-datetime",
      type: "text",
      content:
        "Sunday, June 15, 2025\nService starts at 2:50 PM PROMPTLY\nChurch doors open at 2:30 PM",
      position: { x: 50, y: 420, width: 400, height: 80 },
      style: {
        fontSize: 18,
        fontFamily: "Georgia, serif",
        fontWeight: "600",
        color: JICF_COLORS.purple,
        textAlign: "center",
        lineHeight: 1.3,
        zIndex: 4,
      },
    },

    // Invitation message
    {
      id: "invitation-message",
      type: "text",
      content:
        "Join us as we celebrate our amazing graduates!\nBring your family and friends.\nLet's make this a memorable celebration together!\n\nDon't forget - Invite others to come!",
      position: { x: 50, y: 520, width: 400, height: 100 },
      style: {
        fontSize: 16,
        fontFamily: "Georgia, serif",
        fontWeight: "normal",
        color: JICF_COLORS.darkBlue,
        textAlign: "center",
        lineHeight: 1.5,
        fontStyle: "italic",
        zIndex: 4,
      },
    },

    // Reminder note
    {
      id: "reminder-note",
      type: "text",
      content:
        "⚠️ REMINDER: Please arrive on time!\nInvite others to join this special celebration!",
      position: { x: 50, y: 640, width: 400, height: 50 },
      style: {
        fontSize: 14,
        fontFamily: "Georgia, serif",
        fontWeight: "bold",
        color: JICF_COLORS.red,
        textAlign: "center",
        lineHeight: 1.3,
        zIndex: 4,
      },
    },

    // Bottom decorative elements
    {
      id: "bottom-decoration",
      type: "decoration",
      content:
        '<svg viewBox="0 0 400 80" style="width: 100%; height: 100%;"><g opacity="0.7"><path d="M50,40 Q200,20 350,40" stroke="' +
        JICF_COLORS.gold +
        '" stroke-width="3" fill="none"/><path d="M50,40 Q200,60 350,40" stroke="' +
        JICF_COLORS.gold +
        '" stroke-width="3" fill="none"/><g transform="translate(100,40)"><rect x="-2" y="0" width="4" height="15" fill="' +
        JICF_COLORS.red +
        '" opacity="0.8"/><circle cx="0" cy="20" r="5" fill="' +
        JICF_COLORS.red +
        '" opacity="0.8"/></g><g transform="translate(150,40)"><rect x="-2" y="0" width="4" height="12" fill="' +
        JICF_COLORS.blue +
        '" opacity="0.8"/><circle cx="0" cy="17" r="4" fill="' +
        JICF_COLORS.blue +
        '" opacity="0.8"/></g><g transform="translate(200,40)"><rect x="-2" y="0" width="4" height="18" fill="' +
        JICF_COLORS.yellow +
        '" opacity="0.8"/><circle cx="0" cy="23" r="6" fill="' +
        JICF_COLORS.yellow +
        '" opacity="0.8"/></g><g transform="translate(250,40)"><rect x="-2" y="0" width="4" height="12" fill="' +
        JICF_COLORS.purple +
        '" opacity="0.8"/><circle cx="0" cy="17" r="4" fill="' +
        JICF_COLORS.purple +
        '" opacity="0.8"/></g><g transform="translate(300,40)"><rect x="-2" y="0" width="4" height="15" fill="' +
        JICF_COLORS.green +
        '" opacity="0.8"/><circle cx="0" cy="20" r="5" fill="' +
        JICF_COLORS.green +
        '" opacity="0.8"/></g></g></svg>',
      position: { x: 50, y: 710, width: 400, height: 80 },
      style: { zIndex: 3 },
    },

    // Optional custom message
    {
      id: "custom-message",
      type: "text",
      content: "{{customMessage}}",
      position: { x: 50, y: 700, width: 400, height: 30 },
      style: {
        fontSize: 12,
        fontFamily: "Georgia, serif",
        fontWeight: "italic",
        color: JICF_COLORS.gold,
        textAlign: "center",
        zIndex: 4,
      },
    },
  ],
};

// Card Template 5: Today is the Day - Celebration Day Card
export const todayIsTheDayTemplate: CardTemplate = {
  id: "today-celebration",
  name: "Today is the Day - JICF Celebration",
  description:
    "Exciting celebration day card for the day of the JICF Graduates Celebration",
  category: "invitation",
  settings: {
    width: 500,
    height: 750,
    backgroundColor: JICF_COLORS.lightYellow,
  },
  elements: [
    // Vibrant background with celebration theme
    {
      id: "celebration-background",
      type: "decoration",
      content: `<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(45deg, #fff3e0 0%, #ffe0b2 25%, #ffcc02 50%, #ff8f00 75%, #e65100 100%); border-radius: 25px; box-shadow: 0 25px 50px rgba(0,0,0,0.15);"></div>`,
      position: { x: 0, y: 0, width: 500, height: 750 },
      style: { zIndex: 1 },
    },

    // Celebration burst border
    {
      id: "celebration-border",
      type: "decoration",
      content: `<div style="position: absolute; top: 20px; left: 20px; width: calc(100% - 40px); height: calc(100% - 40px); border: 4px solid ${JICF_COLORS.red}; border-radius: 20px; background: linear-gradient(135deg, transparent 20%, rgba(255, 215, 0, 0.1) 50%, transparent 80%);"></div>`,
      position: { x: 0, y: 0, width: 500, height: 750 },
      style: { zIndex: 2 },
    },

    // Today's celebration fireworks
    {
      id: "celebration-fireworks",
      type: "decoration",
      content: `<svg viewBox="0 0 400 100" style="width: 100%; height: 100%;">
        <g opacity="0.9">
          <!-- Central burst -->
          <g transform="translate(200,50)">
            <!-- Main explosion -->
            <circle cx="0" cy="0" r="25" fill="${JICF_COLORS.red}" opacity="0.2"/>
            <circle cx="0" cy="0" r="20" fill="${JICF_COLORS.red}" opacity="0.4"/>
            <circle cx="0" cy="0" r="15" fill="${JICF_COLORS.red}" opacity="0.8"/>
            <!-- Explosion rays -->
            <path d="M0,-25 L0,-40" stroke="${JICF_COLORS.gold}" stroke-width="3" opacity="0.9"/>
            <path d="M18,-18 L28,-28" stroke="${JICF_COLORS.gold}" stroke-width="3" opacity="0.9"/>
            <path d="M25,0 L40,0" stroke="${JICF_COLORS.gold}" stroke-width="3" opacity="0.9"/>
            <path d="M18,18 L28,28" stroke="${JICF_COLORS.gold}" stroke-width="3" opacity="0.9"/>
            <path d="M0,25 L0,40" stroke="${JICF_COLORS.gold}" stroke-width="3" opacity="0.9"/>
            <path d="M-18,18 L-28,28" stroke="${JICF_COLORS.gold}" stroke-width="3" opacity="0.9"/>
            <path d="M-25,0 L-40,0" stroke="${JICF_COLORS.gold}" stroke-width="3" opacity="0.9"/>
            <path d="M-18,-18 L-28,-28" stroke="${JICF_COLORS.gold}" stroke-width="3" opacity="0.9"/>
            <!-- Star bursts -->
            <path d="M0,-15 L3,-25 L0,-35 L-3,-25 Z" fill="${JICF_COLORS.yellow}" opacity="0.8"/>
            <path d="M15,0 L25,3 L35,0 L25,-3 Z" fill="${JICF_COLORS.yellow}" opacity="0.8"/>
            <path d="M0,15 L3,25 L0,35 L-3,25 Z" fill="${JICF_COLORS.yellow}" opacity="0.8"/>
            <path d="M-15,0 L-25,3 L-35,0 L-25,-3 Z" fill="${JICF_COLORS.yellow}" opacity="0.8"/>
          </g>
          
          <!-- Side fireworks -->
          <g transform="translate(100,30)">
            <circle cx="0" cy="0" r="15" fill="${JICF_COLORS.blue}" opacity="0.6"/>
            <circle cx="0" cy="0" r="10" fill="${JICF_COLORS.blue}" opacity="0.8"/>
            <path d="M0,-10 L0,-20" stroke="${JICF_COLORS.gold}" stroke-width="2"/>
            <path d="M7,-7 L14,-14" stroke="${JICF_COLORS.gold}" stroke-width="2"/>
            <path d="M10,0 L20,0" stroke="${JICF_COLORS.gold}" stroke-width="2"/>
            <path d="M7,7 L14,14" stroke="${JICF_COLORS.gold}" stroke-width="2"/>
          </g>
          
          <g transform="translate(300,30)">
            <circle cx="0" cy="0" r="15" fill="${JICF_COLORS.purple}" opacity="0.6"/>
            <circle cx="0" cy="0" r="10" fill="${JICF_COLORS.purple}" opacity="0.8"/>
            <path d="M0,-10 L0,-20" stroke="${JICF_COLORS.gold}" stroke-width="2"/>
            <path d="M-7,-7 L-14,-14" stroke="${JICF_COLORS.gold}" stroke-width="2"/>
            <path d="M-10,0 L-20,0" stroke="${JICF_COLORS.gold}" stroke-width="2"/>
            <path d="M-7,7 L-14,14" stroke="${JICF_COLORS.gold}" stroke-width="2"/>
          </g>
          
          <!-- Celebration sparkles -->
          <circle cx="80" cy="20" r="2" fill="${JICF_COLORS.yellow}"/>
          <circle cx="320" cy="25" r="3" fill="${JICF_COLORS.red}"/>
          <circle cx="60" cy="70" r="2" fill="${JICF_COLORS.blue}"/>
          <circle cx="340" cy="75" r="2" fill="${JICF_COLORS.purple}"/>
          <rect x="85" y="15" width="3" height="3" fill="${JICF_COLORS.gold}" transform="rotate(45 85 15)"/>
          <rect x="315" y="20" width="4" height="4" fill="${JICF_COLORS.green}" transform="rotate(45 315 20)"/>
        </g>
      </svg>`,
      position: { x: 50, y: 30, width: 400, height: 100 },
      style: { zIndex: 3 },
    },

    // JICF Logo
    {
      id: "jicf-logo-today",
      type: "image",
      content: "/JICF_LOGO1.png",
      position: { x: 200, y: 150, width: 100, height: 100 },
      style: {
        borderRadius: "50%",
        border: `4px solid ${JICF_COLORS.gold}`,
        opacity: 0.95,
        zIndex: 4,
      },
    },

    // Main "Today is the Day" title
    {
      id: "today-title",
      type: "text",
      content: "TODAY IS THE DAY!",
      position: { x: 50, y: 270, width: 400, height: 50 },
      style: {
        fontSize: 32,
        fontFamily: "Georgia, serif",
        fontWeight: "bold",
        color: JICF_COLORS.red,
        textAlign: "center",
        letterSpacing: "3px",
        zIndex: 4,
      },
    },

    // Event title
    {
      id: "event-title-today",
      type: "text",
      content: "JICF GRADUATES CELEBRATION",
      position: { x: 50, y: 330, width: 400, height: 40 },
      style: {
        fontSize: 22,
        fontFamily: "Georgia, serif",
        fontWeight: "bold",
        color: JICF_COLORS.blue,
        textAlign: "center",
        letterSpacing: "1px",
        zIndex: 4,
      },
    },

    // Service time reminder
    {
      id: "service-time-today",
      type: "text",
      content: "Service starts at 2:50 PM\nDoors open at 2:30 PM",
      position: { x: 50, y: 380, width: 400, height: 60 },
      style: {
        fontSize: 18,
        fontFamily: "Georgia, serif",
        fontWeight: "600",
        color: JICF_COLORS.purple,
        textAlign: "center",
        lineHeight: 1.4,
        zIndex: 4,
      },
    },

    // Dinner announcement
    {
      id: "dinner-announcement",
      type: "text",
      content:
        "🍽️ DINNER TIME AFTER SERVICE! 🍽️\nDon't miss out on the celebration feast!\nStay for fellowship and delicious food!",
      position: { x: 50, y: 460, width: 400, height: 80 },
      style: {
        fontSize: 16,
        fontFamily: "Georgia, serif",
        fontWeight: "bold",
        color: JICF_COLORS.darkBlue,
        textAlign: "center",
        lineHeight: 1.4,
        zIndex: 4,
      },
    },

    // Celebration message
    {
      id: "celebration-message-today",
      type: "text",
      content:
        "This is our moment to celebrate!\nCome with joy and thanksgiving.\nLet's honor our amazing graduates together!",
      position: { x: 50, y: 560, width: 400, height: 70 },
      style: {
        fontSize: 15,
        fontFamily: "Georgia, serif",
        fontWeight: "normal",
        color: JICF_COLORS.darkBlue,
        textAlign: "center",
        lineHeight: 1.5,
        fontStyle: "italic",
        zIndex: 4,
      },
    },

    // Final reminder
    {
      id: "final-reminder",
      type: "text",
      content: "🎉 See you there! 🎉",
      position: { x: 50, y: 650, width: 400, height: 30 },
      style: {
        fontSize: 20,
        fontFamily: "Georgia, serif",
        fontWeight: "bold",
        color: JICF_COLORS.red,
        textAlign: "center",
        zIndex: 4,
      },
    },

    // Bottom celebration decoration
    {
      id: "bottom-celebration",
      type: "decoration",
      content:
        '<svg viewBox="0 0 400 60" style="width: 100%; height: 100%;"><g opacity="0.8"><path d="M50,30 Q200,10 350,30" stroke="' +
        JICF_COLORS.gold +
        '" stroke-width="4" fill="none"/><circle cx="100" cy="30" r="6" fill="' +
        JICF_COLORS.red +
        '"/><circle cx="200" cy="30" r="8" fill="' +
        JICF_COLORS.blue +
        '"/><circle cx="300" cy="30" r="6" fill="' +
        JICF_COLORS.purple +
        '"/></g></svg>',
      position: { x: 50, y: 690, width: 400, height: 60 },
      style: { zIndex: 3 },
    },

    // Optional custom message
    {
      id: "custom-message-today",
      type: "text",
      content: "{{customMessage}}",
      position: { x: 50, y: 680, width: 400, height: 30 },
      style: {
        fontSize: 12,
        fontFamily: "Georgia, serif",
        fontWeight: "italic",
        color: JICF_COLORS.gold,
        textAlign: "center",
        zIndex: 4,
      },
    },
  ],
};

// Card Template 6: JICF Graduates Service Outline
export const serviceOutlineTemplate: CardTemplate = {
  id: "service-outline",
  name: "JICF Graduates Service Outline",
  description:
    "Complete service outline for the JICF Graduates Celebration Service",
  category: "graduation",
  settings: {
    width: 595,
    height: 750, // More compact A4-like size
    backgroundColor: JICF_COLORS.white,
  },
  elements: [
    // Background gradient
    {
      id: "service-background",
      type: "decoration",
      content: `<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, ${JICF_COLORS.blue} 0%, ${JICF_COLORS.red} 100%); border-radius: 15px;"></div>`,
      position: { x: 0, y: 0, width: 595, height: 750 },
      style: { zIndex: 1 },
    },

    // Background pattern
    {
      id: "background-pattern",
      type: "decoration",
      content: `<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%);"></div>`,
      position: { x: 0, y: 0, width: 595, height: 750 },
      style: { zIndex: 2 },
    }, // JICF Logo
    {
      id: "jicf-logo",
      type: "image",
      content: "/JICF_LOGO1.png", // Using the correct JICF logo from public folder
      position: { x: 247.5, y: 20, width: 100, height: 50 }, // Centered above title
      style: {
        zIndex: 4,
        opacity: 0.95,
      },
    },

    // Main Header - Dynamic Event Name or Default
    {
      id: "service-title",
      type: "text",
      content: "{{eventName}}",
      position: { x: 50, y: 80, width: 495, height: 70 }, // Moved down to make space for logo
      style: {
        fontSize: 32, // Slightly smaller to fit better
        fontFamily: "Georgia, serif",
        fontWeight: "bold",
        color: JICF_COLORS.yellow, // Church yellow for better contrast
        textAlign: "center",
        lineHeight: 1.2, // Better line spacing for long titles
        zIndex: 4,
      },
    },

    // Event Date
    {
      id: "event-date",
      type: "text",
      content: "{{eventDate}}",
      position: { x: 50, y: 160, width: 495, height: 25 }, // Moved down to accommodate logo and title
      style: {
        fontSize: 18,
        fontFamily: "Georgia, serif",
        color: JICF_COLORS.white,
        textAlign: "center",
        opacity: 0.8,
        zIndex: 4,
      },
    },

    // Decorative separator line
    {
      id: "header-separator",
      type: "decoration",
      content: `<div style="background: linear-gradient(90deg, transparent 0%, ${JICF_COLORS.yellow} 30%, ${JICF_COLORS.white} 50%, ${JICF_COLORS.yellow} 70%, transparent 100%); height: 2px; border-radius: 1px;"></div>`,
      position: { x: 100, y: 195, width: 395, height: 2 }, // Moved down to match new layout
      style: { zIndex: 3 },
    },

    // Service Items Container - This will contain all service items
    {
      id: "service-items-container",
      type: "text",
      content: "{{serviceOutlineItems}}",
      position: { x: 40, y: 210, width: 515, height: 410 }, // Moved down with adjusted height
      style: {
        fontSize: 14, // Smaller font to fit more content
        fontFamily: "Georgia, serif",
        fontWeight: "500",
        color: JICF_COLORS.white,
        textAlign: "left",
        lineHeight: 1.3, // Tighter line height
        zIndex: 4,
      },
    },

    // Footer
    {
      id: "service-footer",
      type: "text",
      content: "Jinan International Christian Fellowship (JICF)",
      position: { x: 50, y: 680, width: 495, height: 20 },
      style: {
        fontSize: 14,
        fontFamily: "Georgia, serif",
        fontStyle: "italic",
        color: JICF_COLORS.white,
        textAlign: "center",
        opacity: 0.7,
        zIndex: 4,
      },
    },

    // MC Name at bottom
    {
      id: "mc-name-bottom",
      type: "text",
      content: "MC: {{mcName}}",
      position: { x: 50, y: 650, width: 495, height: 25 },
      style: {
        fontSize: 16,
        fontFamily: "Georgia, serif",
        fontWeight: "bold",
        color: JICF_COLORS.white,
        textAlign: "center",
        opacity: 0.9,
        zIndex: 4,
      },
    },
  ],
};

// Card Template 7: JICF Graduates Name List
const graduatesNameListTemplate: CardTemplate = {
  id: "graduates-name-list",
  name: "JICF Graduates Name List",
  description:
    "Comprehensive graduates list card showing names, countries, universities, and academic majors",
  category: "graduation",
  settings: {
    width: 595,
    height: 750, // Same as service outline for consistency
    backgroundColor: JICF_COLORS.white,
  },
  elements: [
    // Background gradient - same as service outline
    {
      id: "service-background",
      type: "decoration",
      content: `<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, ${JICF_COLORS.blue} 0%, ${JICF_COLORS.red} 100%); border-radius: 15px;"></div>`,
      position: { x: 0, y: 0, width: 595, height: 750 },
      style: { zIndex: 1 },
    },

    // Background pattern - same as service outline
    {
      id: "background-pattern",
      type: "decoration",
      content: `<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%);"></div>`,
      position: { x: 0, y: 0, width: 595, height: 750 },
      style: { zIndex: 2 },
    },

    // JICF Logo
    {
      id: "jicf-logo",
      type: "image",
      content: "/JICF_LOGO1.png",
      position: { x: 247.5, y: 20, width: 100, height: 50 },
      style: {
        zIndex: 4,
        opacity: 0.95,
      },
    },

    // Main Title
    {
      id: "main-title",
      type: "text",
      content: "GRADUATES NAME LIST",
      position: { x: 50, y: 80, width: 495, height: 50 },
      style: {
        fontSize: 28,
        fontFamily: "Georgia, serif",
        fontWeight: "bold",
        color: JICF_COLORS.yellow,
        textAlign: "center",
        letterSpacing: "1px",
        zIndex: 4,
      },
    },

    // Event Name
    {
      id: "event-name",
      type: "text",
      content: "{{eventName}}",
      position: { x: 50, y: 140, width: 495, height: 30 },
      style: {
        fontSize: 20,
        fontFamily: "Georgia, serif",
        fontWeight: "600",
        color: JICF_COLORS.white,
        textAlign: "center",
        opacity: 0.95,
        zIndex: 4,
      },
    },

    // Event Date
    {
      id: "event-date",
      type: "text",
      content: "{{eventDate}}",
      position: { x: 50, y: 175, width: 495, height: 25 },
      style: {
        fontSize: 16,
        fontFamily: "Georgia, serif",
        fontStyle: "italic",
        color: JICF_COLORS.white,
        textAlign: "center",
        opacity: 0.9,
        zIndex: 4,
      },
    },

    // Decorative separator line
    {
      id: "header-separator",
      type: "decoration",
      content: `<div style="background: linear-gradient(90deg, transparent 0%, ${JICF_COLORS.yellow} 30%, ${JICF_COLORS.white} 50%, ${JICF_COLORS.yellow} 70%, transparent 100%); height: 2px; border-radius: 1px;"></div>`,
      position: { x: 100, y: 210, width: 395, height: 2 },
      style: { zIndex: 3 },
    },

    // Graduates List Content Area - much larger and better positioned
    {
      id: "graduates-list",
      type: "text",
      content: "{{graduatesList}}",
      position: { x: 40, y: 225, width: 515, height: 450 }, // More space and better positioning
      style: {
        fontSize: 12, // Smaller font to fit more content
        fontFamily: "Arial, sans-serif",
        fontWeight: "400",
        color: JICF_COLORS.white,
        textAlign: "left",
        lineHeight: 1.4, // Tighter line height
        opacity: 0.95,
        zIndex: 4,
      },
    },

    // Footer
    {
      id: "service-footer",
      type: "text",
      content: "Jinan International Christian Fellowship (JICF)",
      position: { x: 50, y: 690, width: 495, height: 20 },
      style: {
        fontSize: 14,
        fontFamily: "Georgia, serif",
        fontStyle: "italic",
        color: JICF_COLORS.white,
        textAlign: "center",
        opacity: 0.7,
        zIndex: 4,
      },
    },
  ],
};

// Card Template 8: Meet Our Graduates - Multi-page A4 Document
const meetOurGraduatesTemplate: CardTemplate = {
  id: "meet-our-graduates",
  name: "Meet Our Graduates",
  description:
    "Comprehensive multi-page A4 document featuring individual graduate profiles with photos, church information, and graduation blessing",
  category: "graduation",
  settings: {
    width: 595, // A4 width in pixels (210mm)
    height: 842, // A4 height in pixels (297mm)
    backgroundColor: JICF_COLORS.white,
  },
  elements: [
    // This template will be dynamically generated based on graduate data
    // The actual pages will be created in the card renderer
    {
      id: "multi-page-content",
      type: "text",
      content: "{{meetOurGraduatesContent}}",
      position: { x: 0, y: 0, width: 595, height: 842 },
      style: {
        fontSize: 14,
        fontFamily: "Arial, sans-serif",
        color: JICF_COLORS.darkGray,
        zIndex: 1,
      },
    },
  ],
};

// Export all templates
export const CARD_TEMPLATES: CardTemplate[] = [
  graduationBlessingTemplate,
  biblicalVerseTemplate,
  elegantRosesTemplate,
  celebrationInvitationTemplate,
  todayIsTheDayTemplate,
  serviceOutlineTemplate,
  graduatesNameListTemplate,
  meetOurGraduatesTemplate,
];

export const getCardTemplate = (
  templateId: string
): CardTemplate | undefined => {
  return CARD_TEMPLATES.find((template) => template.id === templateId);
};

export const getCardTemplatesByCategory = (
  category: string
): CardTemplate[] => {
  return CARD_TEMPLATES.filter((template) => template.category === category);
};
