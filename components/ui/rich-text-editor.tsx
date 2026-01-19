"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
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
  Save,
  FileText,
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
  onSave?: () => void;
  onSaveAsDraft?: () => void;
  isSaving?: boolean;
  isDraft?: boolean;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Start typing...",
  className,
  disabled = false,
  minHeight = "200px",
  onSave,
  onSaveAsDraft,
  isSaving = false,
  isDraft = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const lastCursorPosition = useRef<number>(0);

  // Save cursor position
  const saveCursorPosition = useCallback(() => {
    if (!editorRef.current) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(editorRef.current);
    preCaretRange.setEnd(range.endContainer, range.endOffset);

    // Store both text offset and node-based position for better accuracy
    lastCursorPosition.current = preCaretRange.toString().length;
  }, []);

  // Restore cursor position with better handling
  const restoreCursorPosition = useCallback(() => {
    if (!editorRef.current) return;

    try {
      const walker = document.createTreeWalker(
        editorRef.current,
        NodeFilter.SHOW_TEXT,
        null
      );

      let currentOffset = 0;
      let node: Node | null;

      while ((node = walker.nextNode())) {
        const textLength = node.textContent?.length || 0;
        if (currentOffset + textLength >= lastCursorPosition.current) {
          const range = document.createRange();
          const selection = window.getSelection();

          const offset = Math.min(
            Math.max(0, lastCursorPosition.current - currentOffset),
            textLength
          );

          range.setStart(node, offset);
          range.setEnd(node, offset);

          selection?.removeAllRanges();
          selection?.addRange(range);
          return;
        }
        currentOffset += textLength;
      }

      // Fallback: place cursor at the end
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(editorRef.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    } catch (error) {
      console.warn("Failed to restore cursor position:", error);
    }
  }, []);

  const executeCommand = useCallback(
    (command: string, value?: string) => {
      if (!editorRef.current) return;

      // Focus the editor first to ensure commands work properly
      editorRef.current.focus();

      // Save position before command
      saveCursorPosition();

      // Execute the command
      document.execCommand(command, false, value);

      // Trigger content change to update state
      const event = new Event("input", { bubbles: true });
      editorRef.current.dispatchEvent(event);
    },
    [saveCursorPosition]
  );

  // Keyboard shortcuts handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      if (cmdOrCtrl && e.key === "s") {
        e.preventDefault();
        if (e.shiftKey && onSaveAsDraft) {
          onSaveAsDraft();
        } else if (onSave) {
          onSave();
        }
      }
    },
    [onSave, onSaveAsDraft]
  );

  // Add/remove keyboard event listener
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

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
        const userInput = prompt(`Enter ${button.label.toLowerCase()}:`);
        if (userInput) {
          executeCommand(button.command, userInput);
        }
      } else {
        executeCommand(button.command, button.value);
      }
    },
    [executeCommand]
  );

  const handleContentChange = useCallback(
    (e: React.FormEvent<HTMLDivElement>) => {
      saveCursorPosition();
      const content = e.currentTarget.innerHTML;
      onChange(content);
    },
    [onChange, saveCursorPosition]
  );

  // Handle keyboard events within the editor
  const handleEditorKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      // Save cursor position on any key press
      saveCursorPosition();

      // Handle backspace and delete more gracefully
      if (e.key === "Backspace" || e.key === "Delete") {
        // Let the default behavior happen, but save position
        setTimeout(() => {
          if (editorRef.current) {
            const content = editorRef.current.innerHTML;
            onChange(content);
          }
        }, 0);
      }
    },
    [saveCursorPosition, onChange]
  );

  // Update editor content while preserving cursor position
  useEffect(() => {
    if (!editorRef.current) return;

    // Only update if the content is different to avoid infinite loops
    if (editorRef.current.innerHTML !== value) {
      const wasActive = document.activeElement === editorRef.current;
      editorRef.current.innerHTML = value;

      // Restore cursor position if the editor was active
      if (wasActive) {
        requestAnimationFrame(() => {
          restoreCursorPosition();
        });
      }
    }
  }, [value, restoreCursorPosition]);

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
              type="button"
              className="h-8 w-8 p-0"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleToolbarClick(toolbarButton);
              }}
              disabled={disabled}
              title={`${toolbarButton.label}${
                toolbarButton.shortcut ? ` (${toolbarButton.shortcut})` : ""
              }`}
            >
              <Icon className="h-4 w-4" />
            </Button>
          );
        })}

        <div className="ml-auto flex items-center gap-2">
          {/* Save Buttons */}
          {onSave && (
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onSave();
              }}
              disabled={disabled || isSaving}
              className="h-8 px-3 text-xs"
              title="Save (Ctrl+S / Cmd+S)"
            >
              <Save className="h-3 w-3 mr-1" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
          )}

          {onSaveAsDraft && (
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onSaveAsDraft();
              }}
              disabled={disabled || isSaving}
              className="h-8 px-3 text-xs"
              title="Save as Draft (Ctrl+Shift+S / Cmd+Shift+S)"
            >
              <FileText className="h-3 w-3 mr-1" />
              Draft
            </Button>
          )}

          {/* Draft Indicator */}
          {isDraft && (
            <span className="text-xs text-orange-600 font-medium">• Draft</span>
          )}

          <div className="w-px h-6 bg-gray-300 mx-1" />

          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            disabled={disabled}
          >
            {isExpanded ? "Collapse" : "Expand"}
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div
        ref={editorRef}
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
        onInput={handleContentChange}
        onKeyDown={handleEditorKeyDown}
        onKeyUp={saveCursorPosition}
        onMouseUp={saveCursorPosition}
        onFocus={saveCursorPosition}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
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
