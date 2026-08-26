import React from "react";

export type LineType = "normal" | "command" | "warning" | "success" | "muted" | "prompt";

export interface TerminalLineProps {
  content: string;
  type?: LineType;
  className?: string;
}

export const TerminalLine: React.FC<TerminalLineProps> = ({
  content,
  type = "normal",
  className = "",
}) => {
  // Determine styles based on line type and content patterns
  let typeClasses = "text-zinc-200";

  if (type === "warning" || content.includes("WARNING:")) {
    typeClasses = "text-amber-400 font-medium";
  } else if (type === "success" || content.includes("[  OK  ]")) {
    typeClasses = "text-green-400 font-medium";
  } else if (type === "command" || content.startsWith("==>") || content.startsWith("  ->")) {
    typeClasses = "text-zinc-300 font-normal";
  } else if (type === "muted" || content.startsWith("(")) {
    typeClasses = "text-zinc-400";
  } else if (type === "prompt") {
    typeClasses = "text-zinc-100 font-semibold";
  }

  // Format special tokens inside the line (e.g., [  OK  ] and WARNING:)
  const renderFormattedContent = () => {
    if (content.includes("[  OK  ]")) {
      const parts = content.split("[  OK  ]");
      return (
        <span>
          {parts[0]}
          <span className="text-green-400 font-bold">[  OK  ]</span>
          <span className="text-zinc-200">{parts[1]}</span>
        </span>
      );
    }

    if (content.includes("WARNING:")) {
      const parts = content.split("WARNING:");
      return (
        <span>
          <span className="text-amber-400 font-bold">{parts[0]}WARNING:</span>
          <span className="text-amber-300">{parts[1]}</span>
        </span>
      );
    }

    if (content.startsWith("root@")) {
      const parts = content.split("~");
      const userHost = parts[0]?.trim() || "root@archtitan";
      return (
        <span>
          <span className="text-emerald-400 font-semibold">{userHost}</span>
          <span className="text-zinc-400"> </span>
          <span className="text-sky-400">~</span>
          <span className="text-zinc-200">{parts[1] || " # "}</span>
        </span>
      );
    }

    return content;
  };

  return (
    <div className={`leading-[1.35] tracking-tight whitespace-pre-wrap break-words ${typeClasses} ${className}`}>
      {renderFormattedContent()}
    </div>
  );
};
