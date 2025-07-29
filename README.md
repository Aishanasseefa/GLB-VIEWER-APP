# 🧊 3D GLB Model Viewer Web Application

This project is a full-stack web application that allows users to **upload**, **store**, and **view 3D models in `.glb` format** using a browser-based viewer. The app is built using **React (frontend)**, **Node.js + Express (backend)**, **MongoDB (database)**, and **Cloudinary (file storage)**. It is deployed using **Render** and **Vercel**.

---

## 🔗 Live Demo

- 🚀 **Backend (Render):**  
  [https://glb-viewer-app.onrender.com](https://glb-viewer-app.onrender.com/)

- 🌐 **Frontend (Vercel):**  
  [https://glb-viewer-m17e042ke-aisha-nasseefa-m-fs-projects.vercel.app](https://glb-viewer-m17e042ke-aisha-nasseefa-m-fs-projects.vercel.app/)

---

## 📂 Features

- Upload `.glb` 3D model files.
- View uploaded models using `@google/model-viewer`.
- Store file metadata in MongoDB.
- Store files securely in Cloudinary.
- Delete existing models from the dashboard.

---

## 🛠️ Tech Stack

| Layer     | Technology                  |
|-----------|-----------------------------|
| Frontend  | React, Axios, Model-Viewer  |
| Backend   | Node.js, Express, Multer    |
| Database  | MongoDB (Mongoose)          |
| Storage   | Cloudinary                  |
| Deployment| Vercel (frontend), Render (backend) |

---

## 📁 Folder Structure

glb-viewer-app/ │ ├── backend/ │   ├── models/ │   ├── routes/ │   ├── .env │   └── server.js │ ├── frontend/ │   ├── src/ │   │   ├── components/ │   │   └── App.js │   ├── .env │ └── README.md

---

## 📦 Deployment

- **Frontend:** Vercel (`npm run build`)
- **Backend:** Render with auto-deploy
- Environment variables are configured in respective platforms

---

## 🧪 API Endpoints (Backend)

| Method | Endpoint             | Description              |
|--------|----------------------|--------------------------|
| POST   | `/api/models/upload` | Upload a `.glb` file     |
| GET    | `/api/models`        | Get all uploaded models  |
| DELETE | `/api/models/:id`    | Delete a model by ID     |

---

## 🧑‍💻 Author

**Aisha Nasseefa**

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

