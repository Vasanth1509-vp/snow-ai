# ServiceNow AI Assistant 🤖

An intelligent AI-powered platform designed to help ServiceNow developers and administrators find solutions faster and learn best practices efficiently.

![ServiceNow AI Assistant](https://img.shields.io/badge/ServiceNow-AI%20Assistant-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat&logo=python)

## 🌟 Features

- **AI-Powered Answers**: Get intelligent responses to ServiceNow questions using advanced AI technology
- **Community Knowledge**: Access curated content from ServiceNow community forums and documentation
- **Interactive Chat**: Modern chat interface with syntax highlighting and markdown support
- **Browse Q&A**: Explore categorized questions and answers with search functionality
- **Fast & Responsive**: Built with modern technologies for optimal performance
- **Docker Support**: Easy deployment with Docker Compose

## 🏗️ Architecture

### Backend (FastAPI + Python)
- **FastAPI**: Modern web framework for building APIs
- **PostgreSQL**: Database for storing questions, answers, and user queries
- **Redis**: Caching and session management
- **OpenAI/Anthropic**: AI integration for intelligent responses
- **Celery**: Background task processing for web scraping
- **SQLAlchemy**: Database ORM

### Frontend (React + TypeScript)
- **React 18**: Modern UI framework with hooks
- **TypeScript**: Type-safe development
- **Material-UI**: Beautiful, accessible UI components
- **React Router**: Client-side routing
- **Framer Motion**: Smooth animations
- **Syntax Highlighting**: Code highlighting with Prism.js

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/snow-ai.git
cd snow-ai
```

### 2. Environment Setup
```bash
# Copy environment file
cp .env.example .env

# Edit .env file with your configurations
# Optional: Add OpenAI API key for enhanced AI responses
```

### 3. Run with Docker Compose (Recommended)
```bash
# Build and start all services
docker-compose up --build

# Or run in background
docker-compose up -d --build
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

### 4. Initialize Sample Data
```bash
# Add sample ServiceNow questions and answers
curl -X POST http://localhost:8000/api/scraper/sample-data
```

## 💻 Local Development

### Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run database migrations
alembic upgrade head

# Start the development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

## 📊 API Endpoints

### Core Endpoints
- `POST /api/ask` - Ask a question to the AI assistant
- `GET /api/questions` - Get list of questions with filtering
- `GET /api/questions/{id}` - Get specific question with answers
- `GET /api/questions/categories/list` - Get available categories
- `GET /api/questions/stats/overview` - Get platform statistics

### Admin Endpoints
- `POST /api/scraper/start` - Start scraping ServiceNow community
- `POST /api/scraper/sample-data` - Add sample data for testing
- `GET /api/scraper/status` - Get scraping status

### Authentication
- `POST /api/auth/token` - Get access token
- `GET /api/auth/me` - Get current user info

## 🎯 Usage Examples

### Ask a Question via API
```bash
curl -X POST "http://localhost:8000/api/ask" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "question=How do I create a Business Rule in ServiceNow?"
```

### Search Questions
```bash
curl "http://localhost:8000/api/questions?search=business%20rule&category=Development"
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🐳 Docker Commands

```bash
# Build and start all services
docker-compose up --build

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild a specific service
docker-compose build backend
docker-compose up backend

# Access database
docker-compose exec postgres psql -U snowai -d snowai
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://snowai:snowai123@localhost:5432/snowai` |
| `REDIS_URL` | Redis connection string | `redis://localhost:6379` |
| `OPENAI_API_KEY` | OpenAI API key (optional) | None |
| `ANTHROPIC_API_KEY` | Anthropic API key (optional) | None |
| `SECRET_KEY` | JWT secret key | `your-secret-key-here` |
| `SERVICENOW_COMMUNITY_BASE_URL` | ServiceNow community URL | `https://community.servicenow.com` |

### AI Configuration
The application works without AI API keys by providing intelligent fallback responses. For enhanced AI capabilities:

1. **OpenAI**: Get API key from [OpenAI Platform](https://platform.openai.com/)
2. **Anthropic**: Get API key from [Anthropic Console](https://console.anthropic.com/)

Add your API key to the `.env` file:
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

## 🤝 Contributing

We welcome contributions from the ServiceNow community! Here's how you can help:

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Areas for Contribution
- **Data Sources**: Add more ServiceNow community sources
- **AI Improvements**: Enhance response quality and accuracy
- **UI/UX**: Improve user interface and experience
- **Documentation**: Add tutorials and guides
- **Testing**: Increase test coverage
- **Performance**: Optimize database queries and API responses

## 📈 Roadmap

- [ ] **Vector Search**: Implement semantic search using embeddings
- [ ] **User Accounts**: Add user registration and personalization
- [ ] **Bookmarks**: Allow users to save favorite questions
- [ ] **Advanced Filters**: Add more sophisticated filtering options
- [ ] **Mobile App**: React Native mobile application
- [ ] **Offline Mode**: Cache content for offline access
- [ ] **Analytics**: User behavior and content analytics
- [ ] **Multi-language**: Support for multiple languages

## 🐛 Troubleshooting

### Common Issues

**Backend won't start**
```bash
# Check if PostgreSQL is running
docker-compose ps

# View backend logs
docker-compose logs backend

# Restart backend service
docker-compose restart backend
```

**Frontend build errors**
```bash
# Clear node modules and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install

# Clear npm cache
npm cache clean --force
```

**Database connection issues**
```bash
# Reset database
docker-compose down -v
docker-compose up --build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This is an independent project and is not affiliated with, endorsed by, or sponsored by ServiceNow, Inc. ServiceNow is a trademark of ServiceNow, Inc. This tool is provided for educational and development purposes.

## 🙏 Acknowledgments

- ServiceNow Community for knowledge sharing
- OpenAI for AI capabilities
- React and FastAPI communities for excellent frameworks
- All contributors who help improve this project

---

**Made with ❤️ for the ServiceNow Developer Community**

For questions, suggestions, or support, please [open an issue](https://github.com/your-username/snow-ai/issues) or reach out to the community.