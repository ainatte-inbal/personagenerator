"use client";

import { useState } from "react";
import Link from "next/link";
import PersonaControls from "@/components/PersonaControls";
import PersonaCard from "@/components/PersonaCard";
import ArchetypeDescription from "@/components/ArchetypeDescription";
import {
  ArchetypeKey,
  ContextKey,
  ExperienceKey,
  GeneratedPersona,
  generatePersona,
} from "@/lib/personaData";

export default function Home() {
  const [archetype, setArchetype] = useState<ArchetypeKey>("producer");
  const [context, setContext] = useState<ContextKey>("pdx");
  const [experience, setExperience] = useState<ExperienceKey>("junior");
  const [persona, setPersona] = useState<GeneratedPersona | null>(null);

  const handleGenerate = () => {
    const generated = generatePersona(archetype, context, experience);
    setPersona(generated);
  };

  const handleArchetypeChange = (value: ArchetypeKey) => {
    setArchetype(value);
    setPersona(null); // Clear persona to show description again
  };

  return (
    <main className="p-10 flex flex-col items-center min-h-screen">
      {/* Header */}
      <div className="max-w-4xl w-full text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Developer Persona Generator
        </h1>
        <p className="text-gray-500 mt-2">
          Configure the inputs to generate a contextual user profile.
        </p>
        <Link
          href="/jtbd"
          className="inline-flex items-center gap-2 mt-4 text-intuit-blue hover:text-intuit-blue-dark transition-colors font-medium"
        >
          View All Jobs to be Done
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      {/* Controls */}
      <PersonaControls
        archetype={archetype}
        context={context}
        experience={experience}
        onArchetypeChange={handleArchetypeChange}
        onContextChange={setContext}
        onExperienceChange={setExperience}
        onGenerate={handleGenerate}
      />

      {/* Show either Archetype Description OR Generated Persona */}
      {persona ? (
        <PersonaCard persona={persona} />
      ) : (
        <ArchetypeDescription archetype={archetype} />
      )}
    </main>
  );
}
