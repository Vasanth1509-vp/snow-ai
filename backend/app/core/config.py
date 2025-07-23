from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "postgresql://snowai:snowai123@localhost:5432/snowai"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # AI Services
    OPENAI_API_KEY: Optional[str] = None
    ANTHROPIC_API_KEY: Optional[str] = None
    
    # Security
    SECRET_KEY: str = "your-secret-key-here-please-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # ServiceNow Community URLs
    SERVICENOW_COMMUNITY_BASE_URL: str = "https://community.servicenow.com"
    
    # Scraping settings
    SCRAPING_DELAY: int = 1  # seconds between requests
    MAX_PAGES_TO_SCRAPE: int = 100
    
    class Config:
        env_file = ".env"

settings = Settings()