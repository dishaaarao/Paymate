<!-- ======================= PAYMATE LOGO ======================= -->
<p align="center">
  <img src="https://svg-banners.vercel.app/api?type=origin&text1=PayMate%20💳&text2=Secure%20Digital%20Wallet&width=900&height=260" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Inter&size=26&duration=2800&pause=500&color=7C3AED&center=true&vCenter=true&width=750&lines=Secure+Wallet+Management;JWT+Authentication;Modern+MERN+Architecture;Fintech-Ready+Full+Stack+App" />
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

**PayMate** is a **full-stack digital wallet application** inspired by real-world fintech platforms like **Paytm & PhonePe**.  
It demonstrates how **secure authentication, wallet management, and transactions** work behind the scenes.

> 🚀 Built as a **scalable, fintech-ready prototype** using modern web technologies.

---

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&height=2"/>

## 📸 UI Preview

<p align="center">
  <img src="assets/login.png" width="260"/>
  <img src="assets/dashboard.png" width="260"/>
  <img src="assets/transactions.png" width="260"/>
</p>

> 📌 *Replace these images with real screenshots from your app*

---

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&height=2"/>

## 🎥 User Flow Demo

<p align="center">
  <img src="assets/paymate-flow.gif" width="520"/>
</p>

> ✨ *Login → Wallet Dashboard → Transaction Flow*

---

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&height=2"/>

## 🔐 Core Features

### 🧿 Authentication System
- Secure **Signup & Login**
- Password hashing using **bcrypt**
- Stateless authentication using **JWT**
- Protected routes via middleware

### 💼 Wallet Management
- Individual wallet per user
- Secure balance access
- Auth-protected wallet APIs

### 💸 Transactions
- Wallet-based transactions
- Transaction history storage
- Backend-validated transaction logic

---

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&height=2"/>

## 🧠 System Architecture

```mermaid
flowchart LR
User --> ReactFrontend
ReactFrontend --> ExpressAPI
ExpressAPI --> AuthService
ExpressAPI --> WalletService
ExpressAPI --> TransactionService
WalletService --> MongoDB
TransactionService --> MongoDB
