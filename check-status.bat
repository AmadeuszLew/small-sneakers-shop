@echo off
:: Server Status Check Script for Sneaker Shop
:: This script checks the status of all servers

echo ================================================
echo       SNEAKER SHOP - SERVER STATUS
echo ================================================
echo.

echo Checking server status...
echo.

echo [Backend - Port 8080]
netstat -an | findstr :8080 >nul
if errorlevel 1 (
    echo   Status: NOT RUNNING
) else (
    echo   Status: RUNNING
    echo   URL: http://localhost:8080
)

echo.
echo [Frontend - Port 4200]
netstat -an | findstr :4200 >nul
if errorlevel 1 (
    echo   Status: NOT RUNNING
) else (
    echo   Status: RUNNING
    echo   URL: http://localhost:4200
)

echo.
echo [MongoDB - Port 27017]
netstat -an | findstr :27017 >nul
if errorlevel 1 (
    echo   Status: NOT RUNNING
) else (
    echo   Status: RUNNING
)

echo.
echo [Process Information]
echo Java processes (Spring Boot):
tasklist | findstr java.exe
if errorlevel 1 echo   No Java processes found

echo.
echo Node processes (Angular):
tasklist | findstr node.exe
if errorlevel 1 echo   No Node processes found

echo.
echo [Docker Containers]
docker ps --filter name=sneaker-shop-mongo --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo.
echo ================================================
echo               STATUS CHECK COMPLETE
echo ================================================
echo.
echo Press any key to exit...
pause >nul
