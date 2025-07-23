import requests
from bs4 import BeautifulSoup
import time
from sqlalchemy.orm import Session
from app.models.question import Question, Answer
from app.core.config import settings
import asyncio
import json
from typing import List, Dict, Optional

class ServiceNowScraper:
    def __init__(self, db: Session):
        self.db = db
        self.base_url = settings.SERVICENOW_COMMUNITY_BASE_URL
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
    
    async def scrape_community_content(self, max_pages: int = 10, category: Optional[str] = None):
        """
        Scrape ServiceNow community content
        """
        try:
            print(f"Starting to scrape ServiceNow community content (max {max_pages} pages)")
            
            # For demo purposes, add sample data instead of actual scraping
            # In production, implement actual web scraping logic here
            await self.add_sample_data()
            
            print("Scraping completed successfully")
        except Exception as e:
            print(f"Error during scraping: {e}")
    
    async def add_sample_data(self):
        """
        Add sample ServiceNow questions and answers for testing
        """
        sample_data = [
            {
                "title": "How to create a Business Rule in ServiceNow?",
                "content": "I need to create a business rule that automatically assigns incidents to a specific group based on the category. How can I do this?",
                "category": "Development",
                "tags": json.dumps(["business-rule", "incident", "assignment"]),
                "answers": [
                    {
                        "content": """To create a Business Rule for automatic assignment, follow these steps:

1. Navigate to System Definition > Business Rules
2. Click 'New' to create a new business rule
3. Fill in the form:
   - Name: Auto Assignment by Category
   - Table: Incident [incident]
   - When: before (for insert/update)
   - Insert: checked
   - Update: checked
   - Condition: category == 'hardware'
   - Advanced: checked

4. In the Advanced tab, add this script:
```javascript
(function executeRule(current, previous /*null when async*/) {
    if (current.category == 'hardware') {
        current.assignment_group = 'Hardware Support Team';
    }
})(current, previous);
```

This will automatically assign incidents with hardware category to the Hardware Support Team.""",
                        "is_accepted": True,
                        "votes": 15
                    }
                ]
            },
            {
                "title": "Best practices for ServiceNow Script Include development",
                "content": "What are the best practices when developing Script Includes in ServiceNow? I want to ensure my code is maintainable and follows ServiceNow standards.",
                "category": "Development",
                "tags": json.dumps(["script-include", "best-practices", "coding-standards"]),
                "answers": [
                    {
                        "content": """Here are the key best practices for Script Include development:

**1. Naming Conventions:**
- Use PascalCase for Script Include names
- Use descriptive names that indicate functionality
- Avoid abbreviations

**2. Structure:**
```javascript
var MyScriptInclude = Class.create();
MyScriptInclude.prototype = {
    initialize: function() {
        // Constructor code
    },
    
    myMethod: function(param1, param2) {
        // Method implementation
        return result;
    },
    
    type: 'MyScriptInclude'
};
```

**3. Error Handling:**
- Always include try-catch blocks
- Log errors appropriately using gs.error()
- Return meaningful error messages

**4. Performance:**
- Avoid GlideRecord queries in loops
- Use GlideAggregate for counting
- Cache frequently used data

**5. Security:**
- Validate all inputs
- Use GlideSPScriptable for Service Portal access
- Follow principle of least privilege""",
                        "is_accepted": True,
                        "votes": 28
                    }
                ]
            },
            {
                "title": "How to configure Flow Designer vs Workflow?",
                "content": "When should I use Flow Designer versus the traditional Workflow engine in ServiceNow? What are the key differences?",
                "category": "Administration",
                "tags": json.dumps(["flow-designer", "workflow", "automation"]),
                "answers": [
                    {
                        "content": """Here's when to use each tool:

**Flow Designer (Recommended for new implementations):**
- Modern, user-friendly interface
- Better performance and scalability
- Built-in error handling and retry logic
- Integration with IntegrationHub
- Easier to maintain and troubleshoot
- Visual flow design

**Traditional Workflow (Legacy):**
- Complex approval processes
- Advanced scripting requirements
- Existing workflows that work well
- When you need specific workflow activities not available in Flow Designer

**Key Differences:**

| Feature | Flow Designer | Workflow |
|---------|---------------|----------|
| Interface | Modern, drag-drop | Older graphical interface |
| Performance | Better | Good |
| Learning Curve | Easier | Steeper |
| Error Handling | Built-in | Manual |
| Future Support | Active development | Maintenance mode |

**Recommendation:** Use Flow Designer for all new automation projects. Migrate existing workflows gradually when business requirements allow.""",
                        "is_accepted": True,
                        "votes": 22
                    }
                ]
            },
            {
                "title": "ServiceNow REST API authentication methods",
                "content": "What are the different authentication methods available for ServiceNow REST APIs? Which one should I use for integration?",
                "category": "Integration",
                "tags": json.dumps(["rest-api", "authentication", "integration"]),
                "answers": [
                    {
                        "content": """ServiceNow supports several REST API authentication methods:

**1. Basic Authentication:**
- Uses username/password
- Simple to implement
- Less secure for production
```javascript
// Example
var request = new sn_ws.RESTMessageV2();
request.setHttpMethod('GET');
request.setEndpoint('https://instance.service-now.com/api/now/table/incident');
request.setBasicAuth('username', 'password');
```

**2. OAuth 2.0 (Recommended):**
- More secure
- Token-based authentication
- Supports refresh tokens
- Better for production use

**3. API Key Authentication:**
- Good for service-to-service communication
- Easy to manage and rotate
- No user context

**4. Mutual Authentication (mTLS):**
- Certificate-based
- Highest security level
- Complex setup

**Recommendation:**
- **Development/Testing:** Basic Auth
- **Production:** OAuth 2.0 or API Key
- **High Security:** Mutual Authentication

**Best Practices:**
- Never hardcode credentials
- Use encrypted storage for tokens
- Implement proper token refresh logic
- Monitor API usage and rate limits""",
                        "is_accepted": True,
                        "votes": 31
                    }
                ]
            },
            {
                "title": "ServiceNow table relationships and reference fields",
                "content": "I'm confused about how to properly set up table relationships in ServiceNow. Can someone explain reference fields and how they work?",
                "category": "Administration",
                "tags": json.dumps(["tables", "reference-fields", "data-model"]),
                "answers": [
                    {
                        "content": """ServiceNow table relationships are created using Reference fields. Here's how they work:

**Reference Field Basics:**
- Links records between tables
- Stores the sys_id of the referenced record
- Provides referential integrity
- Enables dot-walking in scripts

**Creating Reference Fields:**
1. Navigate to System Definition > Tables
2. Open your table and go to Columns tab
3. Click 'New' to create a new column
4. Set Type to 'Reference'
5. Choose the reference table
6. Configure reference qualifier if needed

**Types of Relationships:**

**1. One-to-Many (Most Common):**
```
Incident → Assignment Group
- Each incident has one assignment group
- Each group can have many incidents
```

**2. Many-to-Many:**
```
User → Groups (via Group Membership table)
- Users can be in multiple groups
- Groups can have multiple users
```

**3. Self-Referencing:**
```
Configuration Item → Parent CI
- CIs can have parent-child relationships
```

**Dot-Walking Example:**
```javascript
// Access referenced data
var incident = new GlideRecord('incident');
incident.get('INC0000123');
gs.info('Assigned to: ' + incident.assigned_to.name);
gs.info('Group email: ' + incident.assignment_group.email);
```

**Best Practices:**
- Use descriptive field names
- Set up proper ACLs on reference fields
- Consider performance impact of deep dot-walking
- Use reference qualifiers to filter options""",
                        "is_accepted": True,
                        "votes": 19
                    }
                ]
            }
        ]
        
        for item in sample_data:
            # Check if question already exists
            existing = self.db.query(Question).filter(
                Question.title == item["title"]
            ).first()
            
            if not existing:
                # Create question
                question = Question(
                    title=item["title"],
                    content=item["content"],
                    category=item["category"],
                    tags=item["tags"],
                    source_type="sample"
                )
                self.db.add(question)
                self.db.commit()
                self.db.refresh(question)
                
                # Add answers
                for answer_data in item["answers"]:
                    answer = Answer(
                        question_id=question.id,
                        content=answer_data["content"],
                        is_accepted=answer_data.get("is_accepted", False),
                        votes=answer_data.get("votes", 0)
                    )
                    self.db.add(answer)
                
                self.db.commit()
                print(f"Added question: {item['title']}")
        
        print("Sample data added successfully")