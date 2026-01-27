"use client";

import { useState } from "react";

interface JTBDCardProps {
  archetype: string;
  context: string;
  experience: string;
  action: string;
  outcome: string;
}

export default function JTBDCard({
  archetype,
  context,
  experience,
  action,
  outcome,
}: JTBDCardProps) {
  const [copied, setCopied] = useState(false);

  const jtbdText = `When I start a new project, I want to ${action}, so that I can ${outcome}.`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jtbdText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="bg-blue-100 text-intuit-blue text-xs font-semibold px-2 py-1 rounded">
          {archetype}
        </span>
        <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded">
          {context}
        </span>
        <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-1 rounded">
          {experience}
        </span>
      </div>

      {/* JTBD Statement */}
      <p className="text-gray-700 leading-relaxed mb-4">
        &ldquo;When I start a new project, I want to{" "}
        <strong className="text-intuit-blue">{action}</strong>, so that I can{" "}
        <strong className="text-intuit-blue">{outcome}</strong>.&rdquo;
      </p>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-md transition-all ${
          copied
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        {copied ? (
          <>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Copy JTBD
          </>
        )}
      </button>
    </div>
  );
}
