"use client";

import { useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  type LucideIcon,
} from "lucide-react";

interface ToolbarButton {
  label: string;
  icon: LucideIcon;
  command: string;
  value?: string;
  shortcut?: string;
  requiresInput?: boolean;
}

interface ToolbarSeparator {
  type: "separator";
}

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  minHeight?: string;
}

export const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Start typing...",
  className,
  disabled = false,
  minHeight = "200px",
}: RichTextEditorProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const executeCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
  }, []);

  const toolbarButtons: (ToolbarButton | ToolbarSeparator)[] = useMemo(
    () => [
      {
        label: "Bold",
        icon: Bold,
        command: "bold",
        shortcut: "Ctrl+B",
      },
      {
        label: "Italic",
        icon: Italic,
        command: "italic",
        shortcut: "Ctrl+I",
      },
      {
        label: "Underline",
        icon: Underline,
        command: "underline",
        shortcut: "Ctrl+U",
      },
      { type: "separator" },
      {
        label: "Heading 1",
        icon: Heading1,
        command: "formatBlock",
        value: "h1",
      },
      {
        label: "Heading 2",
        icon: Heading2,
        command: "formatBlock",
        value: "h2",
      },
      {
        label: "Heading 3",
        icon: Heading3,
        command: "formatBlock",
        value: "h3",
      },
      { type: "separator" },
      {
        label: "Bullet List",
        icon: List,
        command: "insertUnorderedList",
      },
      {
        label: "Numbered List",
        icon: ListOrdered,
        command: "insertOrderedList",
      },
      {
        label: "Quote",
        icon: Quote,
        command: "formatBlock",
        value: "blockquote",
      },
      { type: "separator" },
      {
        label: "Align Left",
        icon: AlignLeft,
        command: "justifyLeft",
      },
      {
        label: "Align Center",
        icon: AlignCenter,
        command: "justifyCenter",
      },
      {
        label: "Align Right",
        icon: AlignRight,
        command: "justifyRight",
      },
      { type: "separator" },
      {
        label: "Link",
        icon: Link,
        command: "createLink",
        requiresInput: true,
      },
    ],
    []
  );

  const handleToolbarClick = useCallback(
    (button: ToolbarButton) => {
      if (button.requiresInput) {
        const url = prompt("Enter URL:");
        if (url) {
          executeCommand(button.command, url);
        }
      } else {
        executeCommand(button.command, button.value);
      }
    },
    [executeCommand]
  );

  const handleContentChange = useCallback(
    (e: React.FormEvent<HTMLDivElement>) => {
      const content = e.currentTarget.innerHTML;
      onChange(content);
    },
    [onChange]
  );

  return (
    <div className={cn("border rounded-lg overflow-hidden", className)}>
      {/* Toolbar */}
      <div className="border-b bg-gray-50 p-2 flex flex-wrap gap-1">
        {toolbarButtons.map((button, index) => {
          if ("type" in button && button.type === "separator") {
            return <div key={index} className="w-px h-6 bg-gray-300 mx-1" />;
          }

          const toolbarButton = button as ToolbarButton;
          const Icon = toolbarButton.icon;
          return (
            <Button
              key={toolbarButton.label}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => handleToolbarClick(toolbarButton)}
              disabled={disabled}
              title={`${toolbarButton.label}${
                toolbarButton.shortcut ? ` (${toolbarButton.shortcut})` : ""
              }`}
            >
              <Icon className="h-4 w-4" />
            </Button>
          );
        })}

        <div className="ml-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            disabled={disabled}
          >
            {isExpanded ? "Collapse" : "Expand"}
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div
        contentEditable={!disabled}
        className={cn(
          "p-4 focus:outline-none",
          "prose prose-gray max-w-none",
          "prose-headings:text-blue-950 prose-headings:font-semibold",
          "prose-h1:text-2xl prose-h1:mb-4 prose-h1:mt-6",
          "prose-h2:text-xl prose-h2:mb-3 prose-h2:mt-5",
          "prose-h3:text-lg prose-h3:mb-2 prose-h3:mt-4",
          "prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4",
          "prose-strong:text-blue-950 prose-strong:font-semibold",
          "prose-em:text-gray-600 prose-em:italic",
          "prose-a:text-blue-950 prose-a:underline prose-a:font-medium hover:prose-a:text-blue-800",
          "prose-blockquote:border-l-4 prose-blockquote:border-blue-200 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600",
          "prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4",
          "prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4",
          "prose-li:mb-1 prose-li:text-gray-700",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        style={{
          minHeight: isExpanded ? "400px" : minHeight,
          maxHeight: isExpanded ? "600px" : "300px",
          overflowY: "auto",
        }}
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={handleContentChange}
        data-placeholder={placeholder}
      />

      {/* Character count and help text */}
      <div className="border-t bg-gray-50 px-4 py-2 text-xs text-gray-500 flex justify-between items-center">
        <span>
          Use keyboard shortcuts: Ctrl+B (Bold), Ctrl+I (Italic), Ctrl+U
          (Underline)
        </span>
        <span>{value.replace(/<[^>]*>/g, "").length} characters</span>
      </div>
    </div>
  );
};
