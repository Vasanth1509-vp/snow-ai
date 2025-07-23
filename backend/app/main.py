from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn
import os

from app.core.config import settings
from app.core.database import engine, Base
from app.api import questions, auth, scraper
from app.services.ai_service import AIService

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ServiceNow AI Assistant",
    description="AI-powered assistant for ServiceNow developers",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(questions.router, prefix="/api/questions", tags=["questions"])
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(scraper.router, prefix="/api/scraper", tags=["scraper"])

# Initialize AI service
ai_service = AIService()

@app.get("/")
async def root():
    return {"message": "ServiceNow AI Assistant API"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "ServiceNow AI Assistant"}

@app.post("/api/ask")
async def ask_question(question: str):
    """
    Ask a ServiceNow related question and get an AI-powered response
    """
    try:
        response = await ai_service.get_answer(question)
        return {"question": question, "answer": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)