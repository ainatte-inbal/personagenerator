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

interface FilterChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  colorClass: string;
}

function FilterChip({ label, selected, onClick, colorClass }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
        selected
          ? `${colorClass} ring-2 ring-offset-1`
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
}

export default function JTBDPage() {
  const allJTBDs = useMemo(() => getAllJTBDs(), []);

  // Filter state - now arrays for multi-select
  const [archetypeFilters, setArchetypeFilters] = useState<Set<string>>(
    new Set()
  );
  const [contextFilters, setContextFilters] = useState<Set<string>>(new Set());
  const [experienceFilters, setExperienceFilters] = useState<Set<string>>(
    new Set()
  );

  // Toggle filter functions
  const toggleArchetype = (value: string) => {
    setArchetypeFilters((prev) => {
      const next = new Set(prev);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
  };

  const toggleContext = (value: string) => {
    setContextFilters((prev) => {
      const next = new Set(prev);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
  };

  const toggleExperience = (value: string) => {
    setExperienceFilters((prev) => {
      const next = new Set(prev);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
  };

  // Filtered JTBDs
  const filteredJTBDs = useMemo(() => {
    return allJTBDs.filter((jtbd) => {
      if (archetypeFilters.size > 0 && !archetypeFilters.has(jtbd.archetype))
        return false;
      if (contextFilters.size > 0 && !contextFilters.has(jtbd.context))
        return false;
      if (experienceFilters.size > 0 && !experienceFilters.has(jtbd.experience))
        return false;
      return true;
    });
  }, [allJTBDs, archetypeFilters, contextFilters, experienceFilters]);

  const clearFilters = () => {
    setArchetypeFilters(new Set());
    setContextFilters(new Set());
    setExperienceFilters(new Set());
  };

  const hasActiveFilters =
    archetypeFilters.size > 0 ||
    contextFilters.size > 0 ||
    experienceFilters.size > 0;

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
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
          {/* Archetype Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="inline-block w-2 h-2 bg-blue-400 rounded mr-2"></span>
              Archetype
            </label>
            <div className="flex flex-wrap gap-2">
              {archetypeOptions.map((opt) => (
                <FilterChip
                  key={opt.value}
                  label={opt.label}
                  selected={archetypeFilters.has(opt.value)}
                  onClick={() => toggleArchetype(opt.value)}
                  colorClass="bg-blue-100 text-blue-800 ring-blue-400"
                />
              ))}
            </div>
          </div>

          {/* Context Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="inline-block w-2 h-2 bg-gray-400 rounded mr-2"></span>
              Context
            </label>
            <div className="flex flex-wrap gap-2">
              {contextOptions.map((opt) => (
                <FilterChip
                  key={opt.value}
                  label={opt.label}
                  selected={contextFilters.has(opt.value)}
                  onClick={() => toggleContext(opt.value)}
                  colorClass="bg-gray-200 text-gray-800 ring-gray-400"
                />
              ))}
            </div>
          </div>

          {/* Experience Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="inline-block w-2 h-2 bg-amber-400 rounded mr-2"></span>
              Experience
            </label>
            <div className="flex flex-wrap gap-2">
              {experienceOptions.map((opt) => (
                <FilterChip
                  key={opt.value}
                  label={opt.label}
                  selected={experienceFilters.has(opt.value)}
                  onClick={() => toggleExperience(opt.value)}
                  colorClass="bg-amber-100 text-amber-800 ring-amber-400"
                />
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="pt-2 border-t border-gray-100">
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                ✕ Clear all filters
              </button>
            </div>
          )}
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
