# 🚀 BlinkFlow AI – Backend

This is the backend of **BlinkFlow AI**, responsible for handling API requests, generating AI responses, and storing results in the database.

It is optimized for performance by avoiding unnecessary API calls using a caching mechanism.

---

## 🔗 Frontend Repository

You can find the frontend for this project here:

👉 **Frontend Repo:**
https://github.com/rahulsr-ai/BlinkFlow-frontend.git

> Make sure to set the correct `VITE_API_URL` in the frontend env file to connect with this backend.

---

## ✨ Features

* 🔹 REST API built with **Node.js & Express**
* 🔹 AI response generation using **OpenRouter API**
* 🔹 Database integration with **MongoDB (Mongoose)**
* 🔹 Smart caching (avoids duplicate API calls)
* 🔹 Fast response for repeated prompts

---

## 🧠 How It Works

1. Frontend sends a **prompt** to the backend

2. Backend checks:

   * If the prompt already exists in the database ✅
   * If YES → return saved response (⚡ fast)
   * If NO → call OpenRouter API

3. If new response is generated:

   * It can be saved in MongoDB

4. Response is sent back to frontend

👉 This helps:

* Reduce API usage 💸
* Improve speed ⚡
* Optimize performance 🚀

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/rahulsr-ai/BlinkFlow-frontend.git
cd <project-folder>
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Setup Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=8080
OPENROUTER_API_KEY=your_openrouter_api_key
MONGO_URI=your_mongodb_connection_string
```

---

### 🔑 Environment Variables Explained

* **PORT** → Server port (default: 8080)
* **OPENROUTER_API_KEY** → Required for generating AI responses
* **MONGO_URI** → Your MongoDB database connection string

---

### 4. Run the Server

```bash
npm run dev
```

---

## 🌐 API Endpoints

### 1. Generate AI Response

```http
POST /api/ask-ai
```

### Request Body

```json
{
  "prompt": "What is Node.js?"
}
```

### Behavior

* Checks if response already exists in DB
* If found → returns cached response
* If not → calls OpenRouter API

---

### 2. Save Result to Database

```http
POST /api/save-result
```

### Request Body

```json
{
  "prompt": "What is Node.js?",
  "result": "Node.js is a runtime environment..."
}
```

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* OpenRouter SDK
* Axios
* CORS
* Dotenv

---

## 📦 Dependencies

```json
{
  "@openrouter/sdk": "^0.9.11",
  "axios": "^1.13.6",
  "cors": "^2.8.6",
  "dotenv": "^17.3.1",
  "express": "^5.2.1",
  "mongoose": "^9.3.1"
}
```

---

## 📌 Notes

* Make sure MongoDB is connected before making API requests
* Never expose your API key publicly
* Cached responses improve speed and save API call
* Ensure `.env` file is correctly configured

---

## 💡 Future Improvements

* Save responses after generation

---

## 👨‍💻 Author

Developed by Rahul
Feel free to explore, modify, and improve 🚀

---
