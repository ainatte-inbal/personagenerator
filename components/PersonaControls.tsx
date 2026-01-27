"use client";

import SelectField from "./SelectField";
import {
  ArchetypeKey,
  ContextKey,
  ExperienceKey,
  archetypeOptions,
  contextOptions,
  experienceOptions,
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
      <SelectField
        label="Archetype"
        id="archetype"
        value={archetype}
        onChange={(v) => onArchetypeChange(v as ArchetypeKey)}
        options={archetypeOptions}
      />

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
