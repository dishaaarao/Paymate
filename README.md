<!-- ======================= PAYMATE LOGO ======================= -->
<p align="center">
  <img src="assets/logo.png" width="320" alt="PayMate Money Logo"/>
</p>

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Inter&size=26&duration=2800&pause=500&color=0AA6E8&center=true&vCenter=true&width=750&lines=Secure+Digital+Wallet;JWT+Authentication;Modern+MERN+Architecture;Fintech-Ready+Full+Stack+Application" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Stack-MERN-blueviolet?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Database-MongoDB-darkgreen?style=for-the-badge"/>
</p>

---

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&height=2"/>

## 🌟 About PayMate

**PayMate Money** is a full-stack **digital wallet application** inspired by real-world fintech platforms such as **Paytm and PhonePe**.  
The project demonstrates **secure authentication**, **wallet management**, and **transaction handling** using modern web technologies.

---

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&height=2"/>

## 📸 UI Preview

<p align="center">
  <img src="assets/login.png" width="260"/>
  <img src="assets/dashboard.png" width="260"/>
  <img src="assets/transactions.png" width="260"/>
</p>

---

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&height=2"/>

## 🎥 User Flow Demo

<p align="center">
  <img src="assets/paymate-flow.gif" width="520"/>
</p>
<!-- ===================== USER FLOW SECTION ===================== -->

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&height=3"/>

<h2 align="center">🌀 PayMate – User Flow</h2>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Inter&size=18&duration=3000&pause=800&color=3B82F6&center=true&vCenter=true&width=700&lines=Fast+•+Secure+•+Seamless+Money+Transfer;End-to-End+User+Journey+of+PayMate;From+Login+to+Successful+Transaction" />
</p>

---

### 🚀 Step-by-Step User Journey

#### 1️⃣ Entry Point
- User lands on **PayMate Landing Page**
- Clear CTA: **Fast • Secure • Easy Money Transfer**

#### 2️⃣ Authentication
- New User → **Sign Up**
- Existing User → **Login**
- Secure verification & session creation

#### 3️⃣ Dashboard
- Balance overview
- Recent transactions
- Quick actions (Send / Request Money)

#### 4️⃣ Transaction Flow
- Choose action:
  - Send Money
  - Request Money
  - Add Beneficiary
- Enter amount
- Select payment method:
  - Wallet
  - UPI
  - Bank Transfer

#### 5️⃣ Secure Processing
- Validation
- Encryption
- Transaction execution
- Status response (Success / Failed)

#### 6️⃣ Post-Transaction
- Transaction history
- Filters & search
- Transaction logs & receipts

#### 7️⃣ Exit
- Secure logout
- Session termination

---

### 🎞️ Animated Flow Preview

<p align="center">
  <img src="assets/paymate-flow.gif" alt="PayMate User Flow Animation" width="85%" />
</p>

<p align="center">
  <em>Visual walkthrough of the complete PayMate user journey</em>
</p>

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&height=3"/>

<!-- =================== END USER FLOW SECTION =================== -->


<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&height=2"/>

## 🔐 Core Features

### 🧿 Authentication
- User Signup & Login
- Password encryption using bcrypt
- JWT-based authentication
- Protected routes using middleware

### 💼 Wallet Management
- Individual wallet for each user
- Secure wallet balance retrieval
- Auth-protected wallet APIs

### 💸 Transactions
- Wallet-based transactions
- Transaction history storage
- Backend validation for secure transfers

---

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&height=2"/>

## 🛠️ Tech Stack

### 🎨 Frontend
- React.js (Vite)
- React Router DOM
- Axios
- HTML5
- CSS3
- JavaScript (ES6+)

### ⚙️ Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- dotenv
- nodemon

---

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&height=2"/>
## 📂 Project Structure

## 📂 Project Structure

```bash
PayMate/
├── client/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── styles/
│       └── App.jsx
│
├── server/
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── payment.routes.js
│   │   └── user.routes.js
│   ├── models/
│   │   ├── User.model.js
│   │   └── Transaction.model.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   └── server.js
│
├── assets/
│   ├── logo.png
│   ├── login.png
│   ├── dashboard.png
│   ├── transactions.png
│   └── paymate-flow.gif
│
├── .env
├── package.json
└── README.md
```



<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&height=2"/>
⚙️ Environment Variables
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&height=2"/>
▶️ Run Locally
Backend
cd server
npm install
npm run dev

Frontend
cd client
npm install
npm run dev

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&height=2"/>
📘 API Documentation

🔐 Authentication
POST /api/auth/register
POST /api/auth/login

💼 Wallet
GET /api/wallet
POST /api/wallet

💸 Transactions

POST /api/transactions
GET /api/transactions

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&height=2"/>
🔒 Security Practices

Encrypted password storage
JWT-based authorization
Middleware-protected APIs
Environment variable protection

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&height=2"/>
🚀 Future Enhancements

Analytics dashboard
Payment gateway integration
OTP / Email verification
Mobile-first UI
Role-based access control

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&height=2"/>
👩‍💻 Author
<p align="center"> <img src="https://readme-typing-svg.herokuapp.com?font=Inter&size=22&duration=3000&pause=500&color=EC4899&center=true&vCenter=true&width=520&lines=Disha+Rao;UI%2FUX+Designer+%26+Frontend+Developer" /> </p> <p align="center"> Building secure, elegant, and user-centric digital products </p>
