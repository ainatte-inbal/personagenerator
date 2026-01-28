// Type definitions
export type ArchetypeKey = "producer" | "consumer" | "operator" | "steward";
export type ContextKey = "pdx" | "gbsg" | "cg";
export type ExperienceKey = "junior" | "senior";

export interface JTBD {
  type: "Functional" | "Social" | "Emotional";
  statement: string;
}

export interface ArchetypeData {
  title: string;
  subtitle: string;
  badge: string;
  definition: string;
  coreContext: string;
  motivation: string;
  universalFriction: string;
  jtbds: JTBD[];
}

export interface ContextModifier {
  label: string;
  impactByArchetype: Record<ArchetypeKey, string>;
}

export interface ExperienceModifier {
  label: string;
  impactByArchetype: Record<ArchetypeKey, string>;
}

export interface GeneratedPersona {
  name: string;
  role: string;
  badge: string;
  definition: string;
  coreContext: string;
  motivation: string;
  quote: string;
  frictions: string[];
  jtbds: JTBD[];
  contextImpact: string;
  experienceImpact: string;
}

// Data dictionaries
export const baseData: Record<ArchetypeKey, ArchetypeData> = {
  producer: {
    title: "The Producer",
    subtitle: "The Enabler",
    badge: "Producer",
    definition:
      "The technical user who creates the underlying assets (Data Pipelines, API Integrations, AI Models) that others will use. They are responsible for the 'plumbing.'",
    coreContext: "Data Engineering, Backend Platform, Integration Engineering",
    motivation: "Build once, reuse everywhere.",
    universalFriction:
      "Undifferentiated heavy lifting—manually setting up infrastructure, scaffolding, or boilerplate config instead of writing logic.",
    jtbds: [
      {
        type: "Functional",
        statement:
          "When I start a new asset, I want a standardized template, so that I don't have to configure infrastructure from scratch.",
      },
      {
        type: "Social",
        statement:
          "When I publish an asset, I want it to be easily discoverable by consumers, so that I don't get pinged constantly on Slack for access.",
      },
    ],
  },
  consumer: {
    title: "The Consumer",
    subtitle: "The Maker",
    badge: "Consumer",
    definition:
      "The user who applies the platform capabilities to build business value. They 'consume' the APIs, Data, or Models produced by Producers to build features (TurboTax UI, Credit Karma offers, etc.).",
    coreContext: "App Developers (Web/Mobile), Data Analysts, ML Engineers",
    motivation: "Time to Value.",
    universalFriction:
      "The Treasure Hunt—struggling to find the right documentation, API keys, or access permissions to get started.",
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
  operator: {
    title: "The Operator",
    subtitle: "The Maintainer",
    badge: "Operator",
    definition:
      "The user responsible for the health, reliability, and lifecycle of the systems in production. They are the 'Firefighters.'",
    coreContext: "SRE, Production Tech Support (PTS), L3 Support",
    motivation: "Mean Time to Resolution (MTTR).",
    universalFriction:
      "Alert Fatigue and Black Boxes—being woken up by alerts they can't fix or don't understand.",
    jtbds: [
      {
        type: "Functional",
        statement:
          "When an incident occurs, I want to know immediately if it's 'Us vs. Them' (Internal code vs. External Provider), so I can route the ticket correctly.",
      },
      {
        type: "Social",
        statement:
          "When I hand off an issue, I want a full audit trail, so engineering doesn't bounce it back to me.",
      },
    ],
  },
  steward: {
    title: "The Steward",
    subtitle: "The Governor",
    badge: "Steward",
    definition:
      "The non-coding (or low-coding) user responsible for standards, compliance, cost, and quality.",
    coreContext:
      "Engineering Managers, Data Stewards, Security Officers, TPMs",
    motivation: "Risk Mitigation & Efficiency.",
    universalFriction:
      "Fragmented Visibility—having to check 10 different dashboards to answer 'Are we compliant?'",
    jtbds: [
      {
        type: "Functional",
        statement:
          "When I audit my team's assets, I want a single dashboard of 'Health Scores,' so I can prioritize technical debt.",
      },
      {
        type: "Emotional",
        statement:
          "When a new regulation passes, I want automated enforcement, so I can sleep at night knowing we aren't exposed.",
      },
    ],
  },
};

export const contextModifiers: Record<ContextKey, ContextModifier> = {
  pdx: {
    label: "PDX (Platform)",
    impactByArchetype: {
      producer:
        "Needs strict adherence to 'Golden Signals' and standardization.",
      consumer: "Focused on platform-level integrations and internal tooling.",
      operator:
        "Monitors system-wide health and aggregate latency across the platform.",
      steward:
        "Oversees platform-wide standards and cross-team compliance metrics.",
    },
  },
  gbsg: {
    label: "GBSG (Small Biz)",
    impactByArchetype: {
      producer:
        "Needs speed; will bypass standards if the platform is too slow ('Shadow IT').",
      consumer:
        "Heavily focused on 'Workflow Integration' and ecosystem connectivity (QuickBooks, Mailchimp).",
      operator:
        "Monitors user-impact on specific business flows and partner integrations.",
      steward:
        "Focused on data quality and external partner reliability.",
    },
  },
  cg: {
    label: "CG (Consumer/Tax)",
    impactByArchetype: {
      producer:
        "Must navigate strict compliance requirements and PII handling protocols.",
      consumer:
        "Heavily focused on 'Compliance' and data privacy/security constraints.",
      operator:
        "Monitors user-impact (e.g., 'Can the user file their taxes?'); cares about specific critical flows.",
      steward:
        "Obsessed with PII (Personally Identifiable Information) and Tax compliance.",
    },
  },
};

export const expModifiers: Record<ExperienceKey, ExperienceModifier> = {
  junior: {
    label: "Junior / Novice",
    impactByArchetype: {
      producer:
        "Needs 'Paved Roads' and CLI wizards; paralyzed by blank slate. Requires 'Hello World' examples and conceptual diagrams.",
      consumer:
        "Relies entirely on copy-pasting code snippets; needs robust documentation and examples.",
      operator:
        "Needs 'Runbooks' and step-by-step remediation guides. Requires visual topology maps to understand dependencies.",
      steward:
        "Focuses on 'Team Velocity' and unblocking developers. New to governance processes.",
    },
  },
  senior: {
    label: "Senior / Lead",
    impactByArchetype: {
      producer:
        "Needs 'Escape Hatches'; frustrated by rigid wizards that hide complexity. Wants full control.",
      consumer:
        "Looks for architecture patterns and limitations (rate limits, latency). May resist new tools unless 10x better.",
      operator:
        "Needs deep-dive observability tools (Splunk/Wavefront) to hunt root causes independently.",
      steward:
        "Focuses on 'Operational Excellence' and long-term stability. Experienced with compliance frameworks.",
    },
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
] as const;

export const experienceOptions = [
  { value: "junior", label: "Junior / Novice" },
  { value: "senior", label: "Senior / Lead" },
] as const;

// Persona generation function
export function generatePersona(
  archetype: ArchetypeKey,
  context: ContextKey,
  experience: ExperienceKey
): GeneratedPersona {
  const base = baseData[archetype];
  const modCtx = contextModifiers[context];
  const modExp = expModifiers[experience];

  const expLabel = experience === "senior" ? "Sr." : "Jr.";

  return {
    name: `${base.title} (${expLabel})`,
    role: `${base.subtitle} | ${modCtx.label} | ${modExp.label}`,
    badge: base.badge,
    definition: base.definition,
    coreContext: base.coreContext,
    motivation: base.motivation,
    quote: base.motivation,
    frictions: [
      base.universalFriction,
      modCtx.impactByArchetype[archetype],
      modExp.impactByArchetype[archetype],
    ],
    jtbds: base.jtbds,
    contextImpact: modCtx.impactByArchetype[archetype],
    experienceImpact: modExp.impactByArchetype[archetype],
  };
}

// Helper to get all JTBDs with context
export function getAllJTBDsWithContext() {
  const results: Array<{
    id: string;
    archetype: ArchetypeKey;
    archetypeLabel: string;
    context: ContextKey;
    contextLabel: string;
    experience: ExperienceKey;
    experienceLabel: string;
    jtbd: JTBD;
    contextImpact: string;
    experienceImpact: string;
  }> = [];

  for (const archKey of Object.keys(baseData) as ArchetypeKey[]) {
    const arch = baseData[archKey];
    for (const ctxKey of Object.keys(contextModifiers) as ContextKey[]) {
      const ctx = contextModifiers[ctxKey];
      for (const expKey of Object.keys(expModifiers) as ExperienceKey[]) {
        const exp = expModifiers[expKey];
        for (const jtbd of arch.jtbds) {
          results.push({
            id: `${archKey}-${ctxKey}-${expKey}-${jtbd.type}`,
            archetype: archKey,
            archetypeLabel: arch.badge,
            context: ctxKey,
            contextLabel: ctx.label,
            experience: expKey,
            experienceLabel: exp.label,
            jtbd,
            contextImpact: ctx.impactByArchetype[archKey],
            experienceImpact: exp.impactByArchetype[archKey],
          });
        }
      }
    }
  }

  return results;
}
