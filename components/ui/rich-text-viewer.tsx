"use client";

import { cn } from "@/lib/utils";

interface RichTextViewerProps {
  content: string;
  className?: string;
  maxHeight?: string;
}

export const RichTextViewer = ({
  content,
  className,
  maxHeight,
}: RichTextViewerProps) => {
  // Basic HTML content sanitization and rendering
  // In production, consider using a proper HTML sanitizer like DOMPurify
  const createMarkup = () => {
    return { __html: content };
  };

  const baseStyles = `
    prose prose-gray max-w-none
    prose-headings:text-blue-950 prose-headings:font-semibold
    prose-h1:text-2xl prose-h1:mb-4 prose-h1:mt-6
    prose-h2:text-xl prose-h2:mb-3 prose-h2:mt-5
    prose-h3:text-lg prose-h3:mb-2 prose-h3:mt-4
    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
    prose-strong:text-blue-950 prose-strong:font-semibold
    prose-em:text-gray-600 prose-em:italic
    prose-a:text-blue-950 prose-a:underline prose-a:font-medium hover:prose-a:text-blue-800
    prose-blockquote:border-l-4 prose-blockquote:border-blue-200 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
    prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
    prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
    prose-li:mb-1 prose-li:text-gray-700
    prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-blue-950 prose-code:text-sm
    prose-pre:bg-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
    prose-hr:border-gray-200 prose-hr:my-6
  `;

  return (
    <div
      className={cn(
        baseStyles,
        maxHeight && `max-h-[${maxHeight}] overflow-y-auto`,
        className
      )}
      dangerouslySetInnerHTML={createMarkup()}
    />
  );
};
