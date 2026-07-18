<div align="center">

<img src="./frontend/public/favicon.svg" width="150" height="150" alt="TRUVA Logo"/>

# 🚀 TRUVA

## **Trust Every Digital Decision**

<img src="https://readme-typing-svg.herokuapp.com?font=Orbitron&weight=700&size=25&duration=2500&pause=800&color=00F5FF&center=true&vCenter=true&width=700&lines=AI-Powered+Digital+Trust+Platform;Analyze+Digital+Reality+With+AI;Detect+Risk.+Measure+Trust.+Decide+Better." />

<br/>

<img src="./assets/truva-hero.gif" width="850" alt="TRUVA AI Animation"/>

<br/>

<p>
  <strong>
    🧠 AI-powered platform for analyzing digital information,
    detecting risks, and generating trust intelligence.
  </strong>
</p>

<br/>

<img src="https://img.shields.io/badge/AI-Trust%20Intelligence-00ffff?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Security-Enterprise%20Grade-8a2be2?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Platform-Digital%20Verification-ff00ff?style=for-the-badge"/>

<br/><br/>

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.x-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

<br/>

<img src="https://img.shields.io/github/stars/mac-juniordev/Truva?style=for-the-badge&color=00ffff"/>
<img src="https://img.shields.io/github/forks/mac-juniordev/Truva?style=for-the-badge&color=8a2be2"/>

<br/>

</div>


---

# 🌌 About TRUVA

> **Trust Every Digital Decision**

TRUVA is an AI-powered Digital Trust Analysis Platform designed to help users understand whether digital information can be trusted.

In a world where content can be generated, modified, and manipulated instantly, TRUVA provides intelligent analysis through multiple AI-powered verification systems.

Users can submit:

- 📄 Documents
- 📝 Text content
- 🔗 URLs
- 🖼 Images
- 📦 Digital files


TRUVA produces:

- ✅ Trust confidence scores
- 📊 Risk analysis
- 🧠 AI explanations
- 📋 Recommendations
- 📄 Detailed reports


<div align="center">

<img src="./assets/truva-particles.svg" width="100%" />

</div>


---

# ✨ Core Features


<table>
<tr>

<td align="center">

<img src="./assets/security.gif" width="90"/>

## 🔐 Security

JWT authentication  
Secure sessions  
Password encryption

</td>


<td align="center">

<img src="./assets/ai.gif" width="90"/>

## 🧠 AI Analysis

Multiple AI analyzers  
Smart verification engine  
Real-time processing

</td>


<td align="center">

<img src="./assets/chart.gif" width="90"/>

## 📊 Trust Intelligence

Confidence scoring  
Risk detection  
Visual insights

</td>

</tr>


<tr>

<td align="center">

<img src="./assets/report.gif" width="90"/>

## 📄 Reports

PDF exports  
HTML reports  
JSON data

</td>


<td align="center">

<img src="./assets/dashboard.gif" width="90"/>

## 🎨 Dashboard

Premium UI  
Dark futuristic theme  
Live updates

</td>


<td align="center">

<img src="./assets/history.gif" width="90"/>

## 🕒 History

Saved analysis  
Tracking  
Review system

</td>

</tr>

</table>


---

# 🏗️ System Architecture


<div align="center">

<img src="./assets/truva-architecture.svg" width="900"/>

</div>


```
                         USER

                          |
                          |
                    ✨ Secure Request
                          |
                          ↓

              ┌────────────────────┐
              │                    │
              │ React Frontend     │
              │ TypeScript + Vite  │
              │                    │
              └─────────┬──────────┘

                        |
                        |
                 🔵 API Communication

                        ↓


              ┌────────────────────┐
              │                    │
              │ Backend API        │
              │ Node.js Express    │
              │                    │
              └─────────┬──────────┘


                        |
                        |
                 🧠 AI Processing


                        ↓


              ┌────────────────────┐
              │                    │
              │ Analysis Engine    │
              │                    │
              └─────────┬──────────┘


                        |
              ┌─────────┼─────────┐
              ↓         ↓         ↓


        Document     Text       Link
        Analyzer    Analyzer   Analyzer


                        |
                        ↓


                 📊 TRUST SCORE

                        |
                        ↓

                 📄 REPORT ENGINE
```


---

# 🛠️ Technology Stack


## Frontend

| Technology | Purpose |
|-|-|
| React 18 | UI Framework |
| TypeScript | Type Safety |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| React Router | Navigation |
| Zustand | State Management |
| Axios | API Communication |
| React Hook Form | Forms |
| Zod | Validation |


## Backend

| Technology | Purpose |
|-|-|
| Node.js | Runtime |
| Express | API Framework |
| TypeScript | Development |
| PostgreSQL | Database |
| JWT | Authentication |
| bcrypt | Password Security |


## AI Engine

| Technology | Purpose |
|-|-|
| Python | AI Runtime |
| FastAPI | AI API |
| Transformers | AI Models |
| Machine Learning | Analysis Engine |


---

# 🚀 Getting Started


## Requirements

Before installing:

```
Node.js >= 20
PostgreSQL >= 16
Python >= 3.11
npm
```


---

# Installation


## 1. Clone Repository

```bash
git clone https://github.com/mac-juniordev/Truva.git

cd Truva
```


## 2. Backend Setup

```bash
cd backend

npm install

cp .env.example .env

npm run migrate

npm run dev
```


## 3. Frontend Setup

```bash
cd frontend

npm install

cp .env.example .env

npm run dev
```


## 4. AI Service Setup

```bash
cd ai-engine

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

uvicorn api.main:app --reload
```

---

# ⚙️ Environment Configuration


## Backend `.env`

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=truva
DB_USER=postgres
DB_PASSWORD=your_password


# Authentication
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret


# Server
PORT=5000
NODE_ENV=development
```


## Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api
```


## AI Engine `.env`

```env
AI_SERVICE_PORT=8000

MODEL_PATH=models/

ENVIRONMENT=development
```


---

# 📁 Project Structure


```
TRUVA/

├── frontend/
│
│   ├── src/
│   │
│   │   ├── components/
│   │   │       # Reusable UI components
│   │   │
│   │   ├── pages/
│   │   │       # Application pages
│   │   │
│   │   ├── features/
│   │   │       # Feature modules
│   │   │
│   │   ├── hooks/
│   │   │       # Custom React hooks
│   │   │
│   │   ├── services/
│   │   │       # API services
│   │   │
│   │   ├── routes/
│   │   │       # Route configuration
│   │   │
│   │   ├── utils/
│   │   │       # Helper functions
│   │   │
│   │   ├── App.tsx
│   │   │
│   │   └── main.tsx
│   │
│   └── package.json
│


├── backend/
│
│   ├── src/
│   │
│   │   ├── config/
│   │   │       # Application configuration
│   │   │
│   │   ├── modules/
│   │   │       # Feature modules
│   │   │
│   │   ├── core/
│   │   │       # Core business logic
│   │   │
│   │   ├── middleware/
│   │   │       # Express middleware
│   │   │
│   │   ├── database/
│   │   │       # Database migrations
│   │   │
│   │   ├── routes/
│   │   │       # API routes
│   │   │
│   │   ├── app.ts
│   │   │
│   │   └── server.ts
│   │
│   └── package.json
│


├── ai-engine/
│
│   ├── api/
│   │       # FastAPI endpoints
│   │
│   ├── analyzers/
│   │       # AI analyzer modules
│   │
│   ├── models/
│   │       # AI models
│   │
│   ├── shared/
│   │       # Shared utilities
│   │
│   └── requirements.txt
│


└── README.md

```


---

# 🧪 Testing


## Backend

```bash
cd backend

npm test
```


## Frontend

```bash
cd frontend

npm test
```


## AI Engine

```bash
cd ai-engine

pytest
```


---

# 🔬 Analysis Pipeline


<div align="center">


<img src="./assets/truva-pipeline.svg" width="850"/>


</div>


```
INPUT

 📄 Document
 📝 Text
 🔗 URL
 🖼 Image


        |
        |
        ↓


🔍 Pre Processing


        |
        |
        ↓


🧠 AI Analyzer Network


        |
        |
        ↓


📊 Trust Calculation


        |
        |
        ↓


📄 Intelligence Report


```


---

# 🧠 AI Analyzer System


TRUVA uses independent analyzers working together.


```
                 ANALYZER CORE


                      |
        ┌─────────────┼─────────────┐
        |
        |
        ↓


 Document AI       Text AI        Link AI


        |
        |
        ↓


  Evidence Collection


        |
        |
        ↓


  Trust Intelligence Model


        |
        |
        ↓


 Final Confidence Score

```


---

# 🤝 Contributing


Contributions are welcome.


## Workflow


```
1. Fork repository

2. Create feature branch

3. Implement changes

4. Run tests

5. Submit pull request

```


Example:

```bash
git checkout -b feature/new-analyzer

git commit -m "feat: add new AI analyzer"

git push origin feature/new-analyzer
```


---

# 📝 Commit Convention


| Type | Meaning |
|-|-|
| feat | New feature |
| fix | Bug fix |
| docs | Documentation |
| style | Styling |
| refactor | Code improvement |
| test | Testing |
| chore | Maintenance |


---

# 🌐 Future Roadmap


<div align="center">


🚀 Version 1

```
✓ Authentication
✓ AI Analysis
✓ Trust Scores
✓ Reports
```


🧠 Version 2

```
→ Advanced AI Models
→ More Analyzer Plugins
→ Team Collaboration
```


🌎 Version 3

```
→ Global Trust Network
→ Enterprise Intelligence
→ Real-time Monitoring
```


</div>


---

# 🔒 Security


TRUVA follows modern security practices:


- 🔐 JWT authentication
- 🔑 Password encryption
- 🛡 Protected API routes
- 🔒 Secure database handling
- ⚡ Input validation
- 🧠 AI safety monitoring


---

# 📄 License


This project is proprietary and confidential.

All rights reserved.


---

# 🙏 Acknowledgments


Built By MacDotCom


Special thanks to everyone contributing to the future of digital trust.


---

<div align="center">


<img src="./assets/truva-wave.svg" width="100%"/>


<br/>


# 🚀 TRUVA


## Trust Every Digital Decision


```
        🧠 AI Intelligence

             +

        🔐 Digital Security

             +

        📊 Trust Analytics

             =

        The Future Of Digital Confidence
```


<br/>


<img src="./assets/truva-footer-animation.gif" width="700"/>


<br/>


<sub>
Built with modern software engineering practices
</sub>


</div>
