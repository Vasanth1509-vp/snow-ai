from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Question(Base):
    __tablename__ = "questions"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(Text)
    category = Column(String, index=True)
    tags = Column(String)  # JSON string of tags
    source_url = Column(String)
    source_type = Column(String, default="community")  # community, documentation, etc.
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    is_active = Column(Boolean, default=True)
    
    answers = relationship("Answer", back_populates="question")

class Answer(Base):
    __tablename__ = "answers"
    
    id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer, ForeignKey("questions.id"))
    content = Column(Text)
    is_accepted = Column(Boolean, default=False)
    votes = Column(Integer, default=0)
    source_url = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    question = relationship("Question", back_populates="answers")

class UserQuery(Base):
    __tablename__ = "user_queries"
    
    id = Column(Integer, primary_key=True, index=True)
    query = Column(Text)
    response = Column(Text)
    session_id = Column(String, index=True)
    response_time_ms = Column(Integer)
    feedback_rating = Column(Integer)  # 1-5 rating
    created_at = Column(DateTime(timezone=True), server_default=func.now())