@echo off
:: Quick Start Script for Sneaker Shop
:: This script quickly starts all servers needed for development

echo ================================================
echo       SNEAKER SHOP - QUICK START
echo ================================================
echo.

echo [1/4] Checking and freeing ports...
:: Kill any processes on required ports
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8080') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :4200') do taskkill /f /pid %%a >nul 2>&1

echo [2/4] Starting MongoDB...
docker ps | findstr sneaker-shop-mongo >nul
if errorlevel 1 (
    docker run -d -p 27017:27017 --name sneaker-shop-mongo -e MONGO_INITDB_ROOT_USERNAME=rootuser -e MONGO_INITDB_ROOT_PASSWORD=rootpass mongo:latest >nul 2>&1
)

echo [3/4] Starting Spring Boot Backend...
cd /d "%~dp0backend"
start "Spring Boot Backend" cmd /k "mvnw.cmd spring-boot:run"

echo [4/4] Starting Angular Frontend...
cd /d "%~dp0frontend"
start "Angular Frontend" cmd /k "npm start"

echo.
echo ================================================
echo              ALL SERVERS STARTING
echo ================================================
echo.
echo Frontend: http://localhost:4200
echo Backend:  http://localhost:8080
echo.
echo Please wait 30-60 seconds for all services to start completely.
echo The servers are running in separate command windows.
echo.
echo Press any key to return to main directory...
pause >nul
cd /d "%~dp0"
