from fastapi import APIRouter, HTTPException, status
from typing import List, Optional
from ..models import Project, Experience, TechnicalExpertise
from ..database import projects, experiences, technical_expertise
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/portfolio", tags=["portfolio"])

# Projects endpoints
@router.get("/projects", response_model=List[Project])
async def get_projects(category: Optional[str] = None, limit: int = 50):
    """Get all projects, optionally filtered by category"""
    try:
        query = {}
        if category:
            query["category"] = category
            
        cursor = projects.find(query).sort("created_at", -1).limit(limit)
        project_list = await cursor.to_list(length=limit)
        
        return [Project(**project) for project in project_list]
        
    except Exception as e:
        logger.error(f"Error fetching projects: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    """Get specific project details"""
    try:
        project = await projects.find_one({"id": project_id})
        
        if not project:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Project not found"
            )
            
        return Project(**project)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching project: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

# Experience endpoints
@router.get("/experience", response_model=List[Experience])
async def get_experience():
    """Get all work experience"""
    try:
        cursor = experiences.find().sort("period", -1)
        experience_list = await cursor.to_list(length=None)
        
        return [Experience(**exp) for exp in experience_list]
        
    except Exception as e:
        logger.error(f"Error fetching experience: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

# Technical expertise endpoints
@router.get("/expertise", response_model=List[TechnicalExpertise])
async def get_technical_expertise(category: Optional[str] = None):
    """Get technical expertise, optionally filtered by category"""
    try:
        query = {}
        if category:
            query["category"] = category
            
        cursor = technical_expertise.find(query)
        expertise_list = await cursor.to_list(length=None)
        
        return [TechnicalExpertise(**expertise) for expertise in expertise_list]
        
    except Exception as e:
        logger.error(f"Error fetching technical expertise: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.get("/stats")
async def get_portfolio_stats():
    """Get portfolio statistics"""
    try:
        project_count = await projects.count_documents({})
        experience_count = await experiences.count_documents({})
        expertise_count = await technical_expertise.count_documents({})
        
        # Get project categories
        project_categories = await projects.distinct("category")
        
        return {
            "total_projects": project_count,
            "total_experience_entries": experience_count,
            "total_expertise_areas": expertise_count,
            "project_categories": project_categories,
            "years_experience": 4,  # Based on provided information
            "google_projects": "10+",
            "specialization": "CCAI & Dialogflow CX"
        }
        
    except Exception as e:
        logger.error(f"Error fetching portfolio stats: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )