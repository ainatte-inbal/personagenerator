"use client";

import { GeneratedPersona } from "@/lib/personaData";

interface PersonaCardProps {
  persona: GeneratedPersona;
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

export default function PersonaCard({ persona }: PersonaCardProps) {
  return (
    <div className="max-w-4xl w-full mt-8 animate-fade-in-up">
      <div className="bg-white rounded-xl shadow-lg border-l-8 border-intuit-blue overflow-hidden">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-intuit-blue font-semibold mb-1">
                {persona.instanceName}
              </p>
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

          {/* Modifier */}
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-sm text-amber-800">
              <span className="font-semibold">Modifier:</span> {persona.modifier}
            </p>
          </div>

          {/* Motivation */}
          <blockquote className="mt-4 border-l-4 border-intuit-blue pl-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Core Motivation
            </p>
            <p className="text-gray-800 text-lg font-medium">
              &ldquo;{persona.motivation}&rdquo;
            </p>
          </blockquote>

          <hr className="my-6 border-gray-100" />

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Friction Points */}
            <div>
              <h3 className="font-bold text-gray-800 flex items-center mb-3">
                <span className="mr-2">🧨</span>
                Key Friction
              </h3>
              <ul className="space-y-3">
                {persona.frictions.map((friction, index) => (
                  <li
                    key={index}
                    className="text-gray-700 text-sm leading-relaxed pl-4 border-l-2 border-red-200"
                  >
                    {friction}
                  </li>
                ))}
              </ul>
            </div>

            {/* JTBDs */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 flex items-center mb-3">
                <span className="mr-2">🎯</span>
                Jobs to be Done
              </h3>
              <div className="space-y-4">
                {persona.jtbds.map((jtbd, index) => (
                  <div key={index} className="space-y-1">
                    <JTBDTypeBadge type={jtbd.type} />
                    <p className="text-gray-700 text-sm leading-relaxed">
                      &ldquo;{jtbd.statement}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
