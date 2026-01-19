import Image from "next/image";
import { FOM_BRAND, FOM_LOGO } from "@/lib/constants/fom";

interface FomLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  textPosition?: "right" | "bottom";
  className?: string;
}

const sizeMap = {
  sm: { width: 24, height: 24, textSize: "text-sm" },
  md: { width: 40, height: 40, textSize: "text-xl" },
  lg: { width: 56, height: 56, textSize: "text-2xl" },
};

export function FomLogo({
  size = "md",
  showText = true,
  textPosition = "right",
  className = "",
}: FomLogoProps) {
  const { width, height, textSize } = sizeMap[size];

  const logoElement = (
    <div className="relative">
      <Image
        src={FOM_LOGO.png}
        alt={FOM_LOGO.alt}
        width={width}
        height={height}
        className="rounded-xl shadow-lg hover-fom-glow transition-all duration-300"
      />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
    </div>
  );

  if (!showText) {
    return <div className={className}>{logoElement}</div>;
  }

  const textElement = (
    <div className={textPosition === "bottom" ? "text-center" : "text-left"}>
      <h1 className={`font-black heading-fom-gradient ${textSize}`}>
        {FOM_BRAND.name}
      </h1>
      <p className="text-sm text-fom-muted font-medium">{FOM_BRAND.tagline}</p>
    </div>
  );

  if (textPosition === "bottom") {
    return (
      <div className={`flex flex-col items-center space-y-2 ${className}`}>
        {logoElement}
        {textElement}
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {logoElement}
      {textElement}
    </div>
  );
}
