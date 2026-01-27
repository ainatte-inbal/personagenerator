"use client";

import { useState } from "react";
import PersonaControls from "@/components/PersonaControls";
import PersonaCard from "@/components/PersonaCard";
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
      </div>

      {/* Controls */}
      <PersonaControls
        archetype={archetype}
        context={context}
        experience={experience}
        onArchetypeChange={setArchetype}
        onContextChange={setContext}
        onExperienceChange={setExperience}
        onGenerate={handleGenerate}
      />

      {/* Output */}
      {persona && <PersonaCard persona={persona} />}
    </main>
  );
}
