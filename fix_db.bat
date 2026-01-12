@echo off
echo ==========================================
echo      Database Fix & Update Script
echo ==========================================
echo.
echo 1. Stopping any running servers to release file locks...
taskkill /F /IM node.exe >nul 2>&1
echo.

echo 2. Regenerating Prisma Client...
call npx prisma generate
if %ERRORLEVEL% NEQ 0 (
    echo    ERROR: Could not generate client.
    pause
    exit /b
)

echo.
echo 3. Updating Database Schema...
call npx prisma db push
if %ERRORLEVEL% NEQ 0 (
    echo    ERROR: Could not push schema to database.
    pause
    exit /b
)

echo.
echo ==========================================
echo      SUCCESS! 
echo ==========================================
echo.
echo You can now restart your server using 'start_site.bat'.
echo.
pause
