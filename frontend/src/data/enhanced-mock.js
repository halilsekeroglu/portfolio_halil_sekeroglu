export const enhancedMockData = {
  hero: {
    name: "HALIL SEKEROGLU",
    title: "Principal CCAI Developer, Engineer & Architect",
    subtitle: "4+ years specializing in Google Cloud AI, Dialogflow CX, and conversational platforms. Led 10+ Google projects as extended workforce, architecting enterprise-scale CCAI solutions."
  },
  
  about: {
    description: "Principal CCAI Developer and Conversational Architect with 4+ years of specialized experience in Google Cloud AI technologies. Expert in Dialogflow CX, telephony integration, and enterprise-scale conversational AI solutions. Proven track record leading cross-functional teams and delivering high-impact projects for Fortune 500 clients.",
    location: "Los Angeles, CA",
    email: "halil.sekeroglu@gmail.com",
    phone: "628 766 62 43",
    highlights: [
      "Led Apigee team and served as Conversational Architect on multiple Google projects",
      "Improved containment rates for high-volume FAQ flows using Dialogflow CX Playbooks",
      "Extended Jenkins pipelines to support Playbooks using Google's dfcx-scrapi",
      "Mentored team members and conducted weekly QA sessions",
      "Bachelor of Science in Mechanical Engineering, University of Gaziantep"
    ]
  },

  experience: [
    {
      id: 1,
      company: "Capgemini",
      role: "CCAI Engineer",
      period: "Nov 2024 - Present",
      location: "Los Angeles, CA",
      achievements: [
        "Collaborated with client POs to coordinate API development for Dialogflow CX flows",
        "Managed daily syncs with Apigee and API teams to track progress and address blockers",
        "Optimized high-volume FAQ flows to improve containment rates and reduce agent escalations",
        "Developed Dialogflow CX voice bot flows integrated with CCAI Platform (CCAIP)",
        "Implemented caller classification scripts using system functions for accurate routing",
        "Translated Visio call flows into modular CX pages with orchestrator API connections"
      ],
      detailed_responsibilities: [
        "API coordination and request management with TELUS Product Owners",
        "Daily tracking and follow-up with Apigee and API development teams",
        "Containment rate optimization for FAQ flows using Playbooks POC",
        "Voice bot development with ANI, DNIS, and UUI integration",
        "Modular CX page design based on Visio flow diagrams"
      ],
      technologies_used: ["Dialogflow CX", "CCAI Platform", "Apigee X", "Voice Bot Development"],
      team_leadership: true,
      key_projects: ["TELUS FAQ Optimization", "Voice Bot Integration", "API Coordination"]
    },
    {
      id: 2,
      company: "Quantiphi Inc (Google Project)",
      role: "Sr. Software Engineer & Conversational Architect",
      period: "Feb 2021 - Nov 2024",
      location: "Los Angeles, CA",
      achievements: [
        "Led Apigee team while serving as Conversational Architect on Google projects",
        "Pioneered Vertex AI Playbooks implementation for Burger King drive-thru automation",
        "Architected high-impact NYSD project leveraging Dialogflow's advanced AI capabilities",
        "Collaborated with Google's PSO to develop scalable cloud solutions",
        "Enhanced Jenkins pipeline to support Playbooks using dfcx-scrapi",
        "Designed RESTful APIs with OpenAPI specifications for healthcare data integration"
      ],
      detailed_responsibilities: [
        "Team leadership and cross-functional collaboration with Dialog Designers",
        "Weekly QA sessions and code reviews for quality assurance",
        "Conversation log analysis with Data Engineers for model improvement",
        "Cloud AI Engineers collaboration for seamless backend integration",
        "Infrastructure management with Terraform and Cloud Functions"
      ],
      technologies_used: [
        "Vertex AI Playbooks", "Dialogflow CX/ES", "Node.js", "TypeScript", 
        "MongoDB", "BigQuery", "Cloud Functions", "Terraform", "Jenkins", "dfcx-scrapi"
      ],
      team_leadership: true,
      key_projects: [
        "Burger King AI Drive-Thru", "NYSD Healthcare Automation", 
        "Enterprise CCAI Platform", "Healthcare Data Engine Integration"
      ]
    },
    {
      id: 3,
      company: "Google (Extended Workforce - Comcast Project)",
      role: "Conversational Architect & Dialogflow CX Developer",
      period: "2023 - 2024",
      location: "Remote",
      achievements: [
        "Managed 25+ Dialogflow CX flows in multi-team environment",
        "Personally developed 7-8 end-to-end flows with API and database integration",
        "Integrated Comcast backend APIs, Spanner database, and session parameters",
        "Provided live debugging support during customer sessions",
        "Collaborated with Release Managers for seamless QA and production deployments",
        "Created comprehensive documentation and change logs for all flow updates"
      ],
      detailed_responsibilities: [
        "Flow development based on Visio diagrams with client clarification calls",
        "Merge request management with Release Managers",
        "GCS bucket integration for agent file exports",
        "Live customer support and real-time error resolution",
        "Cross-flow debugging and error handling across team-developed flows"
      ],
      technologies_used: ["Dialogflow CX", "Spanner Database", "Postman", "GCS", "Visio"],
      team_leadership: false,
      key_projects: ["Comcast CX Integration", "Multi-flow Architecture", "Live Support System"]
    }
  ],

  projects: [
    {
      id: 1,
      title: "TELUS FAQ Optimization with Playbooks",
      description: "Led POC implementation replacing SMS-based FAQ flows with dynamic Dialogflow CX Playbooks for improved customer experience.",
      detailed_description: "Transitioned from static SMS troubleshooting responses to dynamic Playbooks that index TELUS website data. Implemented adversarial blockers to improve response accuracy and reduce off-topic answers. Focus on Smart Home Security (SHS) intents with higher volume questions.",
      technologies: ["Dialogflow CX", "Playbooks", "Data Store", "LLM Integration"],
      category: "Conversational AI",
      status: "Production",
      impact: "Significantly improved containment rates and customer satisfaction",
      client: "TELUS",
      duration: "6 months",
      team_size: 8,
      role: "Lead Conversational Architect",
      challenges: [
        "SMS-based responses caused customer frustration",
        "Low containment rates with existing FAQ flows",
        "Need for dynamic, accurate responses to complex queries"
      ],
      solutions: [
        "Implemented Playbooks with TELUS website data indexing",
        "Added adversarial blockers for response accuracy",
        "Created modular, scalable flow architecture"
      ]
    },
    {
      id: 2,
      title: "Burger King AI Drive-Thru Automation",
      description: "Pioneered Vertex AI Playbooks implementation creating dynamic conversational agents for personalized drive-thru experiences.",
      detailed_description: "First-of-its-kind implementation of Vertex AI Playbooks for quick-service restaurant automation. Created intelligent conversational agents that personalize customer experiences based on order history and preferences.",
      technologies: ["Vertex AI Playbooks", "Dialogflow CX", "CCAI", "Node.js"],
      category: "Conversational AI",
      status: "Production",
      impact: "Increased engagement and operational efficiency in drive-thru service",
      client: "Burger King",
      duration: "8 months",
      team_size: 12,
      role: "Senior Conversational Architect",
      challenges: [
        "Real-time order processing requirements",
        "Integration with existing POS systems",
        "Handling complex menu variations and customizations"
      ],
      solutions: [
        "Vertex AI Playbooks for dynamic conversation management",
        "Seamless POS integration with real-time data sync",
        "Context-aware menu handling with preference learning"
      ]
    },
    {
      id: 3,
      title: "NYSD Healthcare Documentation Automation",
      description: "High-impact project leveraging Dialogflow's advanced AI to automate health documentation processing for New York State Department.",
      detailed_description: "Enterprise-scale healthcare automation system processing complex documentation workflows. Implemented advanced AI capabilities to streamline health document processing, resulting in significant time savings and accuracy improvements.",
      technologies: ["Dialogflow CX", "Healthcare APIs", "Google Cloud", "Python"],
      category: "Healthcare AI",
      status: "Completed",
      impact: "Faster turnaround times and enhanced data accuracy for state health documentation",
      client: "New York State Department",
      duration: "12 months",
      team_size: 15,
      role: "Lead AI Architect",
      challenges: [
        "Complex healthcare documentation requirements",
        "HIPAA compliance and data security",
        "Integration with legacy state systems"
      ],
      solutions: [
        "Advanced Dialogflow CX workflows for document processing",
        "Secure healthcare API integration with compliance measures",
        "Legacy system integration with modern AI capabilities"
      ]
    },
    {
      id: 4,
      title: "Comcast Multi-Flow CX Architecture",
      description: "Managed 25+ Dialogflow CX flows in complex multi-team environment with integrated backend systems and real-time support.",
      detailed_description: "Comprehensive conversational AI architecture handling multiple customer service scenarios. Integrated Comcast backend APIs, Spanner database, and session parameters for personalized customer experiences. Provided live debugging support during customer interactions.",
      technologies: ["Dialogflow CX", "Spanner", "Backend APIs", "Session Management"],
      category: "Enterprise AI",
      status: "Production",
      impact: "Streamlined customer service operations across multiple departments",
      client: "Comcast",
      duration: "18 months",
      team_size: 20,
      role: "Conversational Architect",
      challenges: [
        "Managing 25+ interconnected flows",
        "Real-time debugging during live customer sessions",
        "Complex integration with multiple backend systems"
      ],
      solutions: [
        "Modular flow architecture with reusable components",
        "Comprehensive logging and debugging infrastructure",
        "Seamless backend integration with error handling"
      ]
    },
    {
      id: 5,
      title: "Healthcare Data Engine Integration",
      description: "Designed RESTful APIs with OpenAPI specifications to ingest HL7v2 and FHIR format files into GCP Healthcare Data Engine.",
      detailed_description: "Enterprise healthcare data integration platform supporting industry-standard formats. Implemented secure, scalable API architecture for healthcare data ingestion with comprehensive validation and error handling.",
      technologies: ["Apigee X", "Healthcare APIs", "HL7", "FHIR", "OpenAPI"],
      category: "Healthcare Integration",
      status: "Completed",
      impact: "Enhanced healthcare data interoperability across systems",
      client: "Healthcare Enterprise",
      duration: "10 months",
      team_size: 6,
      role: "API Architect",
      challenges: [
        "Complex healthcare data format requirements",
        "Ensuring data integrity and validation",
        "Scalable ingestion for large datasets"
      ],
      solutions: [
        "OpenAPI specifications for standardized integration",
        "Comprehensive data validation and error handling",
        "Scalable cloud architecture with auto-scaling capabilities"
      ]
    },
    {
      id: 6,
      title: "Jenkins Pipeline Enhancement for Playbooks",
      description: "Extended existing Jenkins pipeline to support Dialogflow CX Playbooks deployment using Google's dfcx-scrapi library.",
      detailed_description: "Infrastructure improvement project enabling automated deployment of Playbooks across development environments. Previously, pipeline only supported flows - extended functionality to include Playbooks for complete CI/CD coverage.",
      technologies: ["Jenkins", "dfcx-scrapi", "CI/CD", "Google Cloud"],
      category: "DevOps & Infrastructure",
      status: "Production",
      impact: "Streamlined deployment process for Playbooks across all environments",
      client: "Internal/Google",
      duration: "4 months",
      team_size: 3,
      role: "DevOps Lead",
      challenges: [
        "Existing pipeline only supported flows",
        "Integration complexity with dfcx-scrapi",
        "Maintaining deployment reliability"
      ],
      solutions: [
        "dfcx-scrapi integration for Playbooks support",
        "Automated testing and validation stages",
        "Reliable rollback mechanisms for failed deployments"
      ]
    }
  ],

  skills: {
    technical: [
      "Contact Center AI (CCAI)",
      "Dialogflow CX/ES",
      "Vertex AI Playbooks",
      "Google Cloud Platform",
      "Telephony Integration (SIP/RTP)",
      "Node.js & TypeScript",
      "RESTful API Design",
      "MongoDB & Spanner",
      "Agent Assist",
      "System Functions & Session Parameters"
    ],
    platforms: [
      "Google Cloud Platform",
      "Dialogflow ES/CX",
      "CCAI Platform (CCAIP)",
      "Vertex AI Playbooks",
      "Cloud Functions",
      "App Engine",
      "BigQuery",
      "Cloud Storage",
      "Apigee X",
      "Jenkins CI/CD"
    ],
    certifications: [
      "Google Cloud Associate Cloud Engineer",
      "Customer Experiences with Contact Center AI",
      "Using Google Cloud Services with Apigee X",
      "UJET Certified Delivery Partner",
      "TypeScript Certification",
      "Occupational Safety, Quality, Work Discipline, and Project Training - ITAK"
    ],
    leadership: [
      "Team Leadership & Mentoring",
      "Cross-functional Collaboration",
      "Weekly QA Sessions",
      "Code Review & Quality Assurance",
      "Client Stakeholder Management",
      "Project Planning & Execution",
      "Technical Documentation",
      "Knowledge Transfer & Training"
    ]
  },

  technicalExpertise: [
    {
      id: 1,
      category: "Conversational AI Architecture",
      title: "Advanced Dialogflow CX Implementation",
      description: "Expert-level design and implementation of complex conversational flows with state management, context switching, and advanced NLU capabilities.",
      technologies: ["Dialogflow CX", "Intent Management", "Entity Extraction", "Context Handling"],
      experience_level: "Expert",
      years_experience: 4
    },
    {
      id: 2,
      category: "Telephony & Voice Integration",
      title: "CCAI Platform & Voice Bot Development",
      description: "Specialized in telephony integration using SIP protocols, handling ANI/DNIS/UUI metadata, and voice bot development for enterprise contact centers.",
      technologies: ["CCAI Platform", "SIP Integration", "Voice Bots", "Telephony Metadata"],
      experience_level: "Expert",
      years_experience: 3
    },
    {
      id: 3,
      category: "API Architecture & Integration",
      title: "Enterprise API Design & Backend Integration",
      description: "Extensive experience in RESTful API design, backend system integration, and managing complex data flows between conversational AI and enterprise systems.",
      technologies: ["RESTful APIs", "Apigee X", "Backend Integration", "Database Management"],
      experience_level: "Advanced",
      years_experience: 4
    },
    {
      id: 4,
      category: "DevOps & Deployment",
      title: "CI/CD Pipeline Management",
      description: "Enhanced Jenkins pipelines for Dialogflow CX deployments, including Playbooks support using dfcx-scrapi, with comprehensive environment management.",
      technologies: ["Jenkins", "dfcx-scrapi", "CI/CD", "Environment Management"],
      experience_level: "Advanced",
      years_experience: 3
    }
  ],

  contact: {
    email: "halil.sekeroglu@gmail.com",
    phone: "628 766 62 43",
    location: "Los Angeles, CA",
    linkedin: "https://linkedin.com/in/halil-sekeroglu",
    availability: "Available for consulting and full-time opportunities in CCAI, Dialogflow CX, and conversational AI architecture roles."
  },

  stats: {
    years_experience: 4,
    google_projects: "10+",
    specialization: "CCAI & Dialogflow CX",
    team_leadership: true,
    certifications: 6,
    major_clients: ["TELUS", "Burger King", "NYSD", "Comcast"]
  }
};