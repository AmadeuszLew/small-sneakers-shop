@echo off
setlocal enabledelayedexpansion

:: Sneaker Shop Server Management Script
:: This script manages both Spring Boot backend and Angular frontend servers

echo ================================================
echo    SNEAKER SHOP SERVER MANAGEMENT SCRIPT
echo ================================================
echo.

:MENU
echo Choose an option:
echo 1. Start all servers (Backend + Frontend)
echo 2. Stop all servers
echo 3. Restart all servers
echo 4. Check server status
echo 5. Start backend only
echo 6. Start frontend only
echo 7. Stop backend only
echo 8. Stop frontend only
echo 9. Exit
echo.
set /p choice="Enter your choice (1-9): "

if "%choice%"=="1" goto START_ALL
if "%choice%"=="2" goto STOP_ALL
if "%choice%"=="3" goto RESTART_ALL
if "%choice%"=="4" goto CHECK_STATUS
if "%choice%"=="5" goto START_BACKEND
if "%choice%"=="6" goto START_FRONTEND
if "%choice%"=="7" goto STOP_BACKEND
if "%choice%"=="8" goto STOP_FRONTEND
if "%choice%"=="9" goto EXIT
echo Invalid choice. Please try again.
goto MENU

:START_ALL
echo.
echo ================================================
echo           STARTING ALL SERVERS
echo ================================================
call :CHECK_AND_KILL_PORTS
call :START_MONGODB
call :START_BACKEND_SERVER
call :START_FRONTEND_SERVER
call :SHOW_URLS
goto MENU

:STOP_ALL
echo.
echo ================================================
echo           STOPPING ALL SERVERS
echo ================================================
call :STOP_BACKEND_SERVER
call :STOP_FRONTEND_SERVER
echo All servers stopped.
goto MENU

:RESTART_ALL
echo.
echo ================================================
echo          RESTARTING ALL SERVERS
echo ================================================
call :STOP_BACKEND_SERVER
call :STOP_FRONTEND_SERVER
timeout /t 3 >nul
call :CHECK_AND_KILL_PORTS
call :START_MONGODB
call :START_BACKEND_SERVER
call :START_FRONTEND_SERVER
call :SHOW_URLS
goto MENU

:CHECK_STATUS
echo.
echo ================================================
echo           CHECKING SERVER STATUS
echo ================================================
call :CHECK_PORT_STATUS
goto MENU

:START_BACKEND
echo.
echo ================================================
echo          STARTING BACKEND ONLY
echo ================================================
call :KILL_PORT 8080
call :START_MONGODB
call :START_BACKEND_SERVER
goto MENU

:START_FRONTEND
echo.
echo ================================================
echo         STARTING FRONTEND ONLY
echo ================================================
call :KILL_PORT 4200
call :START_FRONTEND_SERVER
goto MENU

:STOP_BACKEND
echo.
echo ================================================
echo          STOPPING BACKEND ONLY
echo ================================================
call :STOP_BACKEND_SERVER
goto MENU

:STOP_FRONTEND
echo.
echo ================================================
echo         STOPPING FRONTEND ONLY
echo ================================================
call :STOP_FRONTEND_SERVER
goto MENU

:: ================================================
::                  FUNCTIONS
:: ================================================

:CHECK_AND_KILL_PORTS
echo Checking and freeing required ports...
call :KILL_PORT 8080
call :KILL_PORT 4200
echo Ports cleaned.
echo.
goto :eof

:KILL_PORT
set port=%1
echo Checking port %port%...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :%port%') do (
    set pid=%%a
    if defined pid (
        echo Killing process on port %port% (PID: !pid!)
        taskkill /f /pid !pid! >nul 2>&1
    )
)
goto :eof

:CHECK_PORT_STATUS
echo Checking port status...
echo.
echo Port 8080 (Backend):
netstat -an | findstr :8080
if errorlevel 1 (
    echo   Status: NOT RUNNING
) else (
    echo   Status: RUNNING
)
echo.
echo Port 4200 (Frontend):
netstat -an | findstr :4200
if errorlevel 1 (
    echo   Status: NOT RUNNING
) else (
    echo   Status: RUNNING
)
echo.
echo Port 27017 (MongoDB):
netstat -an | findstr :27017
if errorlevel 1 (
    echo   Status: NOT RUNNING
) else (
    echo   Status: RUNNING
)
echo.
echo Java processes:
tasklist | findstr java.exe
echo.
echo Node processes:
tasklist | findstr node.exe
echo.
goto :eof

:START_MONGODB
echo Starting MongoDB Docker container...
docker ps | findstr sneaker-shop-mongo >nul
if errorlevel 1 (
    echo MongoDB container not found. Starting new container...
    docker run -d -p 27017:27017 --name sneaker-shop-mongo -e MONGO_INITDB_ROOT_USERNAME=rootuser -e MONGO_INITDB_ROOT_PASSWORD=rootpass mongo:latest >nul 2>&1
    if errorlevel 1 (
        echo Warning: Failed to start MongoDB container. Please ensure Docker is running.
    ) else (
        echo MongoDB container started successfully.
    )
) else (
    echo MongoDB container already running.
)
echo.
goto :eof

:START_BACKEND_SERVER
echo Starting Spring Boot backend server...
cd /d "%~dp0backend"
start "Spring Boot Backend" cmd /k "echo Starting Spring Boot Backend... & mvnw.cmd spring-boot:run"
echo Backend server is starting in a new window...
echo Waiting for backend to start (this may take 30-60 seconds)...
timeout /t 5 >nul
echo.
goto :eof

:START_FRONTEND_SERVER
echo Starting Angular frontend server...
cd /d "%~dp0frontend"
start "Angular Frontend" cmd /k "echo Starting Angular Frontend... & npm start"
echo Frontend server is starting in a new window...
echo Waiting for frontend to start (this may take 15-30 seconds)...
timeout /t 3 >nul
echo.
goto :eof

:STOP_BACKEND_SERVER
echo Stopping Spring Boot backend server...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8080') do (
    set pid=%%a
    if defined pid (
        echo Killing backend process (PID: !pid!)
        taskkill /f /pid !pid! >nul 2>&1
    )
)
:: Also kill any java processes that might be Spring Boot
for /f "tokens=2" %%a in ('tasklist ^| findstr java.exe') do (
    set pid=%%a
    echo Checking Java process !pid!...
    taskkill /f /pid !pid! >nul 2>&1
)
echo Backend server stopped.
echo.
goto :eof

:STOP_FRONTEND_SERVER
echo Stopping Angular frontend server...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :4200') do (
    set pid=%%a
    if defined pid (
        echo Killing frontend process (PID: !pid!)
        taskkill /f /pid !pid! >nul 2>&1
    )
)
:: Also kill any node processes that might be Angular
for /f "tokens=2" %%a in ('tasklist ^| findstr node.exe') do (
    set pid=%%a
    echo Checking Node process !pid!...
    taskkill /f /pid !pid! >nul 2>&1
)
echo Frontend server stopped.
echo.
goto :eof

:SHOW_URLS
echo ================================================
echo              SERVERS STARTED
echo ================================================
echo.
echo Frontend URL: http://localhost:4200
echo Backend API:  http://localhost:8080
echo MongoDB:      mongodb://rootuser:rootpass@localhost:27017
echo.
echo Wait a moment for all services to fully start, then test the URLs above.
echo Backend typically takes 30-60 seconds to start completely.
echo Frontend typically takes 15-30 seconds to start completely.
echo.
goto :eof

:EXIT
echo.
echo Do you want to stop all servers before exiting? (y/n)
set /p stop_choice="Enter choice: "
if /i "%stop_choice%"=="y" (
    call :STOP_ALL
)
echo.
echo Thank you for using Sneaker Shop Server Management!
echo Goodbye!
pause
exit

endlocal
