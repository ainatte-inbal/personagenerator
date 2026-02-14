// Type definitions
export type ArchetypeKey = "producer" | "consumer" | "operator" | "steward";
export type ContextKey = "pdx" | "gbsg" | "cg" | "idx";
export type ExperienceKey = "junior" | "senior";

export interface JTBD {
  type: "Functional" | "Social" | "Emotional";
  statement: string;
}

export interface PersonaInstance {
  instanceName: string;
  archetype: ArchetypeKey;
  archetypeTitle: string;
  archetypeSubtitle: string;
  context: ContextKey;
  contextLabel: string;
  experience: ExperienceKey;
  experienceLabel: string;
  modifier: string;
  motivation: string;
  friction: string;
  jtbds: JTBD[];
}

export interface GeneratedPersona {
  name: string;
  instanceName: string;
  role: string;
  badge: string;
  modifier: string;
  motivation: string;
  quote: string;
  frictions: string[];
  jtbds: JTBD[];
}

// Persona Instances based on the table
export const personaInstances: PersonaInstance[] = [
  {
    instanceName: "The Standardization Architect",
    archetype: "producer",
    archetypeTitle: "The Producer",
    archetypeSubtitle: "The Enabler",
    context: "pdx",
    contextLabel: "PDX (Platform)",
    experience: "senior",
    experienceLabel: "Senior / Expert",
    modifier: 'Needs "Golden Signals" and strict standardization',
    motivation: "Build once, reuse everywhere.",
    friction:
      "Undifferentiated heavy lifting—manually scaffolding infrastructure instead of writing logic.",
    jtbds: [
      {
        type: "Functional",
        statement:
          "When I build a new asset type, I want to codify it into a reusable template, so that I can ensure every downstream consumer follows best practices for security and performance.",
      },
      {
        type: "Social",
        statement:
          "When I provide a standardized framework, I want to be seen as a strategic enabler rather than a bottleneck, reducing the need for manual hand-holding.",
      },
    ],
  },
  {
    instanceName: 'The "Shadow IT" Builder',
    archetype: "producer",
    archetypeTitle: "The Producer",
    archetypeSubtitle: "The Enabler",
    context: "gbsg",
    contextLabel: "GBSG (Small Biz)",
    experience: "senior",
    experienceLabel: "Senior",
    modifier: "Speed > Standards—will bypass platform if too slow",
    motivation: "I need to unblock my team now.",
    friction:
      'Rigid wizards that hide complexity—"Give me the escape hatch."',
    jtbds: [
      {
        type: "Functional",
        statement:
          "When the platform is too slow, I want to build bespoke pipelines, so that I can bypass platform lag and deliver on time.",
      },
      {
        type: "Social",
        statement:
          'When I need to move fast, I want to avoid "asking for permission" from central platform teams, so that I can unblock my team immediately.',
      },
    ],
  },
  {
    instanceName: 'The "Copy-Paste" Maker',
    archetype: "consumer",
    archetypeTitle: "The Consumer",
    archetypeSubtitle: "The Maker",
    context: "cg",
    contextLabel: "CG (Consumer/Tax)",
    experience: "junior",
    experienceLabel: "Junior / Novice",
    modifier: "Compliance-focused, relies on copy-pasting code snippets",
    motivation: "Time to Value—I view the platform as a utility.",
    friction:
      "The Treasure Hunt—struggling to find the right API keys, documentation, or access permissions.",
    jtbds: [
      {
        type: "Functional",
        statement:
          "When I integrate a new capability, I want a self-serve sandbox, so that I can test it immediately without waiting for approvals.",
      },
      {
        type: "Emotional",
        statement:
          "When I deploy, I want to trust the dependencies won't break, so that I don't look incompetent to my PM.",
      },
    ],
  },
  {
    instanceName: "The Ecosystem Integrator",
    archetype: "consumer",
    archetypeTitle: "The Consumer",
    archetypeSubtitle: "The Maker",
    context: "gbsg",
    contextLabel: "GBSG (Small Biz)",
    experience: "senior",
    experienceLabel: "Senior",
    modifier: "Focused on workflow integration and ecosystem connectivity",
    motivation: "Seamless connectivity across products.",
    friction: "Rate limits and architectural constraints blocking integration.",
    jtbds: [
      {
        type: "Functional",
        statement:
          "When I design integrations, I want to architect complex cross-product flows (QuickBooks ↔ Mailchimp), so that I can deliver seamless user experiences.",
      },
      {
        type: "Functional",
        statement:
          "When evaluating new APIs, I want to assess latency and reliability upfront, so that I can make informed architectural decisions.",
      },
    ],
  },
  {
    instanceName: "The Runbook Responder",
    archetype: "operator",
    archetypeTitle: "The Operator",
    archetypeSubtitle: "The Maintainer",
    context: "idx",
    contextLabel: "IDX (Connectivity)",
    experience: "junior",
    experienceLabel: "Junior",
    modifier: "Runbook-dependent, needs step-by-step guidance",
    motivation: "Mean Time to Resolution (MTTR)—clarity over raw data.",
    friction:
      "Black Boxes—being woken up by alerts I can't understand or fix.",
    jtbds: [
      {
        type: "Functional",
        statement:
          'When an incident occurs, I want to immediately identify if it\'s "Us vs. Them" (Internal code vs. 3rd Party Provider), so that I can route the ticket correctly.',
      },
      {
        type: "Social",
        statement:
          "When I hand off an issue, I want a full audit trail, so that engineering doesn't bounce it back to me.",
      },
    ],
  },
  {
    instanceName: "The Compliance Gatekeeper",
    archetype: "steward",
    archetypeTitle: "The Steward",
    archetypeSubtitle: "The Governor",
    context: "cg",
    contextLabel: "CG (Consumer/Tax)",
    experience: "senior",
    experienceLabel: "Tenured Manager",
    modifier: "PII-obsessed, focused on regulatory compliance",
    motivation: "Risk Mitigation & Efficiency.",
    friction:
      'Fragmented Visibility—having to check 10 different dashboards to answer "Are we compliant?"',
    jtbds: [
      {
        type: "Functional",
        statement:
          'When I audit my team\'s assets, I want a single "Health Score" dashboard, so that I can prioritize technical debt effectively.',
      },
      {
        type: "Emotional",
        statement:
          "When a new regulation passes, I want automated enforcement, so that I can sleep at night knowing we aren't exposed.",
      },
    ],
  },
];

// Archetype base data for tooltips and descriptions
export const archetypeInfo: Record<
  ArchetypeKey,
  { title: string; subtitle: string; description: string }
> = {
  producer: {
    title: "The Producer",
    subtitle: "The Enabler",
    description:
      "The technical user who creates the underlying assets (Data Pipelines, API Integrations, AI Models) that others will use. They are responsible for the 'plumbing.'",
  },
  consumer: {
    title: "The Consumer",
    subtitle: "The Maker",
    description:
      "The user who applies the platform capabilities to build business value. They 'consume' the APIs, Data, or Models to build features.",
  },
  operator: {
    title: "The Operator",
    subtitle: "The Maintainer",
    description:
      "The user responsible for the health, reliability, and lifecycle of systems in production. They are the 'Firefighters.'",
  },
  steward: {
    title: "The Steward",
    subtitle: "The Governor",
    description:
      "The non-coding user responsible for standards, compliance, cost, and quality governance.",
  },
};

// Dropdown options
export const archetypeOptions = [
  { value: "producer", label: "The Producer (Enabler)" },
  { value: "consumer", label: "The Consumer (Maker)" },
  { value: "operator", label: "The Operator (Maintainer)" },
  { value: "steward", label: "The Steward (Governor)" },
] as const;

export const contextOptions = [
  { value: "pdx", label: "PDX (Platform)" },
  { value: "gbsg", label: "GBSG (Small Biz)" },
  { value: "cg", label: "CG (Consumer/Tax)" },
  { value: "idx", label: "IDX (Connectivity)" },
] as const;

export const experienceOptions = [
  { value: "junior", label: "Junior / Novice" },
  { value: "senior", label: "Senior / Lead" },
] as const;

// Find matching persona instance
function findPersonaInstance(
  archetype: ArchetypeKey,
  context: ContextKey,
  experience: ExperienceKey
): PersonaInstance | null {
  return (
    personaInstances.find(
      (p) =>
        p.archetype === archetype &&
        p.context === context &&
        p.experience === experience
    ) || null
  );
}

// Find closest matching persona (same archetype, any context/experience)
function findClosestPersona(archetype: ArchetypeKey): PersonaInstance {
  return (
    personaInstances.find((p) => p.archetype === archetype) ||
    personaInstances[0]
  );
}

// Persona generation function
export function generatePersona(
  archetype: ArchetypeKey,
  context: ContextKey,
  experience: ExperienceKey
): GeneratedPersona {
  // Try to find exact match
  let instance = findPersonaInstance(archetype, context, experience);

  // If no exact match, find closest by archetype
  if (!instance) {
    instance = findClosestPersona(archetype);
  }

  const expLabel = experience === "senior" ? "Sr." : "Jr.";
  const contextLabel =
    contextOptions.find((c) => c.value === context)?.label || context;

  return {
    name: `${instance.archetypeTitle} (${expLabel})`,
    instanceName: instance.instanceName,
    role: `${instance.archetypeSubtitle} | ${contextLabel} | ${instance.experienceLabel}`,
    badge: instance.archetypeTitle.replace("The ", ""),
    modifier: instance.modifier,
    motivation: instance.motivation,
    quote: instance.motivation,
    frictions: [instance.friction],
    jtbds: instance.jtbds,
  };
}

// Helper to get all JTBDs with context
export function getAllJTBDsWithContext() {
  const results: Array<{
    id: string;
    archetype: ArchetypeKey;
    archetypeLabel: string;
    instanceName: string;
    context: ContextKey;
    contextLabel: string;
    experience: ExperienceKey;
    experienceLabel: string;
    jtbd: JTBD;
    modifier: string;
    motivation: string;
    friction: string;
  }> = [];

  for (const instance of personaInstances) {
    for (const jtbd of instance.jtbds) {
      results.push({
        id: `${instance.archetype}-${instance.context}-${instance.experience}-${jtbd.type}-${results.length}`,
        archetype: instance.archetype,
        archetypeLabel: instance.archetypeTitle.replace("The ", ""),
        instanceName: instance.instanceName,
        context: instance.context,
        contextLabel: instance.contextLabel,
        experience: instance.experience,
        experienceLabel: instance.experienceLabel,
        jtbd,
        modifier: instance.modifier,
        motivation: instance.motivation,
        friction: instance.friction,
      });
    }
  }

  return results;
}
