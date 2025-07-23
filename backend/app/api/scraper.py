from fastapi import APIRouter, Depends, BackgroundTasks, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.scraper.servicenow_scraper import ServiceNowScraper
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class ScrapeRequest(BaseModel):
    max_pages: Optional[int] = 10
    category: Optional[str] = None

class ScrapeStatus(BaseModel):
    status: str
    message: str
    pages_scraped: Optional[int] = None

@router.post("/start", response_model=ScrapeStatus)
async def start_scraping(
    request: ScrapeRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """
    Start scraping ServiceNow community content
    """
    try:
        scraper = ServiceNowScraper(db)
        
        # Add scraping task to background
        background_tasks.add_task(
            scraper.scrape_community_content,
            max_pages=request.max_pages,
            category=request.category
        )
        
        return ScrapeStatus(
            status="started",
            message=f"Scraping started for up to {request.max_pages} pages"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/status", response_model=ScrapeStatus)
async def get_scraping_status():
    """
    Get current scraping status
    """
    # In a real implementation, you'd check Redis or database for status
    return ScrapeStatus(
        status="idle",
        message="No active scraping tasks"
    )

@router.post("/sample-data")
async def add_sample_data(db: Session = Depends(get_db)):
    """
    Add sample ServiceNow questions and answers for testing
    """
    try:
        scraper = ServiceNowScraper(db)
        await scraper.add_sample_data()
        
        return {"status": "success", "message": "Sample data added successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))