.PHONY: help build up down logs clean install-backend install-frontend test setup

# Default target
help:
	@echo "ServiceNow AI Assistant - Development Commands"
	@echo ""
	@echo "Available commands:"
	@echo "  setup           - Initial project setup"
	@echo "  build           - Build all Docker containers"
	@echo "  up              - Start all services"
	@echo "  down            - Stop all services"
	@echo "  logs            - Show logs from all services"
	@echo "  clean           - Clean up containers and volumes"
	@echo "  install-backend - Install backend dependencies"
	@echo "  install-frontend- Install frontend dependencies"
	@echo "  test            - Run all tests"
	@echo "  sample-data     - Add sample data to database"

# Initial setup
setup:
	@echo "Setting up ServiceNow AI Assistant..."
	@cp .env.example .env || true
	@echo "✅ Environment file created. Please edit .env with your settings."
	@docker-compose build
	@echo "✅ Docker containers built successfully!"
	@echo ""
	@echo "Next steps:"
	@echo "1. Edit .env file with your configurations"
	@echo "2. Run 'make up' to start the application"
	@echo "3. Run 'make sample-data' to add sample data"

# Build containers
build:
	docker-compose build

# Start services
up:
	docker-compose up -d
	@echo "🚀 ServiceNow AI Assistant is starting up..."
	@echo ""
	@echo "Frontend: http://localhost:3000"
	@echo "Backend:  http://localhost:8000"
	@echo "API Docs: http://localhost:8000/docs"
	@echo ""
	@echo "Use 'make logs' to view logs"

# Stop services
down:
	docker-compose down

# Show logs
logs:
	docker-compose logs -f

# Clean up
clean:
	docker-compose down -v
	docker system prune -f

# Install backend dependencies
install-backend:
	cd backend && pip install -r requirements.txt

# Install frontend dependencies
install-frontend:
	cd frontend && npm install

# Run tests
test:
	@echo "Running backend tests..."
	cd backend && python -m pytest
	@echo "Running frontend tests..."
	cd frontend && npm test -- --coverage --watchAll=false

# Add sample data
sample-data:
	@echo "Adding sample data..."
	@sleep 5  # Wait for services to be ready
	curl -X POST http://localhost:8000/api/scraper/sample-data || echo "⚠️  Backend not ready yet. Try again in a few seconds."

# Development mode (with live reload)
dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Production build
prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Backup database
backup:
	docker-compose exec postgres pg_dump -U snowai snowai > backup_$(shell date +%Y%m%d_%H%M%S).sql

# Restore database
restore:
	@read -p "Enter backup file name: " backup_file; \
	docker-compose exec -T postgres psql -U snowai snowai < $$backup_file