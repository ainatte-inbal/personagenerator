import { ArchetypeKey } from "./personaData";

export interface ArchetypeDescription {
  tagline: string;
  definition: string;
  coreContext: string;
  primaryGoal: string;
  psychographicProfile: {
    mindset: string;
    trustSignals: string;
    fear: string;
  };
  frictionPoints: string[];
  modifierMatrix: string[];
  voiceQuote: string;
}

export const archetypeDescriptions: Record<ArchetypeKey, ArchetypeDescription> = {
  producer: {
    tagline: "I build the pavement so others can drive.",
    definition:
      "The technical architect or backend engineer who creates the underlying assets (APIs, Data Pipelines, ML Models, UI Libraries) that the rest of the organization relies on. They are the suppliers of the ecosystem.",
    coreContext:
      "Platform Engineering, Data Engineering, Backend Core, AI/ML (Model Builders)",
    primaryGoal:
      "Leverage. They want to build something once and have it used by 100 teams without breaking.",
    psychographicProfile: {
      mindset:
        "Systemic & Scalable. They loathe 'one-offs.' If they have to do something twice, they automate it. They value elegance, clean abstraction, and 'correctness' over speed.",
      trustSignals:
        "Detailed technical documentation, open-source standards, transparency on 'under the hood' mechanics.",
      fear: "Being a bottleneck. They dread being pinged on Slack to explain how their API works or to fix a trivial config issue for a consumer.",
    },
    frictionPoints: [
      "Undifferentiated Heavy Lifting: Wasting time writing boilerplate code (scaffolding, standard config) instead of solving novel problems.",
      "Support Burden: Building a popular tool but drowning in support tickets because the documentation isn't self-serve.",
      "Fragile Dependencies: Upstream changes breaking their core libraries, forcing them into 'maintenance mode' instead of 'build mode.'",
    ],
    modifierMatrix: [
      "PDX (Internal Platform): Obsessed with Standardization. 'If it's not in the Golden Path, I won't build it.'",
      "Product (GBSG/CG): Obsessed with Speed. 'I'll build a Shadow IT solution if the central platform is too slow.'",
      "Junior vs. Senior: The Junior needs a 'Wizard' to get started; the Senior views Wizards as 'Black Boxes' and demands raw config access.",
    ],
    voiceQuote:
      "I don't want to explain how the authentication service works ten times a day. I want to build a robust SDK, document it once, and have teams self-serve so I can focus on the next big infrastructure upgrade.",
  },
  consumer: {
    tagline: "I don't care how the electricity works, I just need the light to turn on.",
    definition:
      "The product developer or data analyst who uses platform assets to build customer-facing value (e.g., a TurboTax feature, a QuickBooks workflow). They are the customers of the Producer.",
    coreContext:
      "Full Stack Developers, Mobile Devs, Frontend Engineers, Data Analysts",
    primaryGoal:
      "Velocity. They are measured on shipping features to customers. They view the platform as a utility to help them move faster.",
    psychographicProfile: {
      mindset:
        "Pragmatic & Deadline-Driven. They are often stressed by sprint commitments. They don't want to learn the intricacies of the infrastructure; they just want the API to work as advertised.",
      trustSignals:
        "'Time to Hello World' (speed to first success), copy-pasteable code snippets, active Slack channels where others are using the tool.",
      fear: "Blocking Dependencies. They fear waiting 3 days for an access request or having an API break in production the night before a launch.",
    },
    frictionPoints: [
      "The Treasure Hunt: Spending hours searching across Wikis, Slacks, and portals to find the right API key, documentation, or owner.",
      "Config Hell: Getting stuck on obscure configuration errors that prevent them from even starting their local environment.",
      "Context Switching: Having to jump between 5 different tools (Jira, GitHub, AWS Console, internal portals) to ship one feature.",
    ],
    modifierMatrix: [
      "CG (Compliance Focus): 'I need to know if this API is PII-safe before I even touch it.'",
      "GBSG (Integration Focus): 'I need to know if this works with Mailchimp and QuickBooks API right now.'",
      "Junior vs. Senior: The Junior copies code blindly; the Senior checks rate limits and latency SLAs before adopting.",
    ],
    voiceQuote:
      "I have a demo with the PM on Friday. I don't have time to read a 20-page architecture doc. Just give me the API endpoint, the key, and a code snippet that actually works.",
  },
  operator: {
    tagline: "I am the sheepdog. I watch the flock and bark when there is a wolf.",
    definition:
      "The guardian of production health. They monitor systems, respond to incidents, and ensure reliability. They are often the ones woken up at 2 AM.",
    coreContext:
      "SRE (Site Reliability Engineering), Production Support, DevOps (Ops focus), Incident Commanders",
    primaryGoal:
      "Stability (MTTR/MTTD). They want a quiet dashboard. If the dashboard is red, they want to know exactly why, immediately.",
    psychographicProfile: {
      mindset:
        "Defensive & Skeptical. They assume things will break. They value clarity, distinct signals, and 'runbooks' (step-by-step fix guides) over new features.",
      trustSignals:
        "Low 'False Positive' rates in alerts, automated remediation, clear 'blame' (root cause) attribution.",
      fear: "The Unknown. A blinking red light with the error message 'Generic System Failure' is their nightmare. They fear 'Alert Fatigue' (ignoring real issues because of too much noise).",
    },
    frictionPoints: [
      "Signal vs. Noise: Drowning in alerts that aren't actionable (e.g., 'CPU is at 80%'—is that bad? Or just a batch job?).",
      "The Black Box: An error occurs in a dependency (like a 3rd party API) but the error message looks internal, sending them on a wild goose chase.",
      "Manual Toil: Manually restarting servers or clearing caches because the self-healing scripts failed.",
    ],
    modifierMatrix: [
      "PDX (System View): Monitors the health of the entire platform (aggregate latency).",
      "Product (User View): Monitors the user experience (e.g., 'Can users log in?').",
      "Junior vs. Senior: The Junior needs a Runbook to follow; the Senior needs deep observability tools (Splunk, Honeycomb) to hunt novel bugs.",
    ],
    voiceQuote:
      "I don't care about the new feature launch. I care that the latency spiked by 200ms and I can't tell if it's the database or the new API gateway. Give me a dashboard that tells me what broke.",
  },
  steward: {
    tagline: "I ensure we don't hit the iceberg while everyone else is watching the engines.",
    definition:
      "The overseer of policy, cost, and compliance. They generally do not write code but control the gates through which code must pass.",
    coreContext:
      "Engineering Managers, Security (InfoSec), FinOps, Compliance Officers, TPMs",
    primaryGoal:
      "Governance & Visibility. They want to ensure the organization is moving fast safely and efficiently.",
    psychographicProfile: {
      mindset:
        "Risk-Averse & Holistic. They think in quarters and years, not sprints. They worry about 'Technical Debt,' 'Cloud Bill Shock,' and 'Regulatory Fines.'",
      trustSignals:
        "Automated reporting, 'Single Pane of Glass' dashboards, granular access controls (RBAC).",
      fear: "Blind Spots. Not knowing that a team has spun up 50 expensive GPU instances that are sitting idle, or that a new app is leaking customer data.",
    },
    frictionPoints: [
      "Shadow IT: Teams bypassing controls to move fast, creating hidden risks.",
      "Fragmented Reporting: Having to manually cobble together spreadsheets from Jira, AWS, and HR to answer 'How much are we spending on AI?'",
      "The Nag: Feeling like the 'bad guy' who has to constantly chase engineers to update their libraries or fix security vulnerabilities.",
    ],
    modifierMatrix: [
      "CG (Tax/Privacy): Obsessed with PII and IRS regulations.",
      "GBSG (Business Health): Obsessed with partner reliability and data quality.",
      "New Manager vs. Tenured: The New Manager focuses on 'Team Velocity'; the Tenured Manager focuses on 'Operational Excellence' and long-term stability.",
    ],
    voiceQuote:
      "I need a single view of our 'Health Score.' I can't go into every repo to check if they are using the compliant version of the library. If it's not on the dashboard, it's a risk.",
  },
};
