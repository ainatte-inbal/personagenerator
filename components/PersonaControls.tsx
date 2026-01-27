"use client";

import SelectField from "./SelectField";
import Tooltip from "./Tooltip";
import {
  ArchetypeKey,
  ContextKey,
  ExperienceKey,
  archetypeOptions,
  contextOptions,
  experienceOptions,
  baseData,
} from "@/lib/personaData";

interface PersonaControlsProps {
  archetype: ArchetypeKey;
  context: ContextKey;
  experience: ExperienceKey;
  onArchetypeChange: (value: ArchetypeKey) => void;
  onContextChange: (value: ContextKey) => void;
  onExperienceChange: (value: ExperienceKey) => void;
  onGenerate: () => void;
}

const archetypeTooltips: Record<ArchetypeKey, string> = {
  producer: baseData.producer.definition,
  consumer: baseData.consumer.definition,
  operator: baseData.operator.definition,
  steward: baseData.steward.definition,
};

export default function PersonaControls({
  archetype,
  context,
  experience,
  onArchetypeChange,
  onContextChange,
  onExperienceChange,
  onGenerate,
}: PersonaControlsProps) {
  return (
    <div className="max-w-4xl w-full bg-white p-6 rounded-xl shadow-sm border border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <Tooltip content={archetypeTooltips[archetype]}>
          <label
            htmlFor="archetype"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Archetype
          </label>
        </Tooltip>
        <select
          id="archetype"
          value={archetype}
          onChange={(e) => onArchetypeChange(e.target.value as ArchetypeKey)}
          className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-intuit-blue focus:border-intuit-blue transition-colors cursor-pointer"
        >
          {archetypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <SelectField
        label="Context"
        id="context"
        value={context}
        onChange={(v) => onContextChange(v as ContextKey)}
        options={contextOptions}
      />

      <SelectField
        label="Experience"
        id="experience"
        value={experience}
        onChange={(v) => onExperienceChange(v as ExperienceKey)}
        options={experienceOptions}
      />

      <div className="flex items-end">
        <button
          onClick={onGenerate}
          className="w-full bg-intuit-blue hover:bg-intuit-blue-dark text-white font-bold py-2 px-4 rounded-md shadow-md transition-colors duration-200"
        >
          Generate Persona
        </button>
      </div>
    </div>
  );
}
