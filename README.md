# 🎯 AroundMe - AI-Curated Hyperlocal Contextual Alert System

> **Hackathon Project 2026**  
> Transform fragmented city signals into intelligent, contextual awareness using OpenAI reasoning

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.1-brightgreen)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5%20%2F%204-orange)](https://openai.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)](https://www.mongodb.com/)

---

## 🌟 Project Overview

**AroundMe** is an AI-first hyperlocal alert system that solves information overload in urban environments. Instead of showing scattered raw feeds from traffic apps, weather platforms, news portals, and event listings, AroundMe uses **OpenAI-powered reasoning** to:

✅ **Correlate** signals across multiple domains (traffic + rain + events)  
✅ **Prioritize** what matters based on user context (location, intent, interests)  
✅ **Explain** why each alert is relevant ("Why this matters to YOU")  
✅ **Deduplicate** overlapping information  
✅ **Rank** by impact level (HIGH / MEDIUM / LOW / INFO)

### The Problem
- Users rely on 5+ apps for city awareness
- Raw data with no prioritization → cognitive overload
- Missed important alerts, delayed reactions
- Manual correlation of signals required

### Our Solution
**AI as a reasoning engine** that transforms data into contextual intelligence.

---

## 🏗️ Architecture

```
┌─────────────┐
│   React     │  User inputs location, intent, filters
│   Frontend  │  
└──────┬──────┘
       │ HTTP REST
       ↓
┌─────────────────────┐
│   Spring Boot       │  Orchestrates data, calls OpenAI
│   Backend           │  
│   - AlertService    │  
│   - OpenAI Service  │  
│   - MockData (Demo)│  
└──────┬──────────────┘
       │
       ↓
┌─────────────────────┐
│   OpenAI API        │  AI reasoning & curation
│   GPT-3.5/4         │  - Correlation
│                     │  - Ranking
│                     │  - Explanation
└─────────────────────┘
       │
       ↓
┌─────────────────────┐
│   MongoDB           │  Stores alerts (persistent)
│   (Local)           │  + Mock data for demo
└─────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites
- **Java 17+** (for Spring Boot)
- **Node.js 18+** (for React)
- **MongoDB** (running locally on port 27017)
- **OpenAI API Key** ([Get one here](https://platform.openai.com/api-keys))

---

### 1️⃣ Backend Setup

```powershell
cd backend

# Set your OpenAI API key (Windows PowerShell)
$env:OPENAI_API_KEY="your-openai-api-key-here"

# Build the project
mvn clean install

# Run Spring Boot
mvn spring-boot:run
```

Backend will start on **http://localhost:8080**

**Check if it's running:**
```powershell
curl http://localhost:8080/api/alerts/health
```

---

### 2️⃣ Frontend Setup

```powershell
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will start on **http://localhost:5173**

---

### 3️⃣ MongoDB Setup

**Option A: Local MongoDB**
```powershell
# Install MongoDB from https://www.mongodb.com/try/download/community

# Start MongoDB service
mongod --dbpath C:\data\db
```

**Option B: MongoDB Atlas (Cloud - Free)**
- Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Get connection string
- Update `backend/src/main/resources/application.properties`:
  ```properties
  spring.data.mongodb.uri=mongodb+srv://<username>:<password>@cluster.mongodb.net/aroundme
  ```

---

## 🎮 How to Use

### Step 1: Enter Your Context
1. Open http://localhost:5173
2. Select your location (preset Vadodara locations available)
3. Choose search radius (2km / 5km / 10km)
4. Select interested categories (Traffic, Weather, Events, Safety)
5. **Optional:** Add intent (e.g., "Heading to ISKCON temple")

### Step 2: Get AI-Curated Alerts
- Click **"🤖 Get AI-Curated Alerts"**
- Backend fetches 10+ mock city signals
- **OpenAI analyzes and correlates** the data
- Returns 3-5 most relevant alerts with:
  - Impact level (HIGH/MEDIUM/LOW)
  - Distance from you
  - **"Why this matters"** AI explanation
  - Relevance score

### Step 3: Submit Community Alerts
- Click **"➕ Submit Community Alert"**
- Fill in title, description, category, location
- Submit to contribute to city awareness

---

## 🧠 AI Reasoning Example

**Input Signals (Raw Data):**
1. Heavy traffic on RC Dutt Road
2. Rainfall expected 6-9 PM
3. Cultural event at Akota Garden
4. Road construction on NH48
5. Marathon tomorrow morning
6. Parking full at Inorbit Mall
... (10+ more alerts)

**User Context:**
- Location: Akota, Vadodara
- Intent: "Heading to ISKCON temple"
- Radius: 5km
- Interested: Traffic, Weather, Events

**OpenAI Processing:**
```
1. Correlates: Traffic + Rain + Event → Congestion
2. Filters: Within 5km radius
3. Prioritizes: Impact on user's route to ISKCON
4. Explains: "Heavy traffic due to rain + event. Expect 25 min delay."
5. Ranks: HIGH impact (directly affects user)
```

**Output (Curated):**
- **Alert 1** (HIGH): "Heavy traffic near Akota due to cultural event + rain"
  - Why: "You're heading to ISKCON nearby. Expect delays."
- **Alert 2** (MEDIUM): "Parking full at nearby mall"
  - Why: "Alternate route may be congested."
- **Alert 3** (LOW): "Rain advisory for evening"
  - Why: "Carry umbrella if leaving after 6 PM."

---

## 📁 Project Structure

```
AroundMe/
├── backend/                          # Spring Boot Backend
│   ├── src/main/java/com/aroundme/
│   │   ├── controller/               # REST API endpoints
│   │   │   └── AlertController.java
│   │   ├── service/                  # Business logic
│   │   │   ├── AlertService.java
│   │   │   ├── OpenAIReasoningService.java  # ⭐ AI Brain
│   │   │   └── MockDataService.java  # Demo data generator
│   │   ├── model/                    # Data models
│   │   │   ├── Alert.java
│   │   │   ├── Location.java
│   │   │   ├── AlertCategory.java
│   │   │   └── ImpactLevel.java
│   │   ├── repository/               # MongoDB repositories
│   │   │   └── AlertRepository.java
│   │   ├── dto/                      # Request/Response DTOs
│   │   ├── config/                   # Configuration
│   │   │   ├── OpenAIConfig.java
│   │   │   └── CorsConfig.java
│   │   └── AroundMeApplication.java  # Main app
│   ├── pom.xml                       # Maven dependencies
│   └── src/main/resources/
│       └── application.properties    # Configuration
│
└── frontend/                         # React Frontend
    ├── src/
    │   ├── components/               # UI Components
    │   │   ├── ContextInput.jsx      # User input form
    │   │   ├── AlertFeed.jsx         # Alert display
    │   │   ├── AlertCard.jsx         # Individual alert
    │   │   └── SubmitAlert.jsx       # Alert submission
    │   ├── services/
    │   │   └── api.js                # API client
    │   ├── App.jsx                   # Main app
    │   └── main.jsx                  # Entry point
    ├── package.json
    └── vite.config.js
```

---

## 🔑 Key Features

### ✨ AI-Powered Reasoning
- **Contextual Understanding**: Knows your location, intent, destination
- **Cross-Domain Correlation**: Links traffic + weather + events
- **Impact Prediction**: HIGH (urgent) / MEDIUM / LOW / INFO
- **Explainable Output**: Every alert answers "Why does this matter?"

### 🎯 Smart Filtering
- Distance-based (2km / 5km / 10km)
- Category-based (Traffic, Safety, Events, etc.)
- Intent-aware (considers where you're going)

### 👥 Community Contributions
- Users can submit local alerts
- AI validates & deduplicates
- Enriches city awareness data

### 🎨 Clean UI/UX
- Modern, gradient-based design
- Color-coded impact levels
- Mobile-responsive
- Real-time loading states

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, Axios |
| **Backend** | Spring Boot 3.2, Java 17 |
| **Database** | MongoDB |
| **AI Engine** | OpenAI GPT-3.5-turbo / GPT-4 |
| **API Design** | REST |
| **Styling** | CSS Modules |

---

## 📡 API Endpoints

### 🔹 GET `/api/alerts/health`
Health check endpoint

### 🔹 POST `/api/alerts/curated`
Get AI-curated alerts based on user context

**Request Body:**
```json
{
  "latitude": 22.3072,
  "longitude": 73.1812,
  "address": "Akota, Vadodara",
  "radiusKm": 5,
  "interestedCategories": ["TRAFFIC", "WEATHER", "EVENTS"],
  "intent": "Heading to ISKCON temple",
  "destination": "ISKCON Vadodara"
}
```

**Response:**
```json
{
  "alerts": [
    {
      "id": "MOCK-123",
      "title": "Heavy Traffic Near Akota",
      "description": "...",
      "category": "TRAFFIC",
      "impact": "HIGH",
      "relevanceScore": 95.0,
      "whyItMatters": "You're heading to ISKCON nearby. Expect 25 min delay.",
      "distanceFromUser": 1.2,
      "location": { "address": "RC Dutt Road, Akota" }
    }
  ],
  "aiSummary": "Heavy traffic detected due to rain and cultural event...",
  "totalAlertsAnalyzed": 12,
  "relevantAlertsReturned": 4
}
```

### 🔹 POST `/api/alerts/submit`
Submit a new community alert

**Request Body:**
```json
{
  "title": "Road blocked",
  "description": "Tree fell on main road",
  "category": "SAFETY",
  "latitude": 22.3072,
  "longitude": 73.1812,
  "address": "Main Street",
  "submittedBy": "John Doe"
}
```

### 🔹 GET `/api/alerts/categories`
Get all available alert categories

---

## 🎪 Hackathon Demo Script

### Scenario 1: Morning Commute
**Context:** User at Akota, heading to work at Alkapuri  
**AI Response:** Traffic jam + road work → "Take alternate route via Sayajigunj"

### Scenario 2: Event Planning
**Context:** User planning evening temple visit  
**AI Response:** Rain + event nearby → "Expect crowds & parking issues"

### Scenario 3: Community Alert
**User submits:** "Accident near Sayajigunj Circle"  
**System:** Stores alert → Future AI queries include this

---

## 🔮 Future Enhancements

- [ ] **Push Notifications** for critical alerts
- [ ] **Voice Input** for intent/destination
- [ ] **Real API Integrations** (Google Maps, Weather, Event APIs)
- [ ] **User Profiles** with saved preferences
- [ ] **Municipal Dashboard** for authorities
- [ ] **Multi-City Support**
- [ ] **Historical Analytics**
- [ ] **Duplicate Detection** using embeddings
- [ ] **Mobile Apps** (React Native)

---

## 🐛 Troubleshooting

### Backend won't start
```powershell
# Check Java version
java -version  # Should be 17+

# Check MongoDB connection
mongosh  # Should connect to mongodb://localhost:27017

# Verify OpenAI key is set
echo $env:OPENAI_API_KEY
```

### Frontend can't connect to backend
- Ensure backend is running on port 8080
- Check CORS configuration in `CorsConfig.java`
- Verify API base URL in `frontend/src/services/api.js`

### OpenAI API errors
- **Rate limit:** Wait a few seconds between requests
- **Invalid key:** Check API key in application.properties
- **Quota exceeded:** Check OpenAI billing dashboard

### MongoDB connection failed
- Start MongoDB: `mongod --dbpath C:\data\db`
- Or use MongoDB Atlas cloud database

---

## 📝 Configuration

### Backend Configuration
Edit `backend/src/main/resources/application.properties`:

```properties
# Server
server.port=8080

# MongoDB
spring.data.mongodb.uri=mongodb://localhost:27017/aroundme

# OpenAI
openai.api.key=${OPENAI_API_KEY}
openai.model=gpt-3.5-turbo  # or gpt-4 for better results

# CORS
cors.allowed.origins=http://localhost:5173
```

### Frontend Configuration
Edit `frontend/src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

---

## 👥 Team / Contributors

Built for **Hackathon 2026**

---

## 📄 License

This project is created for educational and hackathon purposes.

---

## 🙏 Acknowledgments

- **OpenAI** for GPT models and reasoning capabilities
- **Spring Boot** for robust backend framework
- **React** for modern frontend development
- **MongoDB** for flexible data storage

---

## 🎯 One-Line Summary

**AroundMe uses OpenAI reasoning to transform fragmented city signals into contextual, explainable alerts that tell users what matters around them and why.**

---

## 📞 Support

For issues or questions during the hackathon:
- Check logs in `backend/logs/` or browser console
- Verify all services are running (MongoDB, Backend, Frontend)
- Test API endpoints with curl or Postman

**Happy Hacking! 🚀**
