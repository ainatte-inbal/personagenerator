"use client";

import Link from "next/link";
import JTBDCard from "@/components/JTBDCard";
import {
  archetypeOptions,
  contextOptions,
  experienceOptions,
  baseData,
  contextModifiers,
  expModifiers,
  ArchetypeKey,
  ContextKey,
  ExperienceKey,
} from "@/lib/personaData";

// Generate all JTBD combinations
function getAllJTBDs() {
  const jtbds: Array<{
    id: string;
    archetype: string;
    archetypeLabel: string;
    context: string;
    contextLabel: string;
    experience: string;
    experienceLabel: string;
    action: string;
    outcome: string;
  }> = [];

  for (const arch of archetypeOptions) {
    for (const ctx of contextOptions) {
      for (const exp of experienceOptions) {
        const archData = baseData[arch.value as ArchetypeKey];
        const ctxData = contextModifiers[ctx.value as ContextKey];
        const expData = expModifiers[exp.value as ExperienceKey];

        jtbds.push({
          id: `${arch.value}-${ctx.value}-${exp.value}`,
          archetype: arch.value,
          archetypeLabel: archData.badge,
          context: ctx.value,
          contextLabel: ctx.label,
          experience: exp.value,
          experienceLabel: exp.label,
          action: expData.action,
          outcome: ctxData.outcome,
        });
      }
    }
  }

  return jtbds;
}

export default function JTBDPage() {
  const allJTBDs = getAllJTBDs();

  return (
    <main className="p-10 flex flex-col items-center min-h-screen">
      {/* Header */}
      <div className="max-w-6xl w-full mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-intuit-blue hover:text-intuit-blue-dark mb-4 transition-colors"
        >
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Generator
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">
          All Jobs to be Done
        </h1>
        <p className="text-gray-500 mt-2">
          Browse all {allJTBDs.length} JTBD combinations across archetypes,
          contexts, and experience levels.
        </p>
      </div>

      {/* Filter Info */}
      <div className="max-w-6xl w-full mb-6">
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-100 rounded"></span>
            Archetype
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-gray-100 rounded"></span>
            Context
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-amber-100 rounded"></span>
            Experience
          </span>
        </div>
      </div>

      {/* JTBD Grid */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allJTBDs.map((jtbd) => (
          <JTBDCard
            key={jtbd.id}
            archetype={jtbd.archetypeLabel}
            context={jtbd.contextLabel}
            experience={jtbd.experienceLabel}
            action={jtbd.action}
            outcome={jtbd.outcome}
          />
        ))}
      </div>
    </main>
  );
}
