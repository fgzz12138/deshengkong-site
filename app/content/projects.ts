export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  thumbnail: string;

  demo?: string;
  github?: string;
  caseStudy?: string;

  highlights?: string[];

  tagline?: string;
  overview?: string;
  audience?: string;
  problem?: string;

  role?: string;
  team?: string;
  timeframe?: string;

  features?: {
    title: string;
    description: string;
  }[];

  process?: string[];
  workflow?: string;
  system?: string;

  challenges?: string[];
  improvements?: string[];

  result?: string;
  reflection?: string;
  nextStep?: string;

  images?: string[];
  demoVideo?: string;

  flowDiagram?: { label: string; description?: string }[];
};
export const projects: Project[] = [
  {
    slug: "virtual-concierge",
    title: "AI Concierge Kiosk",
    category: "AI Agent",
    description:
      "A voice- and touch-driven AI concierge deployed on an in-venue touch kiosk, answering site-specific questions through a RAG knowledge base with an async STT/TTS pipeline built for responsiveness.",
    tech: ["LLM Integration", "RAG", "STT/TTS", "Async Architecture", "Multimodal UI"],
    // TODO(desheng): replace with real photo/screenshot
    thumbnail: "/projectThumbnail/ai-concierge.svg",

    tagline:
      "A retail/property concierge agent that listens, looks up, and answers — without making visitors wait on the pipeline.",

    overview:
      "Virtual Concierge is an AI agent deployed on a physical touch kiosk in-venue, combining voice and touchscreen input to answer visitor questions about the site. At its core is a RAG knowledge base that grounds answers in the venue's actual information rather than generic responses.",
    audience:
      "Visitors to the store or property who need quick answers about the venue — the kind of questions a front-desk or concierge staff member would normally field.",

    role: "Responsible for the RAG knowledge base, the STT/TTS pipeline architecture, and the stability fixes needed to keep the kiosk reliable in daily use.",

    highlights: [
      "Built a RAG knowledge base to ground answers in venue-specific information",
      "Designed an async architecture to run the STT/TTS pipeline without blocking the interface",
      "Diagnosed and fixed a repeated-recognition bug in the voice pipeline",
      "Fixed a silent-audio issue affecting mobile/touch interactions",
    ],

    features: [
      {
        title: "RAG-grounded answers",
        description:
          "Visitor questions are answered using a retrieval-augmented pipeline over a venue-specific knowledge base, rather than relying on the model's general knowledge.",
      },
      {
        title: "Voice + touch input",
        description:
          "The kiosk accepts both spoken and touchscreen input, giving visitors a way to interact that fits the physical, walk-up context.",
      },
      {
        title: "Async STT/TTS pipeline",
        description:
          "Speech-to-text and text-to-speech run asynchronously so the interface stays responsive instead of blocking while audio is processed.",
      },
      {
        title: "Stability iteration",
        description:
          "The kiosk went through multiple rounds of bug fixing, including a repeated-recognition issue and a mobile silent-audio bug, to make it reliable for unattended, everyday use.",
      },
    ],

    process: [
      "Designed the RAG knowledge base structure around venue-specific content",
      "Built the async pipeline connecting STT, the LLM, and TTS",
      "Integrated the pipeline with the kiosk's touch and voice interface",
      "Diagnosed and resolved a repeated-recognition bug in the voice pipeline",
      "Fixed a mobile silent-audio issue affecting voice interaction",
    ],
    workflow:
      "The agent runs on a physical kiosk, so the priority was keeping the voice interaction fast and not letting the STT/TTS pipeline stall the interface — the async architecture and later stability fixes were both driven by that constraint.",

    challenges: [
      "Keeping the interface responsive while STT/TTS processing happens in the background",
      "Diagnosing a repeated-recognition bug in the voice pipeline",
      "Fixing a silent-audio issue specific to mobile/touch interaction",
    ],

    result:
      "A deployed, in-venue AI concierge that answers site-specific questions through voice and touch, with an async pipeline and stability fixes that keep it usable in unattended, everyday operation.",
    reflection:
      "This project reinforced how much of building a voice agent is pipeline engineering and reliability work — RAG retrieval is only part of the experience; the async architecture and edge-case bug fixes are what make it usable in production.",
  },
  {
    slug: "alpha-ai",
    title: "AI Platform — Annotation & Evaluation Workflow",
    category: "AI Agent",
    description:
      "Designed a human annotation workflow and an automated testing/reporting process for model outputs on an AI platform.",
    tech: ["Evals", "Annotation Pipeline", "AI Platform"],
    // TODO(desheng): replace with real photo/screenshot
    thumbnail: "/projectThumbnail/alpha-ai.svg",

    tagline:
      "Turning raw model outputs into something a human can annotate — and a process that can tell you when quality slips.",

    overview:
      "This project covered two connected pieces of an AI platform's quality process: designing the workflow human annotators use to label and review model outputs, and setting up an automated process for testing model outputs and generating reports on them.",

    role: "Designed the human annotation workflow and the automated testing/reporting process for model outputs.",

    highlights: [
      "Designed a human annotation workflow for reviewing model outputs",
      "Built an automated testing process for model outputs",
      "Set up reporting on model output quality",
    ],

    features: [
      {
        title: "Annotation workflow",
        description:
          "Designed the process human annotators follow to review and label model outputs on the platform.",
      },
      {
        title: "Automated output testing",
        description:
          "Set up automated checks that run against model outputs as part of the platform's testing process.",
      },
      {
        title: "Reporting",
        description:
          "Built a reporting process that surfaces the results of automated testing for review.",
      },
    ],

    process: [
      "Designed the annotation workflow structure for human reviewers",
      "Built the automated testing process for model outputs",
      "Set up the reporting flow to surface test results",
    ],

    challenges: [
      "Designing an annotation workflow that's clear and consistent for human reviewers",
      "Building automated tests that meaningfully evaluate model output quality",
    ],

    result:
      "A working annotation workflow for human reviewers and an automated testing/reporting process for model outputs on the AI platform.",
    reflection:
      "This project sat on the evals side of AI development — a reminder that shipping a model or agent is only half the work; having a process to actually check its outputs is the other half.",
  },
  {
    slug: "autoxing-robotics",
    title: "Autonomous Robot Deployment — Enterprise Data Center",
    category: "Applied AI",
    description:
      "Deployed and configured autonomous navigation robots on an enterprise data center site, integrating the robot vendor's fleet software with the site's maps and access/operational workflows.",
    tech: ["Robotics Integration", "Fleet Navigation", "Enterprise Deployment"],
    // TODO(desheng): replace with real photo/screenshot
    thumbnail: "/projectThumbnail/autoxing-robotics.svg",

    tagline:
      "Getting a robot fleet to actually navigate a real site — maps, access control, and operations, not just the demo.",

    overview:
      "This project involved deploying autonomous navigation robots on an enterprise data center site and configuring the vendor's fleet management software for that specific site — connecting the robots' navigation to the site's floor maps and integrating with access control and day-to-day operational workflows.",

    role: "Responsible for site deployment and configuration, connecting the fleet software to the site's maps and operational/access-control processes.",

    highlights: [
      "Deployed autonomous navigation robots on a live enterprise data center site",
      "Configured the vendor's fleet management software for the specific site",
      "Integrated robot navigation with the site's floor maps",
      "Connected the deployment to the site's access control and operational workflows",
    ],

    features: [
      {
        title: "Fleet software configuration",
        description:
          "Set up the robot vendor's fleet management platform for the specific data center site.",
      },
      {
        title: "Site map integration",
        description:
          "Connected the robots' navigation to the site's actual floor maps so routes reflect the real layout.",
      },
      {
        title: "Access & operations integration",
        description:
          "Coordinated the deployment with the site's access control and operational processes so the robots fit into existing workflows rather than working around them.",
      },
    ],

    process: [
      "Reviewed the site layout and access requirements",
      "Configured the vendor fleet software for the site",
      "Integrated navigation with the site's floor maps",
      "Coordinated with site operations to fit the deployment into existing access-control and operational processes",
    ],

    challenges: [
      "Aligning the robot fleet software's navigation with the real site map and constraints",
      "Integrating the deployment with existing access control and operational processes without disrupting them",
    ],

    result:
      "Autonomous navigation robots deployed and operating on the data center site, with fleet software configured to match the site's map and integrated into its access-control and operational workflows.",
    reflection:
      "This project was less about the AI/navigation stack itself and more about integration work — making a vendor's general-purpose fleet platform fit one specific site's map, access rules, and operations.",
  },
  {
    slug: "enterprise-ai-infrastructure",
    title: "Enterprise AI Infrastructure Deployment Support",
    category: "Applied AI",
    description:
      "Technical support for enterprise-scale AI infrastructure deployment — GPU cluster equipment selection, data center cabling and rack layout coordination, and cross-team technical documentation.",
    tech: ["GPU Infrastructure", "Technical Proposals", "Vendor Coordination"],
    // TODO(desheng): replace with real photo/screenshot
    thumbnail: "/projectThumbnail/enterprise-ai-infra.svg",

    tagline:
      "The unglamorous side of AI infrastructure — equipment selection, rack layout, and getting every team reading from the same document.",

    overview:
      "This work involved providing technical support for the deployment of enterprise-scale AI infrastructure, centered on a GPU cluster data center build. It covered equipment selection, coordinating cabling and rack layout, and producing technical documentation to align the teams involved.",

    role: "Provided technical support across equipment selection, cabling/rack layout coordination, and cross-team technical documentation for the deployment.",

    highlights: [
      "Supported equipment selection for a GPU cluster data center deployment",
      "Coordinated cabling and rack layout planning",
      "Produced cross-team technical documentation to align stakeholders",
    ],

    features: [
      {
        title: "Equipment selection",
        description:
          "Supported the selection of GPU cluster equipment for the data center deployment.",
      },
      {
        title: "Cabling & rack layout",
        description:
          "Coordinated cabling and rack layout planning for the physical data center build.",
      },
      {
        title: "Technical documentation",
        description:
          "Produced documentation to keep cross-functional teams aligned on the deployment.",
      },
    ],

    process: [
      "Supported evaluation and selection of GPU cluster equipment",
      "Coordinated cabling and rack layout planning with the deployment team",
      "Wrote technical documentation to align stakeholders across teams",
    ],

    challenges: [
      "Coordinating cabling and rack layout decisions across multiple teams",
      "Producing documentation clear enough to align technical and non-technical stakeholders",
    ],

    result:
      "Contributed technical support to an enterprise-scale GPU cluster data center deployment, from equipment selection through cabling/rack layout coordination and documentation.",
    reflection:
      "This project gave me visibility into the physical infrastructure layer that AI systems actually run on — a useful counterweight to the software/agent side of the work.",
  },
  {
    slug: "ezisight-ecommerce",
    title: "EziSight E-commerce Website",
    category: "Web",
    description:
      "A frontend-focused e-commerce build with Next.js and TypeScript — product browsing, cart interaction, and an enquiry flow on a scalable UI structure. Core functionality is complete and it's ready to launch.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    thumbnail: "/projectThumbnail/Ezisight.png",
  },

  {
    slug: "company-website",
    title: "Corporate Website Development",
    category: "Web",
    description:
      "Contributed to the development of a company website during an internship, focusing on content structure, UI layout, and user experience optimization.",
    tech: ["WordPress", "HTML", "CSS"],
    thumbnail: "/projectThumbnail/company2.png",
  },
  {
    slug: "portfolio-v1",
    title: "Portfolio (This Site)",
    category: "Web",
    description:
      "My personal portfolio built with Next.js, TypeScript and Tailwind, deployed on Vercel.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    thumbnail: "/projectThumbnail/portfolio.png",
  },
  {
    slug: "no-boss",
    title: "NO BOSS",
    category: "Game",
    description:
      "A fast-paced 2D top-down action game built with Unity, focused on combat systems, enemy AI, and boss fight design.",
    tagline:
      "A playable dungeon escape prototype combining combat, enemy behaviour, and boss encounter design.",
    tech: ["Unity", "C#", "FSM", "Tilemap", "Cinemachine"],
    thumbnail: "/projectThumbnail/noboss1.png",

    demo: "https://github.com/Desheng-Kong/No-Boss",

    overview:
      "NO BOSS is a 2D top-down action game where the player controls a SWAT-style character trying to escape from a dungeon. The project focuses on building a small but complete combat experience with multiple enemy types, a boss fight, and a simple progression loop.",
    audience:
      "Designed as a student game development project and portfolio piece for players who enjoy quick action-based gameplay.",
    problem:
      "The project aimed to explore how to build a readable and responsive combat loop in Unity while combining enemy AI, level progression, and boss encounter pacing.",

    role: "Solo developer responsible for gameplay programming, enemy behaviour setup, level building, animation transitions, camera integration, and audio implementation.",
    team: "Solo Project",
    timeframe: "6 weeks",

    highlights: [
      "Built a top-down combat system with ranged and melee enemies",
      "Implemented FSM-based enemy behaviour",
      "Designed a multi-phase boss fight",
      "Created the dungeon level using Unity Tilemap",
    ],

    features: [
      {
        title: "Top-down combat",
        description:
          "Players use keyboard movement and directional attacks to navigate and fight through the dungeon.",
      },
      {
        title: "Enemy AI behaviour",
        description:
          "Enemies operate through state-based logic, switching between idle, chasing, and attacking behaviours.",
      },
      {
        title: "Boss encounter",
        description:
          "The boss fight includes multiple phases to create a stronger combat rhythm and difficulty curve.",
      },
      {
        title: "Dungeon level flow",
        description:
          "The level was structured to guide the player through combat spaces before reaching the final encounter.",
      },
    ],

    process: [
      "Designed the gameplay loop and enemy encounter structure",
      "Built the dungeon scene using Unity Tilemap",
      "Implemented enemy state transitions and attack logic in C#",
      "Used Animator for hit feedback and action transitions",
      "Integrated Cinemachine for camera follow and gameplay framing",
      "Added sound effects and background music to support pacing",
    ],
    workflow:
      "The project started from a simple combat prototype, then expanded into a complete gameplay demo with enemy variety, a boss fight, and level progression.",
    system:
      "The core gameplay system combines player movement, attack logic, enemy state machines, and level flow to create a short but complete action-game experience.",

    challenges: [
      "Balancing enemy pressure while keeping combat readable",
      "Making the player attack feel responsive and clear",
      "Structuring enemy behaviour so each enemy type felt distinct",
    ],
    improvements: [
      "Expand player skills and weapon variety",
      "Improve the direction logic of spinning attacks",
      "Refine damage feedback when the player is hit repeatedly",
    ],

    result:
      "The project resulted in a playable Unity prototype that demonstrates core skills in gameplay programming, enemy AI logic, level setup, and combat encounter design.",
    reflection:
      "This project helped strengthen my understanding of action game systems, gameplay iteration, and how to turn a simple prototype into a more complete playable experience.",
    nextStep:
      "Future improvements would include deeper combat mechanics, better visual polish, and more refined enemy balancing.",

    images: [
      "/ProjectImages/NoBoss/NoBoss3.png",
      "/ProjectImages/NoBoss/NoBoss2.png",
      "/ProjectImages/NoBoss/NoBoss1.png",
      "/ProjectImages/NoBoss/NoBoss4.png",
    ],

    demoVideo: "https://www.youtube.com/embed/qvSYfR6XX2M",
  },
  {
    slug: "run-sheep",
    title: "Run Sheep",
    category: "Game",
    description:
      "A fast-paced casual survival game where players control a sheep to dodge obstacles and survive as long as possible.",
    tagline:
      "A simple but addictive survival game focused on responsive control and obstacle avoidance.",
    tech: ["Unity", "C#", "Game Design", "Casual Game"],
    thumbnail: "/projectThumbnail/runsheep1.png",

    demo: "https://github.com/Desheng-Kong/RunSheep",

    overview:
      "Run Sheep is a casual survival game where the player controls a sheep navigating through incoming obstacles. The goal is to survive for as long as possible while avoiding collisions, creating a simple but engaging gameplay loop.",
    audience:
      "Designed for casual players who enjoy quick, easy-to-learn games with fast feedback and replayability.",
    problem:
      "The project explores how to design a simple but satisfying gameplay loop where player input, movement responsiveness, and obstacle timing work together to create engagement.",

    role: "Group project focused on gameplay programming and interaction design. I was responsible for implementing player movement, obstacle spawning, collision logic, and game flow.",
    team: "Group Project",
    timeframe: "Student project / prototype scope",

    highlights: [
      "Designed a survival-based gameplay loop focused on timing and reaction",
      "Implemented obstacle spawning and collision detection systems",
      "Built responsive player controls for better gameplay feel",
      "Created a simple restart loop to support replayability",
    ],

    features: [
      {
        title: "Responsive player movement",
        description:
          "The player controls the sheep with immediate and smooth input feedback to maintain a fast-paced experience.",
      },
      {
        title: "Obstacle avoidance gameplay",
        description:
          "Obstacles are generated dynamically, requiring players to react quickly and adjust their movement in real time.",
      },
      {
        title: "Endless survival loop",
        description:
          "The game continues until the player collides with an obstacle, encouraging replay and score improvement.",
      },
      {
        title: "Quick restart system",
        description:
          "Players can immediately restart after failure, reinforcing a fast iteration gameplay cycle.",
      },
    ],

    process: [
      "Defined a simple survival gameplay loop based on obstacle avoidance",
      "Implemented player movement and input handling in Unity",
      "Built obstacle spawning logic with increasing difficulty potential",
      "Added collision detection and game-over logic",
      "Refined gameplay responsiveness to improve player experience",
    ],
    workflow:
      "The project started from a minimal movement prototype and gradually evolved into a complete survival loop by adding obstacle spawning, collision handling, and restart mechanics.",
    system:
      "The core system combines player input, movement control, obstacle spawning, and collision detection to create a continuous survival experience with immediate feedback.",

    challenges: [
      "Balancing obstacle frequency to keep the game challenging but fair",
      "Ensuring player movement feels responsive and predictable",
      "Maintaining engagement with a very simple core mechanic",
    ],
    improvements: [
      "Introduce difficulty scaling over time",
      "Add score tracking and progression feedback",
      "Enhance visual polish and animation for better player feedback",
    ],

    result:
      "The project resulted in a functional casual game prototype that demonstrates core gameplay programming skills, including movement, collision handling, and loop design.",
    reflection:
      "Run Sheep helped me understand how small gameplay systems come together to create a satisfying player experience. It reinforced the importance of responsiveness and feedback in simple games.",
    nextStep:
      "Future improvements would focus on adding progression systems, visual polish, and more varied obstacle patterns.",

    images: [
      "/ProjectImages/RunSheep/runSheep3.png",
      "/ProjectImages/RunSheep/runSheep6.png",
      "/ProjectImages/RunSheep/runSheep7.png",
      "/ProjectImages/RunSheep/runSheep8.png",
    ],
    demoVideo: "https://www.youtube.com/embed/OqB_GLQhJUM",
  },
  {
    slug: "paint-cube",
    title: "Paint Cube",
    category: "Game",
    description:
      "A 2D puzzle-maze prototype built in Unity, centered on color interaction, door unlocking, and light gameplay variation.",
    tagline:
      "A simple but playful 2D puzzle experience built around paint-based progression and maze navigation.",
    tech: ["Unity", "C#", "2D Puzzle", "Gameplay Programming"],
    thumbnail: "/projectThumbnail/paintbox.png",

    demo: "https://github.com/Desheng-Kong/PaintCubeBuild",

    overview:
      "Paint Cube is a 2D puzzle-maze game prototype inspired by simple and recognizable gameplay concepts. The core mechanic revolves around guiding a white cube to interact with a paint palette, which then unlocks a color-detecting door and allows the player to continue toward the exit.",
    audience:
      "Designed for players who enjoy casual puzzle gameplay with clear rules, readable interactions, and light mechanical variation.",
    problem:
      "The project focused on exploring how a single visual mechanic — color activation — could be turned into an intuitive gameplay loop while still keeping the experience engaging through small level-based variations.",

    role: "Solo project developed as a gameplay programming practice piece. I was responsible for implementing the core interaction logic, door detection, paint mechanics, and supporting gameplay features.",
    team: "Solo Project",
    timeframe: "Student project / prototype scope",

    highlights: [
      "Built a color-triggered progression mechanic around paint interaction and door unlocking",
      "Implemented gameplay scripting for door detection and paint-related state changes",
      "Added supporting mechanics such as coin collection, darkness, and dice-based variation",
      "Created a small but complete puzzle loop with clear player goals and readable interactions",
    ],

    features: [
      {
        title: "Paint-based progression",
        description:
          "The player must guide the white cube to interact with a paint palette in order to activate progression and unlock the next part of the level.",
      },
      {
        title: "Color-detecting door logic",
        description:
          "Doors respond to the cube’s updated state, creating a simple but effective puzzle condition tied directly to the core mechanic.",
      },
      {
        title: "Maze navigation",
        description:
          "Levels are structured around moving through confined spaces, finding the right interaction point, and reaching the exit within the gameplay constraints.",
      },
      {
        title: "Gameplay variations",
        description:
          "Additional mechanics such as coin collection, darkness-based visibility, and dice rolling were introduced to create more variety beyond the main loop.",
      },
    ],

    process: [
      "Started from a simple maze-game concept with a clear win condition",
      "Designed the central paint interaction as the key gameplay trigger",
      "Implemented door detection logic to respond to the player’s updated state",
      "Built supporting mechanics including coin pickup, darkness, and dice-based interactions",
      "Refined the project into a small playable prototype focused on clarity and accessibility",
    ],
    workflow:
      "The project began with a simple puzzle idea and was expanded by layering small gameplay systems around a central color mechanic. The goal was to keep the project easy to understand while still giving each level a sense of variation.",
    system:
      "The core system connects player movement, paint interaction, and door state logic into a straightforward progression loop. Optional mechanics were added as lightweight modifiers to make the experience feel more playful and less repetitive.",

    challenges: [
      "Keeping the core mechanic easy to understand without making the gameplay feel too repetitive",
      "Designing small mechanic variations that support the main puzzle loop instead of distracting from it",
      "Working within a limited technical scope while still aiming for a complete playable result",
    ],
    improvements: [
      "Add more level variety built around stronger puzzle escalation",
      "Improve visual feedback when the player changes color state",
      "Expand mechanic combinations to create more meaningful problem-solving depth",
    ],

    result:
      "The project resulted in a simple but complete Unity puzzle prototype that demonstrates gameplay scripting, mechanic implementation, and small-scale system design.",
    reflection:
      "Paint Cube helped me practice turning a straightforward concept into an interactive gameplay loop. It strengthened my understanding of puzzle logic, mechanic readability, and how to support a core idea with smaller secondary systems.",
    nextStep:
      "Future improvements would focus on deeper level design, stronger visual polish, and more refined progression between mechanics.",

    images: [
      "/ProjectImages/PaintBox/paintbox1.png",
      "/ProjectImages/PaintBox/paintbox7.png",
      "/ProjectImages/PaintBox/paintbox2.png",
      "/ProjectImages/PaintBox/paintbox3.png",
    ],
    demoVideo: "https://www.youtube.com/embed/JonLI42xWhQ",
  },
  {
    slug: "3d-environment-01",
    title: "3D Environment Study",
    category: "3D",
    description:
      "A collection of 3D environment studies focusing on lighting, composition, and visual atmosphere.",
    tagline:
      "Exploring how lighting and composition shape mood and storytelling in 3D scenes.",
    tech: ["Maya", "Rendering", "Lighting", "Composition"],
    thumbnail: "/projectThumbnail/artwork1.jpg",

    caseStudy: "https://express.adobe.com/page/zYgYE7pNuzhmd/",

    overview:
      "This project is a series of 3D environment studies created to explore lighting, composition, and atmosphere. Each scene focuses on how visual elements such as light direction, contrast, and framing can influence the overall mood and storytelling of an environment.",
    audience:
      "Designed as a learning and exploration project for developing visual skills in 3D rendering and environment design.",
    problem:
      "The project investigates how to create visually engaging scenes without relying on complex models, focusing instead on lighting, composition, and material balance.",

    role: "Independent study project. I was responsible for scene setup, lighting design, material adjustment, and final rendering.",
    team: "Solo Project",
    timeframe: "Ongoing study",

    highlights: [
      "Explored lighting setups to create different visual moods",
      "Focused on composition to guide viewer attention",
      "Experimented with materials and rendering techniques",
      "Created multiple environment variations to study visual impact",
    ],

    features: [
      {
        title: "Lighting exploration",
        description:
          "Tested different lighting directions, intensities, and color temperatures to understand how light shapes atmosphere.",
      },
      {
        title: "Composition focus",
        description:
          "Applied framing and visual balance techniques to guide the viewer’s eye through the scene.",
      },
      {
        title: "Material and shading",
        description:
          "Adjusted materials and textures to improve realism and visual contrast.",
      },
      {
        title: "Atmosphere building",
        description:
          "Used light, shadow, and color to create mood-driven environments.",
      },
    ],

    process: [
      "Set up base environment scenes in Maya",
      "Adjusted camera angles to define composition",
      "Experimented with lighting setups for mood variation",
      "Refined materials and rendering parameters",
      "Rendered multiple iterations to compare visual results",
    ],
    workflow:
      "Each scene was built through an iterative process, starting from a simple setup and gradually refining lighting, materials, and composition to achieve a desired mood.",
    system:
      "The workflow combines environment setup, camera composition, lighting design, and rendering to produce visually coherent scenes.",

    challenges: [
      "Balancing lighting without overexposing or flattening the scene",
      "Maintaining visual focus while keeping the environment detailed",
      "Achieving atmosphere without overly complex geometry",
    ],
    improvements: [
      "Explore more advanced materials and shaders",
      "Introduce storytelling elements into environments",
      "Experiment with real-time rendering engines",
    ],

    result:
      "The project resulted in a collection of environment renders that demonstrate understanding of lighting, composition, and visual atmosphere.",
    reflection:
      "This study helped me understand how much impact lighting and composition have on visual storytelling, even with simple geometry.",
    nextStep:
      "Future work will focus on combining these visual techniques with interactive environments and game-level design.",

    images: [
      "/projectThumbnail/artwork1.jpg",
      "/projectThumbnail/artwork1.png",
    ],
    demoVideo: "https://www.youtube.com/embed/iDQKId5UKss",
  },
  {
    slug: "3d-character-study",
    title: "3D Character Study",
    category: "3D",
    description:
      "A series of 3D material and lighting experiments focused on surface quality, reflections, and rendering realism.",
    tagline:
      "Exploring how materials and lighting interact to shape visual realism in 3D rendering.",
    tech: ["Maya", "Shading", "Lighting", "Rendering"],
    thumbnail: "/projectThumbnail/artwork2.png",

    caseStudy: "https://express.adobe.com/page/9kHQZ3agPN5qH/",

    overview:
      "This project is a collection of material and lighting studies aimed at understanding how surface properties and light interaction influence visual results in 3D rendering. The focus is on refining realism through controlled experimentation.",
    audience:
      "Designed as a technical and visual study for improving rendering quality and material understanding in 3D workflows.",
    problem:
      "The project explores how to achieve visually convincing materials by balancing reflection, roughness, and lighting conditions without relying on complex geometry.",

    role: "Independent study project. Responsible for material setup, shader adjustments, lighting configuration, and rendering output.",
    team: "Solo Project",
    timeframe: "Ongoing study",

    highlights: [
      "Explored how different materials respond to light and reflections",
      "Experimented with roughness, metallic, and shading properties",
      "Focused on improving realism through lighting adjustments",
      "Created controlled test scenes for material comparison",
    ],

    features: [
      {
        title: "Material exploration",
        description:
          "Tested different material types such as glossy, matte, and metallic surfaces to understand their visual behaviour.",
      },
      {
        title: "Lighting interaction",
        description:
          "Analyzed how light direction and intensity affect reflections, shadows, and overall material perception.",
      },
      {
        title: "Surface realism",
        description:
          "Focused on improving realism by adjusting shading parameters and material properties.",
      },
      {
        title: "Controlled test setups",
        description:
          "Created simplified scenes to isolate and study material behaviour without distraction.",
      },
    ],

    process: [
      "Set up basic geometry to serve as material test objects",
      "Applied and modified different material properties in Maya",
      "Experimented with lighting direction, intensity, and color",
      "Rendered multiple variations to compare visual results",
      "Refined materials based on visual feedback and realism goals",
    ],
    workflow:
      "The workflow focused on isolating variables such as material properties and lighting conditions, allowing for clearer observation of how each factor influences the final render.",
    system:
      "The system combines shader setup, lighting configuration, and rendering to evaluate how materials behave under different conditions.",

    challenges: [
      "Achieving realistic reflections without overexposure",
      "Balancing roughness and metallic values for believable surfaces",
      "Understanding how subtle lighting changes affect perception",
    ],
    improvements: [
      "Explore more advanced shader setups",
      "Test materials in more complex environments",
      "Integrate real-time rendering engines like Unreal Engine",
    ],

    result:
      "The project resulted in a series of rendered studies demonstrating improved understanding of material behaviour and lighting interaction.",
    reflection:
      "This study strengthened my ability to evaluate visual quality and understand how small parameter changes can significantly impact realism.",
    nextStep:
      "Future work will focus on applying these material techniques to full environment scenes and interactive projects.",

    images: [
      "/ProjectImages/GirlMode/girl1.png",
      "/ProjectImages/GirlMode/girl2.png",
    ],
  },
];
