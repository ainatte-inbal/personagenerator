"use client";

import { ArchetypeKey } from "@/lib/personaData";
import { archetypeDescriptions } from "@/lib/archetypeDescriptions";

interface ArchetypeDescriptionProps {
  archetype: ArchetypeKey;
}

export default function ArchetypeDescription({
  archetype,
}: ArchetypeDescriptionProps) {
  const desc = archetypeDescriptions[archetype];

  const titles: Record<ArchetypeKey, string> = {
    producer: "THE PRODUCER (The Enabler)",
    consumer: "THE CONSUMER (The Maker)",
    operator: "THE OPERATOR (The Maintainer)",
    steward: "THE STEWARD (The Governor)",
  };

  return (
    <div className="max-w-4xl w-full mt-6 animate-fade-in-up">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-intuit-blue to-blue-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white">{titles[archetype]}</h2>
          <p className="text-blue-100 italic mt-1">&ldquo;{desc.tagline}&rdquo;</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Definition & Context */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Definition
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {desc.definition}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Core Context
              </h3>
              <p className="text-gray-700 text-sm">{desc.coreContext}</p>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mt-4 mb-2">
                Primary Goal
              </h3>
              <p className="text-gray-700 text-sm font-medium">
                {desc.primaryGoal}
              </p>
            </div>
          </div>

          {/* Psychographic Profile */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-bold text-gray-800 flex items-center mb-3">
              <span className="mr-2">🧠</span>
              Psychographic Profile
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-semibold text-gray-700">Mindset: </span>
                <span className="text-gray-600">
                  {desc.psychographicProfile.mindset}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">
                  Trust Signals:{" "}
                </span>
                <span className="text-gray-600">
                  {desc.psychographicProfile.trustSignals}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Fear: </span>
                <span className="text-gray-600">
                  {desc.psychographicProfile.fear}
                </span>
              </div>
            </div>
          </div>

          {/* Friction Points */}
          <div>
            <h3 className="font-bold text-gray-800 flex items-center mb-3">
              <span className="mr-2">⚠️</span>
              Key Friction Points
            </h3>
            <ul className="space-y-2">
              {desc.frictionPoints.map((point, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-700 pl-4 border-l-2 border-red-200"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Modifier Matrix */}
          <div>
            <h3 className="font-bold text-gray-800 flex items-center mb-3">
              <span className="mr-2">🎛️</span>
              The Modifier Matrix
            </h3>
            <ul className="space-y-2">
              {desc.modifierMatrix.map((modifier, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-700 pl-4 border-l-2 border-amber-200"
                >
                  {modifier}
                </li>
              ))}
            </ul>
          </div>

          {/* Voice Quote */}
          <blockquote className="border-l-4 border-intuit-blue pl-4 py-2 bg-gray-50 rounded-r-lg">
            <p className="text-sm font-semibold text-gray-500 mb-1">
              Voice of the {titles[archetype].split(" ")[1].replace("(", "").replace(")", "")}
            </p>
            <p className="text-gray-700 italic leading-relaxed">
              &ldquo;{desc.voiceQuote}&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
