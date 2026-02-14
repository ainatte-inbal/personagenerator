"use client";

import { useState } from "react";
import { JTBD } from "@/lib/personaData";

interface JTBDCardProps {
  archetype: string;
  instanceName: string;
  context: string;
  experience: string;
  jtbd: JTBD;
  modifier: string;
  motivation: string;
  friction: string;
}

function JTBDTypeBadge({ type }: { type: string }) {
  const colors: Record<string, string> = {
    Functional: "bg-green-100 text-green-700",
    Social: "bg-purple-100 text-purple-700",
    Emotional: "bg-rose-100 text-rose-700",
  };

  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded ${colors[type] || "bg-gray-100 text-gray-700"}`}
    >
      {type}
    </span>
  );
}

export default function JTBDCard({
  archetype,
  instanceName,
  context,
  experience,
  jtbd,
  modifier,
  motivation,
  friction,
}: JTBDCardProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jtbd.statement);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
      {/* Instance Name */}
      <p className="text-sm font-semibold text-intuit-blue mb-2">
        {instanceName}
      </p>

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
        <JTBDTypeBadge type={jtbd.type} />
      </div>

      {/* JTBD Statement */}
      <p className="text-gray-700 leading-relaxed mb-4">
        &ldquo;{jtbd.statement}&rdquo;
      </p>

      {/* Expandable Details */}
      {expanded && (
        <div className="mb-4 space-y-2 text-sm animate-fade-in-up">
          <div className="bg-blue-50 p-3 rounded">
            <p className="font-semibold text-blue-800 text-xs mb-1">
              Motivation
            </p>
            <p className="text-blue-900">&ldquo;{motivation}&rdquo;</p>
          </div>
          <div className="bg-amber-50 p-3 rounded">
            <p className="font-semibold text-amber-800 text-xs mb-1">
              Modifier
            </p>
            <p className="text-amber-900">{modifier}</p>
          </div>
          <div className="bg-red-50 p-3 rounded">
            <p className="font-semibold text-red-800 text-xs mb-1">Friction</p>
            <p className="text-red-900">{friction}</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
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
              Copy
            </>
          )}
        </button>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
        >
          {expanded ? (
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
                  d="M5 15l7-7 7 7"
                />
              </svg>
              Less
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              Details
            </>
          )}
        </button>
      </div>
    </div>
  );
}
