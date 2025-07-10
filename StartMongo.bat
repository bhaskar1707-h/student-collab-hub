@echo off
:: Batch script to start MongoDB as admin

:: Check admin rights
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Please run this file as Administrator.
    pause
    exit
)

:: Start MongoDB
echo Starting MongoDB service...
net start MongoDB

pause
