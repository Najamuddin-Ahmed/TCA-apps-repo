# PowerShell Startup Script for Aura Gen-Z Clothing Store
Write-Host "========================================================" -ForegroundColor Yellow
Write-Host "  ⚡ STARTING AURA // GEN-Z CLOTHING LAB (FULL STACK)" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Yellow

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

# Start Backend
Write-Host "Starting Backend API on http://localhost:5000 ..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectRoot/backend'; npm run dev"

Start-Sleep -Seconds 2

# Start Frontend
Write-Host "Starting Frontend Vite App on http://localhost:3000 ..." -ForegroundColor Magenta
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectRoot/frontend'; npm run dev"

Write-Host "`nApp successfully launched!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "Backend:  http://localhost:5000/api/health" -ForegroundColor White
Write-Host "========================================================" -ForegroundColor Yellow
