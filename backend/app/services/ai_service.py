import openai
import asyncio
from typing import List, Dict, Optional
from sqlalchemy.orm import Session
from app.core.config import settings
from app.core.database import get_db
from app.models.question import Question, Answer, UserQuery
import json
import time

class AIService:
    def __init__(self):
        if settings.OPENAI_API_KEY:
            openai.api_key = settings.OPENAI_API_KEY
        
    async def get_answer(self, question: str, session_id: str = "default") -> str:
        """
        Get an AI-powered answer to a ServiceNow question
        """
        start_time = time.time()
        
        # Search for relevant content in our database
        relevant_content = await self._search_relevant_content(question)
        
        # Generate response using AI
        response = await self._generate_ai_response(question, relevant_content)
        
        # Log the query and response
        end_time = time.time()
        response_time_ms = int((end_time - start_time) * 1000)
        
        # Save to database (in a real app, use dependency injection)
        db = next(get_db())
        try:
            user_query = UserQuery(
                query=question,
                response=response,
                session_id=session_id,
                response_time_ms=response_time_ms
            )
            db.add(user_query)
            db.commit()
        except Exception as e:
            print(f"Error saving query: {e}")
        finally:
            db.close()
        
        return response
    
    async def _search_relevant_content(self, question: str) -> List[Dict]:
        """
        Search for relevant content in the database
        """
        db = next(get_db())
        try:
            # Simple text search - in production, use vector search
            questions = db.query(Question).filter(
                Question.content.ilike(f"%{question}%") |
                Question.title.ilike(f"%{question}%")
            ).limit(5).all()
            
            relevant_content = []
            for q in questions:
                for answer in q.answers:
                    if answer.is_accepted or answer.votes > 0:
                        relevant_content.append({
                            "question": q.title,
                            "question_content": q.content,
                            "answer": answer.content,
                            "source_url": answer.source_url or q.source_url
                        })
            
            return relevant_content
        finally:
            db.close()
    
    async def _generate_ai_response(self, question: str, context: List[Dict]) -> str:
        """
        Generate AI response using OpenAI or fallback to rule-based response
        """
        if not settings.OPENAI_API_KEY:
            return await self._generate_fallback_response(question, context)
        
        try:
            # Prepare context for the AI
            context_text = "\n\n".join([
                f"Q: {item['question']}\nA: {item['answer']}"
                for item in context[:3]  # Limit context to avoid token limits
            ])
            
            prompt = f"""You are a ServiceNow expert assistant. Answer the following question based on the provided context from the ServiceNow community.

Context from ServiceNow Community:
{context_text}

User Question: {question}

Provide a helpful, accurate answer focused on ServiceNow development, administration, or usage. If the context doesn't contain relevant information, provide general ServiceNow guidance based on best practices.

Answer:"""

            response = await openai.ChatCompletion.acreate(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful ServiceNow expert assistant."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=500,
                temperature=0.7
            )
            
            return response.choices[0].message.content.strip()
        
        except Exception as e:
            print(f"OpenAI API error: {e}")
            return await self._generate_fallback_response(question, context)
    
    async def _generate_fallback_response(self, question: str, context: List[Dict]) -> str:
        """
        Generate a fallback response when AI services are not available
        """
        if context:
            best_match = context[0]
            return f"""Based on ServiceNow community discussions:

**Question:** {best_match['question']}

**Answer:** {best_match['answer']}

**Source:** {best_match.get('source_url', 'ServiceNow Community')}

---

*This response is based on community content. For the most up-to-date information, please refer to the official ServiceNow documentation.*"""
        
        # General ServiceNow guidance when no context is available
        servicenow_topics = {
            "script": "For ServiceNow scripting, use server-side scripting (Business Rules, Script Includes) for data manipulation and client-side scripting (Client Scripts, UI Policies) for user interface interactions.",
            "workflow": "ServiceNow Workflow is used to automate business processes. Consider using Flow Designer for newer implementations as it provides a more user-friendly interface.",
            "table": "ServiceNow tables store data records. Custom tables should extend from the base 'Task' table when appropriate, and follow naming conventions.",
            "form": "ServiceNow forms display and edit records. Use Form Design to configure fields, sections, and related lists. UI Policies control field behavior.",
            "list": "ServiceNow lists display multiple records. Configure List Layout to show relevant columns and use filters to help users find specific records.",
            "integration": "ServiceNow integrations can be built using REST APIs, SOAP APIs, or MID Server for database connections. Use proper authentication and error handling.",
            "security": "ServiceNow security is controlled through ACLs (Access Control Lists), Roles, and Groups. Follow the principle of least privilege."
        }
        
        question_lower = question.lower()
        for topic, guidance in servicenow_topics.items():
            if topic in question_lower:
                return f"**ServiceNow {topic.title()} Guidance:**\n\n{guidance}\n\n*For detailed information, please refer to the ServiceNow documentation or community forums.*"
        
        return """I'd be happy to help with your ServiceNow question! 

For the best assistance, please consider:

1. **Check ServiceNow Documentation**: The official docs are comprehensive and up-to-date
2. **ServiceNow Community**: Browse or post questions in the community forums
3. **ServiceNow Developer Site**: Great resources for development-related questions
4. **ServiceNow Now Learning**: For structured learning paths

**Common ServiceNow Topics:**
- Scripting (Client Scripts, Business Rules, Script Includes)
- Workflow and Flow Designer
- Tables, Forms, and Lists configuration
- Integrations and APIs
- Security (ACLs, Roles, Groups)
- Performance optimization

Please provide more specific details about your ServiceNow question for a more targeted response!"""