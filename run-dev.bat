echo off
echo ========================================================
echo   ⚡ STARTING AURA // GEN-Z CLOTHING LAB (FULL STACK)
echo ========================================================
echo.
echo Starting Backend API on http://localhost:5000 ...
start "Aura Backend API (Port 5000)" cmd /k "cd backend && npm run dev"

timeout /t 2 /nobreak >nul

echo Starting Frontend Vite Dev Server on http://localhost:3000 ...
start "Aura Frontend (Port 3000)" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers started!
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000/api/products
echo ========================================================
pause
