# 🌍 BookIt: Experiences & Slots

A fullstack web application where users can explore curated travel experiences, select time slots, and complete bookings — built with **Next.js**, **TypeScript**, **TailwindCSS**, and a backend API integration.

---

## 🚀 Live Demo

🔗 **Frontend (Live App):** [https://bookit-fawn.vercel.app/](https://bookit-fawn.vercel.app/)  
💻 **GitHub Repository:** [https://github.com/bhavesh-bari/bookIt](https://github.com/bhavesh-bari/bookIt)

---

## 🎯 Objective

BookIt is designed as part of the **Fullstack Intern Assignment** to demonstrate the ability to build a complete end-to-end application — from frontend UI to backend API integration — simulating a real-world travel experience booking platform.

---

## 🏗️ Tech Stack

### **Frontend**
- ⚛️ [Next.js 16 (App Router)](https://nextjs.org/)
- 🟦 [TypeScript](https://www.typescriptlang.org/)
- 🎨 [TailwindCSS](https://tailwindcss.com/)
- 📦 Axios / Fetch for API calls
- 🧭 Next Router for navigation
- 🔤 Lucide Icons for icons
- 🖼️ Next Image for optimized media

### **Backend (for API Integration)**
- 🟩 Node.js + Express (or NestJS)
- 🗄️ MongoDB / PostgreSQL / MySQL
- 🔐 RESTful API with validation and error handling

---

## 🧩 Features

### 🏠 Home Page
- Fetches experiences dynamically from backend (`GET /experiences`)
- Displays title, location, price, and image
- Fully responsive grid layout

### 📄 Details Page
- Shows experience details using dynamic routing (`/experience/[id]`)
- Lists available dates and time slots (`GET /experiences/:id`)
- "Book Now" button navigates to checkout

### 💳 Checkout Page
- Prefills selected experience details
- User form with validation (name, email)
- Promo code validation (`POST /promo/validate`)
- Displays price summary, taxes, and total

### ✅ Result Page
- Displays success or failure message based on booking status
- Booking confirmation stored via (`POST /bookings`)

---

## 📦 Folder Structure

bookIt/
├── app/
│ ├── page.tsx # Home Page
│ ├── experience/[id]/page.tsx # Experience Details Page
│ ├── checkout/page.tsx # Checkout Page
│ ├── result/page.tsx # Result Page
│ ├── globals.css # Global styles
│
├── components/
│ ├── Navbar.tsx
│ ├── ExperienceCard.tsx
│ ├── BookingDetails.tsx
│ ├── Checkout.tsx
│ └── ResultMessage.tsx
│
├── public/ # Static images
├── package.json
├── tailwind.config.ts
└── tsconfig.json

## ⚙️ Local Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/bhavesh-bari/bookIt.git
cd bookIt

2️⃣ Install Dependencies
pnpm install
# or
npm install

3️⃣ Run Development Server
pnpm dev
# or
npm run dev


Visit ➡️ http://localhost:3000

🏁 Summary

✅ Fully responsive frontend
✅ Dynamic data via API calls
✅ Complete booking flow
✅ Hosted live for easy review
✅ Built with production-ready best practices in Next.js + TailwindCSS