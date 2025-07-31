from motor.motor_asyncio import AsyncIOMotorClient
import os

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'portfolio_db')]

# Collections
contact_messages = db.contact_messages
projects = db.projects
experiences = db.experiences
technical_expertise = db.technical_expertise

async def init_database():
    """Initialize database with indexes"""
    try:
        # Create indexes for better performance
        await contact_messages.create_index("timestamp")
        await contact_messages.create_index("status")
        await projects.create_index("category")
        await projects.create_index("created_at")
        await experiences.create_index("company")
        await technical_expertise.create_index("category")
        
        print("Database initialized successfully")
    except Exception as e:
        print(f"Error initializing database: {e}")

async def close_database():
    """Close database connection"""
    client.close()