from fastapi import APIRouter, HTTPException, status
from typing import List
from ..models import ContactMessage, ContactMessageCreate, ContactMessageResponse
from ..database import contact_messages
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/contact", tags=["contact"])

@router.post("/", response_model=ContactMessageResponse)
async def create_contact_message(message_data: ContactMessageCreate):
    """Create a new contact message"""
    try:
        # Create contact message
        contact_message = ContactMessage(**message_data.dict())
        
        # Insert into database
        result = await contact_messages.insert_one(contact_message.dict())
        
        if result.inserted_id:
            logger.info(f"Contact message created: {contact_message.id}")
            
            # Return response without sensitive data
            return ContactMessageResponse(**contact_message.dict())
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create contact message"
            )
            
    except Exception as e:
        logger.error(f"Error creating contact message: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.get("/", response_model=List[ContactMessageResponse])
async def get_contact_messages(skip: int = 0, limit: int = 50):
    """Get all contact messages (admin endpoint)"""
    try:
        cursor = contact_messages.find().sort("timestamp", -1).skip(skip).limit(limit)
        messages = await cursor.to_list(length=limit)
        
        return [ContactMessageResponse(**msg) for msg in messages]
        
    except Exception as e:
        logger.error(f"Error fetching contact messages: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.get("/{message_id}", response_model=ContactMessageResponse)
async def get_contact_message(message_id: str):
    """Get specific contact message"""
    try:
        message = await contact_messages.find_one({"id": message_id})
        
        if not message:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Contact message not found"
            )
            
        return ContactMessageResponse(**message)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching contact message: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.patch("/{message_id}/status")
async def update_message_status(message_id: str, status: str):
    """Update message status (admin endpoint)"""
    try:
        valid_statuses = ["unread", "read", "replied"]
        if status not in valid_statuses:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid status. Must be one of: {valid_statuses}"
            )
        
        result = await contact_messages.update_one(
            {"id": message_id},
            {"$set": {"status": status}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Contact message not found"
            )
            
        return {"message": "Status updated successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating message status: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )