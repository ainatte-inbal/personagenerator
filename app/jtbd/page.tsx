"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import JTBDCard from "@/components/JTBDCard";
import {
  archetypeOptions,
  contextOptions,
  experienceOptions,
  getAllJTBDsWithContext,
  archetypeInfo,
  ArchetypeKey,
} from "@/lib/personaData";

interface FilterChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  colorClass: string;
  tooltip?: string;
}

function FilterChip({
  label,
  selected,
  onClick,
  colorClass,
  tooltip,
}: FilterChipProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
          selected
            ? `${colorClass} ring-2 ring-offset-1`
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        {label}
      </button>
      {tooltip && showTooltip && (
        <div className="absolute z-50 left-0 top-full mt-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl">
          <div className="absolute -top-1.5 left-4 w-3 h-3 bg-gray-900 rotate-45"></div>
          {tooltip}
        </div>
      )}
    </div>
  );
}

export default function JTBDPage() {
  const allJTBDs = useMemo(() => getAllJTBDsWithContext(), []);

  // Filter state - arrays for multi-select
  const [archetypeFilters, setArchetypeFilters] = useState<Set<string>>(
    new Set()
  );
  const [contextFilters, setContextFilters] = useState<Set<string>>(new Set());
  const [experienceFilters, setExperienceFilters] = useState<Set<string>>(
    new Set()
  );
  const [typeFilters, setTypeFilters] = useState<Set<string>>(new Set());

  // Toggle filter functions
  const toggleArchetype = (value: string) => {
    setArchetypeFilters((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  const toggleContext = (value: string) => {
    setContextFilters((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  const toggleExperience = (value: string) => {
    setExperienceFilters((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  const toggleType = (value: string) => {
    setTypeFilters((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  // Filtered JTBDs
  const filteredJTBDs = useMemo(() => {
    return allJTBDs.filter((item) => {
      if (archetypeFilters.size > 0 && !archetypeFilters.has(item.archetype))
        return false;
      if (contextFilters.size > 0 && !contextFilters.has(item.context))
        return false;
      if (experienceFilters.size > 0 && !experienceFilters.has(item.experience))
        return false;
      if (typeFilters.size > 0 && !typeFilters.has(item.jtbd.type))
        return false;
      return true;
    });
  }, [allJTBDs, archetypeFilters, contextFilters, experienceFilters, typeFilters]);

  const clearFilters = () => {
    setArchetypeFilters(new Set());
    setContextFilters(new Set());
    setExperienceFilters(new Set());
    setTypeFilters(new Set());
  };

  const hasActiveFilters =
    archetypeFilters.size > 0 ||
    contextFilters.size > 0 ||
    experienceFilters.size > 0 ||
    typeFilters.size > 0;

  const downloadCSV = () => {
    const headers = [
      "Archetype",
      "Context",
      "Experience",
      "JTBD Type",
      "JTBD Statement",
      "Context Impact",
      "Experience Impact",
    ];

    const rows = filteredJTBDs.map((item) => [
      item.archetypeLabel,
      item.contextLabel,
      item.experienceLabel,
      item.jtbd.type,
      `"${item.jtbd.statement.replace(/"/g, '""')}"`,
      `"${item.contextImpact.replace(/"/g, '""')}"`,
      `"${item.experienceImpact.replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "jtbd-export.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  };

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
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-gray-800">
            All Jobs to be Done
          </h1>
          <button
            onClick={downloadCSV}
            className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors text-sm"
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download CSV
          </button>
        </div>
        <p className="text-gray-500 mt-2">
          Browse all JTBD statements across archetypes, contexts, experience
          levels, and types.
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
              <span className="font-normal text-gray-500 ml-2">
                (hover for details)
              </span>
            </label>
            <div className="flex flex-wrap gap-2">
              {archetypeOptions.map((opt) => (
                <FilterChip
                  key={opt.value}
                  label={opt.label}
                  selected={archetypeFilters.has(opt.value)}
                  onClick={() => toggleArchetype(opt.value)}
                  colorClass="bg-blue-100 text-blue-800 ring-blue-400"
                  tooltip={archetypeInfo[opt.value as ArchetypeKey].description}
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

          {/* JTBD Type Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="inline-block w-2 h-2 bg-green-400 rounded mr-2"></span>
              JTBD Type
            </label>
            <div className="flex flex-wrap gap-2">
              <FilterChip
                label="Functional"
                selected={typeFilters.has("Functional")}
                onClick={() => toggleType("Functional")}
                colorClass="bg-green-100 text-green-800 ring-green-400"
                tooltip="Task-oriented goals: What the user needs to accomplish"
              />
              <FilterChip
                label="Social"
                selected={typeFilters.has("Social")}
                onClick={() => toggleType("Social")}
                colorClass="bg-purple-100 text-purple-800 ring-purple-400"
                tooltip="Team/communication goals: How the user wants to be perceived"
              />
              <FilterChip
                label="Emotional"
                selected={typeFilters.has("Emotional")}
                onClick={() => toggleType("Emotional")}
                colorClass="bg-rose-100 text-rose-800 ring-rose-400"
                tooltip="Personal feeling goals: How the user wants to feel"
              />
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
        {filteredJTBDs.map((item) => (
          <JTBDCard
            key={item.id}
            archetype={item.archetypeLabel}
            instanceName={item.instanceName}
            context={item.contextLabel}
            experience={item.experienceLabel}
            jtbd={item.jtbd}
            modifier={item.modifier}
            motivation={item.motivation}
            friction={item.friction}
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
