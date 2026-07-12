# SigmaGPT 🤖

A secure, responsive, and full-stack Generative AI chat application engineered to provide a seamless conversational experience using premium LLM models. 

## 🚀 Overview

SigmaGPT is a modern web application built to mirror the functionality of enterprise AI chat interfaces. It acts as a secure proxy to the OpenRouter API, allowing users to select between different AI models (like SigmaGPT-4o and Pro) while isolating their conversational data within a dedicated NoSQL database.

## ✨ Key Features

* **Secure Authentication:** Robust user registration and login system utilizing `bcryptjs` for password hashing and JSON Web Tokens (JWT) for stateless route protection.
* **Dynamic Model Selection:** Interactive UI dropdown allowing users to switch between standard and premium AI models on the fly.
* **Persistent Theming:** Seamless Light/Dark mode toggling managed via native CSS variables and persisted in browser LocalStorage.
* **Isolated Chat History:** Backend middleware ensures users can only read, write, and delete conversational threads tied explicitly to their authenticated MongoDB `ObjectId`.
* **Polished UI/UX:** Features interactive CSS-animated modals for User Settings and Upgrade paths, alongside clean markdown rendering for AI responses.

## 🛠️ Technology Stack

**Frontend:**
* React.js (Vite)
* React Router DOM (Route Guarding)
* Context API (Global State Management)
* Pure CSS (Custom Animations & Theming)

**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose
* JSON Web Tokens (JWT) & Bcrypt
* OpenRouter API Integration

## 💻 Running Locally (Git Bash)

To run this project on your local machine, follow these steps using your Git Bash terminal.

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/YOUR_GITHUB_USERNAME/SigmaGPT.git
cd SigmaGPT
\`\`\`

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
\`\`\`bash
cd backend
npm install
\`\`\`
Create a `.env` file in the `backend` directory and add your keys:
\`\`\`env
PORT=8080
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
OPENROUTER_API_KEY=your_openrouter_api_key
\`\`\`
Start the backend server:
\`\`\`bash
npm run dev
\`\`\`

### 3. Frontend Setup
Open a new Git Bash terminal, navigate to the frontend directory, and install dependencies:
\`\`\`bash
cd frontend
npm install
\`\`\`
Start the Vite development server:
\`\`\`bash
npm run dev
\`\`\`

Open `http://localhost:5173` in your browser to view the application.

## 👨‍💻 Author

Developed by **Amit Gavane**. 
Final Year B.Tech IT Student specializing in Full-Stack Web Development (MERN).