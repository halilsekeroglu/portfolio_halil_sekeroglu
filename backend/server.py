from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from database import init_database, close_database
from routes.contact import router as contact_router
from routes.portfolio import router as portfolio_router

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app without a prefix
app = FastAPI(
    title="Halil Sekeroglu Portfolio API",
    description="Backend API for portfolio website",
    version="1.0.0"
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Health check endpoint
@api_router.get("/")
async def root():
    return {
        "message": "Portfolio API is running",
        "status": "healthy",
        "version": "1.0.0"
    }

@api_router.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "portfolio-api"
    }

# Include route modules
api_router.include_router(contact_router)
api_router.include_router(portfolio_router)

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_db():
    await init_database()

@app.on_event("shutdown")
async def shutdown_db():
    await close_database()
