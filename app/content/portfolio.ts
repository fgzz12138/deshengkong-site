export type PortfolioStatus = "FIELD-TESTED" | "DEMO" | "IN DEVELOPMENT";

export type PortfolioCase = {
  slug: string;
  title: string;
  status: PortfolioStatus;
  summary: string;
  shortSummary: string;
  image: string;
  imageAlt: string;
  illustrationLabel: string;
  role: string;
  focus: string;
  stage: string;
  contributions: { title: string; body: string }[];
  checks: string[];
  boundaryTitle: string;
  boundary: string;
  demoUrl?: string;
  detailImage?: string;
  detailImageAlt?: string;
  checksTitle?: string;
  titleLines?: string[];
  summaryLines?: string[];
};

// Public copy reviewed against the project records on 2026-08-31.
// Every portfolio image is an illustration, not an acceptance screenshot.
export const featuredProjects: PortfolioCase[] = [
  {
    slug: "virtual-concierge",
    title: "Virtual Concierge",
    titleLines: ["Virtual", "Concierge"],
    status: "FIELD-TESTED",
    summary: "A voice and touchscreen concierge that answers site-specific questions through a knowledge-retrieval workflow.",
    shortSummary: "Voice, knowledge retrieval and a kiosk interface.",
    image: "/portfolio/concierge.png",
    imageAlt: "Concept illustration of a voice-enabled concierge kiosk",
    illustrationLabel: "Concept illustration",
    role: "AI integration & reliability",
    focus: "Voice and knowledge retrieval",
    stage: "Field-tested integration",
    contributions: [
      { title: "Knowledge integration", body: "Connected venue-specific knowledge retrieval with the language model and kiosk interface." },
      { title: "Voice workflow", body: "Worked on speech output and an asynchronous interaction pipeline." },
      { title: "Integration reliability", body: "Diagnosed retrieval and voice issues, then supported field validation." },
    ],
    checksTitle: "What was field-tested",
    checks: ["Site-specific knowledge retrieval", "Voice and touchscreen interaction", "Recorded in-person kiosk acceptance, August 2026"],
    boundaryTitle: "A defined scope",
    boundary: "Field acceptance covers the recorded kiosk flow, not continuous availability or an SLA. Phone service and lip sync are outside this case. No public hands-on demo is provided.",
  },
  {
    slug: "uai-api-customer-portal",
    title: "UAI API Customer Portal",
    titleLines: ["UAI API", "Customer Portal"],
    status: "DEMO",
    summary: "Turning platform capabilities into a clear customer journey. From access and usage to request testing.",
    summaryLines: ["Turning platform capabilities into a clear customer journey.", "From access and usage to request testing."],
    shortSummary: "A clear journey from access to request testing.",
    image: "/portfolio/portal.png",
    imageAlt: "Illustrative customer portal interface marked as demo data",
    illustrationLabel: "Illustrative interface · Demo data",
    detailImage: "/portfolio/portal-detail.svg",
    detailImageAlt: "Illustrative portal playground with synthetic data and no live API",
    role: "Scope, interface & integration",
    focus: "Customer experience",
    stage: "Demonstration",
    contributions: [
      { title: "Product scope", body: "Defined the customer journey across access, usage and request testing." },
      { title: "Interface & interactions", body: "Shaped navigation, responsive layouts and clear success and failure states." },
      { title: "Integration boundary", body: "Kept the customer interface separate from internal administration through a replaceable adapter." },
    ],
    checksTitle: "What the demo shows",
    checks: ["Create, edit and revoke demo keys", "Explore sample usage and export CSV", "Run simulated requests and inspect failures"],
    boundaryTitle: "A clear boundary",
    boundary: "Synthetic data only. No live API access, real customer accounts, billing or production inference. Further integration remains separate from this demonstration.",
    demoUrl: "https://uai-api-customer-portal.pages.dev/",
  },
  {
    slug: "media-visual-tools",
    title: "Media & Visual Tools",
    titleLines: ["Media &", "Visual Tools"],
    status: "IN DEVELOPMENT",
    summary: "A news-to-visual workflow connecting selection, writing, review and reusable visual production.",
    shortSummary: "Content workflows with human review built in.",
    image: "/portfolio/media.png",
    imageAlt: "Illustrative editing workspace with visual templates and a review queue",
    illustrationLabel: "Illustrative interface",
    role: "Content & editable delivery",
    focus: "Human-reviewed workflows",
    stage: "In development",
    contributions: [
      { title: "Content workflow", body: "Connected selection, writing, quality checks and eight-image delivery." },
      { title: "Human review", body: "Kept source history and human review in the release workflow." },
      { title: "Editable outputs", body: "Added revision-based editing and reusable, editable visual assets." },
    ],
    checksTitle: "What has been tested",
    checks: ["Editing and save/reopen in an isolated environment", "Conflict protection and eight-image downloads", "Reusable templates and separate visual assets"],
    boundaryTitle: "Still in development",
    boundary: "User acceptance and the Canva editing loop remain pending. UAT outputs are not approved for publication. This is not an unattended publishing service or a public multi-user application.",
  },
  {
    slug: "iclaude-workbench",
    title: "iClaude Workbench",
    titleLines: ["iClaude", "Workbench"],
    status: "IN DEVELOPMENT",
    summary: "A local workspace that turns project records into clear status, next steps and controlled task handoffs.",
    shortSummary: "Project context, next steps and controlled handoffs.",
    image: "/portfolio/workbench.png",
    imageAlt: "Illustrative local project workbench showing project context and next steps",
    illustrationLabel: "Illustrative interface",
    role: "Context & controlled execution",
    focus: "Local project workflows",
    stage: "In development",
    contributions: [
      { title: "Project context", body: "Connected existing project records through a read-only context bridge." },
      { title: "Clear project views", body: "Built views for status, next actions and system relationships." },
      { title: "Controlled handoffs", body: "Structured task handoffs and bounded local execution with independent review." },
    ],
    checksTitle: "What works locally",
    checks: ["Read-only project context and status views", "Structured task handoffs", "Bounded local execution with independent review"],
    boundaryTitle: "Current boundary",
    boundary: "The latest visual work still needs browser and editor acceptance. The workbench does not provide unattended deployment or unrestricted execution. Productivity gains have not been measured.",
  },
];

export function getFeaturedProject(slug: string) {
  return featuredProjects.find((project) => project.slug === slug);
}
