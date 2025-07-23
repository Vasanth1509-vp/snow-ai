from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models.question import Question, Answer, UserQuery
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

class QuestionResponse(BaseModel):
    id: int
    title: str
    content: str
    category: Optional[str]
    tags: Optional[str]
    source_url: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True

class AnswerResponse(BaseModel):
    id: int
    content: str
    is_accepted: bool
    votes: int
    source_url: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True

class QuestionWithAnswers(QuestionResponse):
    answers: List[AnswerResponse] = []

@router.get("/", response_model=List[QuestionResponse])
async def get_questions(
    skip: int = 0,
    limit: int = 20,
    category: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    Get list of questions with optional filtering
    """
    query = db.query(Question).filter(Question.is_active == True)
    
    if category:
        query = query.filter(Question.category == category)
    
    if search:
        query = query.filter(
            Question.title.ilike(f"%{search}%") |
            Question.content.ilike(f"%{search}%")
        )
    
    questions = query.offset(skip).limit(limit).all()
    return questions

@router.get("/{question_id}", response_model=QuestionWithAnswers)
async def get_question(question_id: int, db: Session = Depends(get_db)):
    """
    Get a specific question with its answers
    """
    question = db.query(Question).filter(
        Question.id == question_id,
        Question.is_active == True
    ).first()
    
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    
    return question

@router.get("/categories/list")
async def get_categories(db: Session = Depends(get_db)):
    """
    Get list of available question categories
    """
    categories = db.query(Question.category).distinct().filter(
        Question.category.isnot(None),
        Question.is_active == True
    ).all()
    
    return [cat[0] for cat in categories if cat[0]]

@router.get("/stats/overview")
async def get_stats(db: Session = Depends(get_db)):
    """
    Get overview statistics
    """
    total_questions = db.query(Question).filter(Question.is_active == True).count()
    total_answers = db.query(Answer).count()
    total_queries = db.query(UserQuery).count()
    
    return {
        "total_questions": total_questions,
        "total_answers": total_answers,
        "total_user_queries": total_queries
    }