"use client";

import { GeneratedPersona } from "@/lib/personaData";

interface PersonaCardProps {
  persona: GeneratedPersona;
}

export default function PersonaCard({ persona }: PersonaCardProps) {
  return (
    <div className="max-w-4xl w-full mt-8 animate-fade-in-up">
      <div className="bg-white rounded-xl shadow-lg border-l-8 border-intuit-blue overflow-hidden">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {persona.name}
              </h2>
              <p className="text-sm text-gray-500 font-mono mt-1 uppercase tracking-wide">
                {persona.role}
              </p>
            </div>
            <span className="bg-blue-100 text-intuit-blue text-xs font-semibold px-2.5 py-0.5 rounded">
              {persona.badge}
            </span>
          </div>

          {/* Quote */}
          <blockquote className="mt-4 border-l-4 border-gray-300 pl-4 italic text-gray-600 text-lg">
            &ldquo;{persona.quote}&rdquo;
          </blockquote>

          <hr className="my-6 border-gray-100" />

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Friction Points */}
            <div>
              <h3 className="font-bold text-gray-800 flex items-center mb-3">
                <span className="mr-2">🧨</span>
                Top Friction Points
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {persona.frictions.map((friction, index) => (
                  <li key={index}>{friction}</li>
                ))}
              </ul>
            </div>

            {/* JTBD */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 flex items-center mb-3">
                <span className="mr-2">🎯</span>
                Primary Job to be Done
              </h3>
              <p className="text-gray-700 leading-relaxed">
                &ldquo;When I start a new project, I want to{" "}
                <strong>{persona.jtbd.action}</strong>, so that I can{" "}
                <strong>{persona.jtbd.outcome}</strong>.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
