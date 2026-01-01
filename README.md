# 🚀 SCSMCOE AI: The Campus Operating System

**SCSMCOE AI** is a world-class, AI-powered "Super App" designed exclusively for the students and faculty of **Shri Chatrapati Shivaji Maharaj College of Engineering, Nepti-Ahmednagar**. 

It transitions the traditional college experience into a proactive, centralized digital ecosystem—going far beyond a simple notice board to provide career guidance, academic tracking, and campus life management.

---

## ✨ Core Modules

### 🤖 1. The AI Neural Center (Gemini Integration)
*   **Campus Briefing**: Gemini automatically summarizes long college notices into 10-word "TL;DR" bites on your feed.
*   **Academic Advisor**: Personalized study plans and high-impact resource links generated based on your current syllabus progress.
*   **Smart Escalation**: AI-powered support desk that auto-prioritizes infrastructure issues based on urgency.

### 🏆 2. The Arena (Sports Hub)
*   **Live Scoreboard**: Real-time updates for inter-departmental cricket and football matches.
*   **Performance Analytics**: Department leaderboards and "MVP of the Month" showcases.
*   **Equipment Kiosk**: Real-time availability tracking for college sports gear.

---

## 🛠️ Technical Stack

-   **Frontend**: React 19 (ES6 Modules)
-   **Styling**: Tailwind CSS
-   **Intelligence**: Google Gemini API (`@google/genai`)
-   **Icons**: Lucide React
-   **Deployment**: Netlify

---

## 🚀 Running Locally

1.  **Environment Setup**:
    ```bash
    export API_KEY=your_gemini_api_key_here
    ```
2.  **Installation & Launch**:
    ```bash
    npm install
    npm run dev
    ```

---

## 🌐 Deploying to Netlify

Deploying this app to Netlify is straightforward. Follow these steps:

### 1. Prepare your Repository
Ensure your code is pushed to a Git provider (GitHub, GitLab, or Bitbucket).

### 2. Create a New Site on Netlify
1.  Log in to [Netlify](https://app.netlify.com/).
2.  Click **"Add new site"** > **"Import an existing project"**.
3.  Connect your GitHub account and select this repository.

### 3. Configure Build Settings
Netlify should auto-detect the settings, but ensure they match:
*   **Build Command**: `npm run build`
*   **Publish Directory**: `dist` (or `build` depending on your build tool)

### 4. Set Environment Variables (CRITICAL)
Your app will not function without the Gemini API Key.
1.  In the Netlify dashboard for your site, go to **Site configuration** > **Environment variables**.
2.  Click **"Add a variable"**.
3.  Key: `API_KEY`
4.  Value: `[Your Google Gemini API Key]`
5.  Click **Save**.

### 5. Deploy
Click **"Deploy site"**. Netlify will build your project and provide a live URL.

---

## 🎨 Design Philosophy
The UI follows a **"Neo-Shadow"** aesthetic: high-contrast typography, generous whitespace, and rounded-corner surfaces (`rounded-[2.5rem]`). It is designed to feel like a premium OS rather than a static website.

Developed with ❤️ for **SCSMCOE Nepti**.