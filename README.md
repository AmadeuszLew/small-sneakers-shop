# Sneaker Shop

![Alt text](src/assets/img/logo.png?raw=true "Title")

> Complete sneaker shop with authentication and order management

---

### Table of Contents
- [Description](#description)
- [Quick Start](#quick-start)
- [Server Management](#server-management)
- [Manual Installation](#manual-installation)
- [Technologies](#technologies)
- [Author Info](#author-info)

---

## Description

Complete sneaker shop portfolio application with authentication and order management system. Features include:

- User registration and login with JWT authentication
- Shopping cart and checkout process
- Order creation and tracking
- Order history management
- Daily stock reset functionality
- Backend API with Spring Boot + MongoDB
- Frontend with Angular

---

## Quick Start

**The easiest way to start the application:**

1. **Quick Start (Recommended)**:
   ```cmd
   quick-start.bat
   ```
   This will automatically start all required servers.

2. **Check Status**:
   ```cmd
   check-status.bat
   ```
   This will show you the status of all servers.

3. **Stop All Servers**:
   ```cmd
   stop-all.bat
   ```
   This will stop all running servers.

4. **Advanced Management**:
   ```cmd
   manage-servers.bat
   ```
   This provides a full menu for managing servers.

**Access the application:**
- Frontend: http://localhost:4200
- Backend API: http://localhost:8080

---

## Server Management

### Available Scripts

| Script | Description |
|--------|-------------|
| `quick-start.bat` | Starts all servers (MongoDB, Backend, Frontend) |
| `stop-all.bat` | Stops all running servers |
| `check-status.bat` | Shows status of all servers and processes |
| `manage-servers.bat` | Interactive menu for advanced server management |

### Manual Commands

**Start MongoDB:**
```cmd
docker run -d -p 27017:27017 --name sneaker-shop-mongo -e MONGO_INITDB_ROOT_USERNAME=rootuser -e MONGO_INITDB_ROOT_PASSWORD=rootpass mongo:latest
```

**Start Backend:**
```cmd
cd backend
mvnw.cmd spring-boot:run
```

**Start Frontend:**
```cmd
cd frontend
npm start
```

---

## Manual Installation

If you prefer to set up manually:

### Prerequisites
- Java 21
- Node.js and npm
- Docker (for MongoDB)

### Backend Setup
```cmd
cd backend
mvnw.cmd clean compile
mvnw.cmd spring-boot:run
```

### Frontend Setup
```cmd
cd frontend
npm install
npm start
```

### Database Setup
```cmd
docker run -d -p 27017:27017 --name sneaker-shop-mongo -e MONGO_INITDB_ROOT_USERNAME=rootuser -e MONGO_INITDB_ROOT_PASSWORD=rootpass mongo:latest
```

---

## Technologies

### Backend
- Spring Boot 3.2.5
- Spring Security (JWT Authentication)
- Spring Data MongoDB
- Java 21
- Maven
- Lombok

### Frontend
- Angular
- TypeScript
- Bootstrap
- RxJS

### Database
- MongoDB
- Docker

### Development Tools
- VS Code
- Maven Wrapper
- Angular CLI

[Back To The Top](#Sneaker-Shop)

---


## Author Info

- Website - [Amadeus Portfolio](https://amadueszlew.github.io)

[Back To The Top](#Sneaker-Shop)
