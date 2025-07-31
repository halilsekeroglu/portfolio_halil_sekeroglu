from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid

# Contact Form Models
class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="unread")  # unread, read, replied

class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=5, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)

class ContactMessageResponse(BaseModel):
    id: str
    name: str
    email: str
    subject: str
    message: str
    timestamp: datetime
    status: str

# Portfolio Models
class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    detailed_description: Optional[str] = None
    technologies: List[str]
    category: str
    status: str
    impact: Optional[str] = None
    client: Optional[str] = None
    duration: Optional[str] = None
    team_size: Optional[int] = None
    role: Optional[str] = None
    challenges: Optional[List[str]] = None
    solutions: Optional[List[str]] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Experience(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    company: str
    role: str
    period: str
    location: str
    achievements: List[str]
    detailed_responsibilities: Optional[List[str]] = None
    technologies_used: Optional[List[str]] = None
    team_leadership: Optional[bool] = False
    key_projects: Optional[List[str]] = None

class TechnicalExpertise(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    category: str
    title: str
    description: str
    technologies: List[str]
    experience_level: str  # Expert, Advanced, Intermediate
    years_experience: Optional[int] = None