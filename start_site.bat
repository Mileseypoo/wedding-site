@echo off
echo ==========================================
echo      Sam & Bec Wedding Site Launcher
echo ==========================================

echo.
echo [1/3] Cleaning up existing Node.js processes...
:: Kill any running node processes to free up ports
taskkill /F /IM node.exe >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo       - Killed existing Node processes.
) else (
    echo       - No existing Node processes found.
)

echo.
echo [2/3] Checking dependencies...
if not exist "node_modules\" (
    echo       - node_modules not found. Installing dependencies...
    call npm install
) else (
    echo       - Dependencies appear to be installed.
)

echo.
echo [2.5/3] Generating Prisma Client...
call npx prisma generate

echo.
echo [3/3] Starting Development Server...
echo       - Local URL: http://localhost:3000
echo       - LAN URL:   http://192.168.2.7:3000  (Send this to friends)
echo.

:: Start the Next.js dev server explicitly on all network interfaces
call npm run dev -- -H 0.0.0.0

pause
