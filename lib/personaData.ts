// Type definitions
export type ArchetypeKey = "producer" | "consumer" | "operator" | "steward";
export type ContextKey = "pdx" | "sbseg" | "cg" | "external";
export type ExperienceKey = "junior" | "senior";

export interface ArchetypeData {
  title: string;
  quote: string;
  badge: string;
}

export interface ContextModifier {
  friction: string;
  outcome: string;
}

export interface ExperienceModifier {
  friction: string;
  action: string;
}

export interface GeneratedPersona {
  name: string;
  role: string;
  badge: string;
  quote: string;
  frictions: string[];
  jtbd: {
    action: string;
    outcome: string;
  };
}

// Data dictionaries
export const baseData: Record<ArchetypeKey, ArchetypeData> = {
  producer: {
    title: "The Integration Builder",
    quote: "I just want to ship code, not configure infrastructure.",
    badge: "Producer",
  },
  consumer: {
    title: "The Value Creator",
    quote: "I don't care how the platform works, I just need the data.",
    badge: "Consumer",
  },
  operator: {
    title: "The Reliability Guardian",
    quote: "Stop waking me up for alerts I can't fix.",
    badge: "Operator",
  },
  steward: {
    title: "The Policy Enforcer",
    quote: "I can't approve this if I can't see the lineage.",
    badge: "Steward",
  },
};

export const contextModifiers: Record<ContextKey, ContextModifier> = {
  pdx: {
    friction: "Standards enforcement & metric pressure",
    outcome: "improve DORA metrics",
  },
  sbseg: {
    friction: "Connecting fragmented workflows (QB + Mailchimp)",
    outcome: "automate the user workflow",
  },
  cg: {
    friction: "Strict compliance & PII red tape",
    outcome: "ensure tax compliance",
  },
  external: {
    friction: "Lack of access & tribal knowledge gaps",
    outcome: "get unblocked without Slack",
  },
};

export const expModifiers: Record<ExperienceKey, ExperienceModifier> = {
  junior: {
    friction: "Confusing documentation & steep learning curve",
    action: "find a template",
  },
  senior: {
    friction: "Rigid tools that hide complexity ('Black Boxes')",
    action: "configure the raw specs",
  },
};

// Dropdown options
export const archetypeOptions = [
  { value: "producer", label: "The Producer (Builder)" },
  { value: "consumer", label: "The Consumer (Applier)" },
  { value: "operator", label: "The Operator (Maintainer)" },
  { value: "steward", label: "The Steward (Governor)" },
] as const;

export const contextOptions = [
  { value: "pdx", label: "PDX (Platform)" },
  { value: "sbseg", label: "SBSEG (Small Biz)" },
  { value: "cg", label: "CG (Consumer/Tax)" },
  { value: "external", label: "External Partner" },
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

  const quote =
    context === "external"
      ? "I can't finish this ticket because I'm waiting for a VPN token."
      : base.quote;

  const thirdFriction =
    archetype === "producer"
      ? "Undifferentiated heavy lifting"
      : "Context switching between tools";

  return {
    name: `${base.title} (${experience === "senior" ? "Sr." : "Jr."})`,
    role: `${context.toUpperCase()} | ${experience.toUpperCase()} Engineer`,
    badge: base.badge,
    quote,
    frictions: [modExp.friction, modCtx.friction, thirdFriction],
    jtbd: {
      action: modExp.action,
      outcome: modCtx.outcome,
    },
  };
}
