# 🎬 Movie App Backend

<div align="center">
  <img src="./movieapp-logo.png" alt="Movie App Logo" width="150" height="150" />
  
  <h3>🎭 Professional Movie Management API</h3>
  <p>A modern, scalable backend solution for movie enthusiasts and content creators</p>
  
  <p>
    <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg" />
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-green.svg" />
    <img alt="Node.js" src="https://img.shields.io/badge/node.js-18+-brightgreen.svg" />
    <img alt="NestJS" src="https://img.shields.io/badge/nestjs-10+-red.svg" />
    <img alt="PostgreSQL" src="https://img.shields.io/badge/postgresql-15+-blue.svg" />
  </p>
</div>

---

## ✨ About The Project

**Movie App Backend** is a cutting-edge RESTful API built with modern technologies to power comprehensive movie management applications. Whether you're building a movie review platform, content management system, or entertainment app, this backend provides all the essential features you need.

### 🚀 Why Choose This API?

- **🏗️ Modern Architecture**: Built with NestJS for scalability and maintainability
- **🔒 Enterprise Security**: JWT authentication with role-based access control
- **📊 Type-Safe Database**: Prisma ORM with PostgreSQL for reliable data operations
- **📖 Auto Documentation**: Swagger/OpenAPI integration for seamless API exploration
- **⚡ High Performance**: Optimized queries and efficient caching strategies

## 🎯 Key Features

| Feature                  | Description                                          |
| ------------------------ | ---------------------------------------------------- |
| 🎬 **Movie Management**  | Complete CRUD operations with rich metadata          |
| 👥 **User System**       | Registration, authentication, and profile management |
| ⭐ **Reviews & Ratings** | User-generated content with advanced rating system   |
| 🔍 **Smart Search**      | Powerful search with filters and sorting options     |
| ❤️ **Favorites**         | Personal movie collections and watchlists            |
| 🛡️ **Admin Panel**       | Administrative controls for content moderation       |
| 📱 **File Upload**       | Image and media handling with cloud storage          |
| 📊 **Analytics**         | Comprehensive statistics and reporting               |

## 🛠️ Tech Stack

<div align="center">

| Technology                                                                                                        | Purpose             | Version |
| ----------------------------------------------------------------------------------------------------------------- | ------------------- | ------- |
| ![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)             | Backend Framework   | 10+     |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)        | Runtime Environment | 18+     |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) | Database            | 15+     |
| ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)             | ORM                 | Latest  |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)            | Authentication      | -       |
| ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)          | Documentation       | -       |

</div>

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)
- PostgreSQL (v15+)
- pnpm (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/movie-app-backend.git
cd movie-app-backend

# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configurations

# Setup database
pnpm prisma generate
pnpm prisma migrate dev

# Start development server
pnpm start:dev
```

🎉 **Your API is now running on** `http://localhost:3000`

📖 **Swagger Documentation:** `http://localhost:3000/api`

## 📝 Environment Setup

Create a `.env` file with these essential variables:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/movieapp"

# Authentication
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=7d
```

## 📚 API Overview

### 🔗 Base URL

```
http://localhost:3000/api/v1
```

### 🎯 Main Endpoints

| Module         | Endpoint     | Description                      |
| -------------- | ------------ | -------------------------------- |
| 🔐 **Auth**    | `/auth/*`    | Authentication & user management |
| 🎬 **Movies**  | `/movies/*`  | Movie CRUD operations            |
| ⭐ **Reviews** | `/reviews/*` | User reviews and ratings         |
| 👤 **Users**   | `/users/*`   | User profiles and preferences    |
| 🛡️ **Admin**   | `/admin/*`   | Administrative functions         |

### 🔑 Authentication

All protected endpoints require a Bearer token:

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     http://localhost:3000/api/v1/movies
```

### Production Commands

```bash
# Build for production
pnpm build

# Start production server
pnpm start:prod
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. 🍴 Fork the repository
2. 🌿 Create your feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 Commit your changes (`git commit -m 'Add amazing feature'`)
4. 📤 Push to the branch (`git push origin feature/amazing-feature`)
5. 🔄 Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

## 🌟 Connect With Us

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/muhiddinovismoil)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/ismoil-mukhiddinov-748564340)
[![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/mukhiddinov_ismoil)

---

<p>
  <b>⭐ Star this repository if you found it helpful!</b><br>
  Made with ❤️ for the developer community
</p>

<img src="https://komarev.com/ghpvc/?username=muhiddinovismoil&label=Profile%20views&color=0e75b6&style=flat" alt="profile views" />

</div>
