@echo off
echo ==========================================
echo      Share Website Externally
echo ==========================================
echo.
echo This script will generate a public URL for your local site.
echo Keep this window OPEN while you want the link to work.
echo.
echo NOTE: If the link asks for a password, it is often asking for your
echo external IP address, which is: 
curl -s https://loca.lt/mytunnelpassword
echo.
echo.
echo Starting Tunnel...
echo ------------------------------------------
call npx localtunnel --port 3000
pause
