@echo off
:: Stop All Servers Script for Sneaker Shop
:: This script stops all running servers

echo ================================================
echo       SNEAKER SHOP - STOP ALL SERVERS
echo ================================================
echo.

echo Stopping all servers...

echo [1/3] Stopping Spring Boot Backend (port 8080)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8080') do (
    echo Killing process on port 8080 (PID: %%a)
    taskkill /f /pid %%a >nul 2>&1
)

echo [2/3] Stopping Angular Frontend (port 4200)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :4200') do (
    echo Killing process on port 4200 (PID: %%a)
    taskkill /f /pid %%a >nul 2>&1
)

echo [3/3] Stopping any remaining Java/Node processes...
:: Kill Java processes (Spring Boot)
for /f "tokens=2" %%a in ('tasklist ^| findstr java.exe') do (
    taskkill /f /pid %%a >nul 2>&1
)

:: Kill Node processes (Angular)
for /f "tokens=2" %%a in ('tasklist ^| findstr node.exe') do (
    taskkill /f /pid %%a >nul 2>&1
)

echo.
echo ================================================
echo            ALL SERVERS STOPPED
echo ================================================
echo.
echo Note: MongoDB Docker container is still running.
echo To stop MongoDB: docker stop sneaker-shop-mongo
echo.
echo Press any key to exit...
pause >nul
