import asyncio
import sys
import os
from pathlib import Path

# Add backend to path
backend_path = Path(__file__).parent.parent
sys.path.append(str(backend_path))

from database import init_database, projects, experiences, technical_expertise
from models import Project, Experience, TechnicalExpertise

# Portfolio data based on your background
PROJECTS_DATA = [
    {
        "id": "telus-faq-optimization",
        "title": "TELUS FAQ Optimization with Playbooks",
        "description": "Led POC implementation replacing SMS-based FAQ flows with dynamic Dialogflow CX Playbooks for improved customer experience.",
        "detailed_description": "Transitioned from static SMS troubleshooting responses to dynamic Playbooks that index TELUS website data. Implemented adversarial blockers to improve response accuracy and reduce off-topic answers. Focus on Smart Home Security (SHS) intents with higher volume questions.",
        "technologies": ["Dialogflow CX", "Playbooks", "Data Store", "LLM Integration"],
        "category": "Conversational AI",
        "status": "Production",
        "impact": "Significantly improved containment rates and customer satisfaction",
        "client": "TELUS",
        "duration": "6 months",
        "team_size": 8,
        "role": "Lead Conversational Architect",
        "challenges": [
            "SMS-based responses caused customer frustration",
            "Low containment rates with existing FAQ flows",
            "Need for dynamic, accurate responses to complex queries"
        ],
        "solutions": [
            "Implemented Playbooks with TELUS website data indexing",
            "Added adversarial blockers for response accuracy",
            "Created modular, scalable flow architecture"
        ]
    },
    {
        "id": "burger-king-ai-drive-thru",
        "title": "Burger King AI Drive-Thru Automation",
        "description": "Pioneered Vertex AI Playbooks implementation creating dynamic conversational agents for personalized drive-thru experiences.",
        "detailed_description": "First-of-its-kind implementation of Vertex AI Playbooks for quick-service restaurant automation. Created intelligent conversational agents that personalize customer experiences based on order history and preferences.",
        "technologies": ["Vertex AI Playbooks", "Dialogflow CX", "CCAI", "Node.js"],
        "category": "Conversational AI",
        "status": "Production",
        "impact": "Increased engagement and operational efficiency in drive-thru service",
        "client": "Burger King",
        "duration": "8 months",
        "team_size": 12,
        "role": "Senior Conversational Architect",
        "challenges": [
            "Real-time order processing requirements",
            "Integration with existing POS systems",
            "Handling complex menu variations and customizations"
        ],
        "solutions": [
            "Vertex AI Playbooks for dynamic conversation management",
            "Seamless POS integration with real-time data sync",
            "Context-aware menu handling with preference learning"
        ]
    },
    {
        "id": "nysd-healthcare-automation",
        "title": "NYSD Healthcare Documentation Automation",
        "description": "High-impact project leveraging Dialogflow's advanced AI to automate health documentation processing for New York State Department.",
        "detailed_description": "Enterprise-scale healthcare automation system processing complex documentation workflows. Implemented advanced AI capabilities to streamline health document processing, resulting in significant time savings and accuracy improvements.",
        "technologies": ["Dialogflow CX", "Healthcare APIs", "Google Cloud", "Python"],
        "category": "Healthcare AI",
        "status": "Completed",
        "impact": "Faster turnaround times and enhanced data accuracy for state health documentation",
        "client": "New York State Department",
        "duration": "12 months",
        "team_size": 15,
        "role": "Lead AI Architect",
        "challenges": [
            "Complex healthcare documentation requirements",
            "HIPAA compliance and data security",
            "Integration with legacy state systems"
        ],
        "solutions": [
            "Advanced Dialogflow CX workflows for document processing",
            "Secure healthcare API integration with compliance measures",
            "Legacy system integration with modern AI capabilities"
        ]
    },
    {
        "id": "comcast-multi-flow-architecture",
        "title": "Comcast Multi-Flow CX Architecture",
        "description": "Managed 25+ Dialogflow CX flows in complex multi-team environment with integrated backend systems and real-time support.",
        "detailed_description": "Comprehensive conversational AI architecture handling multiple customer service scenarios. Integrated Comcast backend APIs, Spanner database, and session parameters for personalized customer experiences. Provided live debugging support during customer interactions.",
        "technologies": ["Dialogflow CX", "Spanner", "Backend APIs", "Session Management"],
        "category": "Enterprise AI",
        "status": "Production",
        "impact": "Streamlined customer service operations across multiple departments",
        "client": "Comcast",
        "duration": "18 months",
        "team_size": 20,
        "role": "Conversational Architect",
        "challenges": [
            "Managing 25+ interconnected flows",
            "Real-time debugging during live customer sessions",
            "Complex integration with multiple backend systems"
        ],
        "solutions": [
            "Modular flow architecture with reusable components",
            "Comprehensive logging and debugging infrastructure",
            "Seamless backend integration with error handling"
        ]
    }
]

EXPERIENCE_DATA = [
    {
        "id": "capgemini-ccai-engineer",
        "company": "Capgemini",
        "role": "CCAI Engineer",
        "period": "Nov 2024 - Present",
        "location": "Los Angeles, CA",
        "achievements": [
            "Collaborated with client POs to coordinate API development for Dialogflow CX flows",
            "Managed daily syncs with Apigee and API teams to track progress and address blockers",
            "Optimized high-volume FAQ flows to improve containment rates and reduce agent escalations",
            "Developed Dialogflow CX voice bot flows integrated with CCAI Platform (CCAIP)",
            "Implemented caller classification scripts using system functions for accurate routing"
        ],
        "detailed_responsibilities": [
            "API coordination and request management with TELUS Product Owners",
            "Daily tracking and follow-up with Apigee and API development teams",
            "Containment rate optimization for FAQ flows using Playbooks POC",
            "Voice bot development with ANI, DNIS, and UUI integration"
        ],
        "technologies_used": ["Dialogflow CX", "CCAI Platform", "Apigee X", "Voice Bot Development"],
        "team_leadership": True,
        "key_projects": ["TELUS FAQ Optimization", "Voice Bot Integration", "API Coordination"]
    },
    {
        "id": "quantiphi-sr-engineer",
        "company": "Quantiphi Inc (Google Project)",
        "role": "Sr. Software Engineer & Conversational Architect",
        "period": "Feb 2021 - Nov 2024",
        "location": "Los Angeles, CA",
        "achievements": [
            "Led Apigee team while serving as Conversational Architect on Google projects",
            "Pioneered Vertex AI Playbooks implementation for Burger King drive-thru automation",
            "Architected high-impact NYSD project leveraging Dialogflow's advanced AI capabilities",
            "Enhanced Jenkins pipeline to support Playbooks using dfcx-scrapi",
            "Designed RESTful APIs with OpenAPI specifications for healthcare data integration"
        ],
        "detailed_responsibilities": [
            "Team leadership and cross-functional collaboration with Dialog Designers",
            "Weekly QA sessions and code reviews for quality assurance",
            "Conversation log analysis with Data Engineers for model improvement",
            "Cloud AI Engineers collaboration for seamless backend integration"
        ],
        "technologies_used": [
            "Vertex AI Playbooks", "Dialogflow CX/ES", "Node.js", "TypeScript", 
            "MongoDB", "BigQuery", "Cloud Functions", "Terraform", "Jenkins"
        ],
        "team_leadership": True,
        "key_projects": [
            "Burger King AI Drive-Thru", "NYSD Healthcare Automation", 
            "Enterprise CCAI Platform", "Healthcare Data Engine Integration"
        ]
    }
]

TECHNICAL_EXPERTISE_DATA = [
    {
        "id": "conversational-ai-architecture",
        "category": "Conversational AI Architecture",
        "title": "Advanced Dialogflow CX Implementation",
        "description": "Expert-level design and implementation of complex conversational flows with state management, context switching, and advanced NLU capabilities. Specialized in enterprise-scale CCAI solutions with proven track record of improving containment rates.",
        "technologies": ["Dialogflow CX", "Intent Management", "Entity Extraction", "Context Handling", "Flow Design"],
        "experience_level": "Expert",
        "years_experience": 4
    },
    {
        "id": "telephony-voice-integration",
        "category": "Telephony & Voice Integration", 
        "title": "CCAI Platform & Voice Bot Development",
        "description": "Specialized in telephony integration using SIP protocols, handling ANI/DNIS/UUI metadata, and voice bot development for enterprise contact centers. Expert in CCAI Platform integration and real-time voice processing.",
        "technologies": ["CCAI Platform", "SIP Integration", "Voice Bots", "Telephony Metadata", "ANI/DNIS/UUI"],
        "experience_level": "Expert",
        "years_experience": 3
    },
    {
        "id": "api-architecture-integration",
        "category": "API Architecture & Integration",
        "title": "Enterprise API Design & Backend Integration", 
        "description": "Extensive experience in RESTful API design, backend system integration, and managing complex data flows between conversational AI and enterprise systems. Led Apigee team coordination and API request management.",
        "technologies": ["RESTful APIs", "Apigee X", "Backend Integration", "Database Management", "OpenAPI"],
        "experience_level": "Advanced",
        "years_experience": 4
    },
    {
        "id": "devops-deployment",
        "category": "DevOps & Deployment",
        "title": "CI/CD Pipeline Management",
        "description": "Enhanced Jenkins pipelines for Dialogflow CX deployments, including Playbooks support using dfcx-scrapi. Comprehensive environment management across lab, dev, non-prod, and production environments.",
        "technologies": ["Jenkins", "dfcx-scrapi", "CI/CD", "Environment Management", "Deployment Automation"],
        "experience_level": "Advanced", 
        "years_experience": 3
    }
]

async def seed_database():
    """Seed the database with portfolio data"""
    try:
        print("Initializing database...")
        await init_database()
        
        # Clear existing data
        print("Clearing existing data...")
        await projects.delete_many({})
        await experiences.delete_many({})
        await technical_expertise.delete_many({})
        
        # Insert projects
        print("Inserting projects...")
        project_docs = []
        for project_data in PROJECTS_DATA:
            project = Project(**project_data)
            project_docs.append(project.dict())
        
        if project_docs:
            await projects.insert_many(project_docs)
            print(f"Inserted {len(project_docs)} projects")
        
        # Insert experiences
        print("Inserting experiences...")
        experience_docs = []
        for exp_data in EXPERIENCE_DATA:
            experience = Experience(**exp_data)
            experience_docs.append(experience.dict())
        
        if experience_docs:
            await experiences.insert_many(experience_docs)
            print(f"Inserted {len(experience_docs)} experiences")
        
        # Insert technical expertise
        print("Inserting technical expertise...")
        expertise_docs = []
        for expertise_data in TECHNICAL_EXPERTISE_DATA:
            expertise = TechnicalExpertise(**expertise_data)
            expertise_docs.append(expertise.dict())
        
        if expertise_docs:
            await technical_expertise.insert_many(expertise_docs)
            print(f"Inserted {len(expertise_docs)} technical expertise entries")
        
        print("Database seeding completed successfully!")
        
        # Verify data
        project_count = await projects.count_documents({})
        experience_count = await experiences.count_documents({})
        expertise_count = await technical_expertise.count_documents({})
        
        print(f"Verification - Projects: {project_count}, Experiences: {experience_count}, Expertise: {expertise_count}")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
        raise

if __name__ == "__main__":
    asyncio.run(seed_database())