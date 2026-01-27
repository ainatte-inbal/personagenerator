"use client";

import { useState, useMemo } from "react";
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

interface JTBD {
  id: string;
  archetype: string;
  archetypeLabel: string;
  context: string;
  contextLabel: string;
  experience: string;
  experienceLabel: string;
  action: string;
  outcome: string;
}

// Generate all JTBD combinations
function getAllJTBDs(): JTBD[] {
  const jtbds: JTBD[] = [];

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
  const allJTBDs = useMemo(() => getAllJTBDs(), []);

  // Filter state
  const [archetypeFilter, setArchetypeFilter] = useState<string>("all");
  const [contextFilter, setContextFilter] = useState<string>("all");
  const [experienceFilter, setExperienceFilter] = useState<string>("all");

  // Filtered JTBDs
  const filteredJTBDs = useMemo(() => {
    return allJTBDs.filter((jtbd) => {
      if (archetypeFilter !== "all" && jtbd.archetype !== archetypeFilter)
        return false;
      if (contextFilter !== "all" && jtbd.context !== contextFilter)
        return false;
      if (experienceFilter !== "all" && jtbd.experience !== experienceFilter)
        return false;
      return true;
    });
  }, [allJTBDs, archetypeFilter, contextFilter, experienceFilter]);

  const clearFilters = () => {
    setArchetypeFilter("all");
    setContextFilter("all");
    setExperienceFilter("all");
  };

  const hasActiveFilters =
    archetypeFilter !== "all" ||
    contextFilter !== "all" ||
    experienceFilter !== "all";

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
          Browse all JTBD combinations across archetypes, contexts, and
          experience levels.
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-6xl w-full mb-6">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex flex-wrap items-end gap-4">
            {/* Archetype Filter */}
            <div className="flex-1 min-w-[180px]">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                <span className="inline-block w-2 h-2 bg-blue-100 rounded mr-2"></span>
                Archetype
              </label>
              <select
                value={archetypeFilter}
                onChange={(e) => setArchetypeFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-intuit-blue focus:border-intuit-blue transition-colors cursor-pointer"
              >
                <option value="all">All Archetypes</option>
                {archetypeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Context Filter */}
            <div className="flex-1 min-w-[180px]">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                <span className="inline-block w-2 h-2 bg-gray-200 rounded mr-2"></span>
                Context
              </label>
              <select
                value={contextFilter}
                onChange={(e) => setContextFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-intuit-blue focus:border-intuit-blue transition-colors cursor-pointer"
              >
                <option value="all">All Contexts</option>
                {contextOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Experience Filter */}
            <div className="flex-1 min-w-[180px]">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                <span className="inline-block w-2 h-2 bg-amber-100 rounded mr-2"></span>
                Experience
              </label>
              <select
                value={experienceFilter}
                onChange={(e) => setExperienceFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-intuit-blue focus:border-intuit-blue transition-colors cursor-pointer"
              >
                <option value="all">All Experience Levels</option>
                {experienceOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-6xl w-full mb-4">
        <p className="text-sm text-gray-500">
          Showing {filteredJTBDs.length} of {allJTBDs.length} JTBDs
        </p>
      </div>

      {/* JTBD Grid */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredJTBDs.map((jtbd) => (
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

      {/* Empty State */}
      {filteredJTBDs.length === 0 && (
        <div className="max-w-6xl w-full text-center py-12">
          <p className="text-gray-500">
            No JTBDs match your filters.{" "}
            <button
              onClick={clearFilters}
              className="text-intuit-blue hover:underline"
            >
              Clear filters
            </button>
          </p>
        </div>
      )}
    </main>
  );
}
