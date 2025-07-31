# Portfolio Website API Contracts

## Overview
This document outlines the API contracts for the portfolio website, describing the endpoints, data models, and integration patterns between the frontend and backend systems.

## Base Configuration
- **Backend URL**: `process.env.REACT_APP_BACKEND_URL`
- **API Prefix**: `/api`
- **Database**: MongoDB with collections for contacts, projects, experiences, and technical expertise

## API Endpoints

### Health Check
- **GET** `/api/` - API status check
- **GET** `/api/health` - Health check endpoint

### Contact Management
- **POST** `/api/contact/` - Submit contact form
- **GET** `/api/contact/` - Get all messages (admin)
- **GET** `/api/contact/{id}` - Get specific message
- **PATCH** `/api/contact/{id}/status` - Update message status

### Portfolio Data
- **GET** `/api/portfolio/projects` - Get all projects
- **GET** `/api/portfolio/projects/{id}` - Get specific project
- **GET** `/api/portfolio/experience` - Get work experience
- **GET** `/api/portfolio/expertise` - Get technical expertise
- **GET** `/api/portfolio/stats` - Get portfolio statistics

## Data Models

### Contact Form
```javascript
// Frontend form submission
{
  name: string,
  email: string,
  subject: string,
  message: string
}

// Backend response
{
  id: string,
  name: string,
  email: string,
  subject: string,
  message: string,
  timestamp: datetime,
  status: "unread" | "read" | "replied"
}
```

### Project Model
```javascript
{
  id: string,
  title: string,
  description: string,
  detailed_description?: string,
  technologies: string[],
  category: string,
  status: string,
  impact?: string,
  client?: string,
  duration?: string,
  team_size?: number,
  role?: string,
  challenges?: string[],
  solutions?: string[]
}
```

### Experience Model
```javascript
{
  id: string,
  company: string,
  role: string,
  period: string,
  location: string,
  achievements: string[],
  detailed_responsibilities?: string[],
  technologies_used?: string[],
  team_leadership?: boolean,
  key_projects?: string[]
}
```

## Frontend Integration Plan

### Current Mock Data (to be replaced)
- `/app/frontend/src/data/mock.js` contains all mock portfolio data
- This will be replaced with API calls to backend endpoints

### Components to Update
1. **Portfolio.js** - Replace mock data loading with API calls
2. **Contact.js** - Connect form submission to backend
3. **Projects.js** - Fetch projects from API
4. **Experience.js** - Fetch experience from API
5. **Skills.js** - Fetch technical expertise from API

### API Integration Steps
1. Create API service layer (`/app/frontend/src/services/api.js`)
2. Replace mock data with real API calls
3. Add loading states and error handling
4. Implement form submission functionality
5. Add proper state management for API responses

### Error Handling
- Display user-friendly error messages
- Implement retry mechanisms for failed requests
- Show loading states during API calls
- Graceful fallbacks when data is unavailable

### Backend Seeding
- Need to populate database with actual portfolio data
- Contact form will store submissions in MongoDB
- Admin interface may be needed for managing messages

## Technical Notes
- All API routes use `/api` prefix for proper Kubernetes ingress routing
- CORS is configured for frontend domain
- MongoDB collections will be automatically created
- Indexes are created for performance optimization
- Email validation is handled by backend
- All timestamps are in UTC format