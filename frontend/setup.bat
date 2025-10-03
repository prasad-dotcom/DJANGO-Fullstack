@echo off
echo 🚀 Setting up FreelanceHub Frontend...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js v14 or higher.
    echo Visit: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detected

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully

REM Create .env file if it doesn't exist
if not exist .env (
    echo 📝 Creating .env file...
    echo REACT_APP_API_URL=http://localhost:8000 > .env
    echo ✅ .env file created
)

echo.
echo 🎉 Setup complete!
echo.
echo To start the development server:
echo   npm start
echo.
echo The app will be available at: http://localhost:3000
echo.
echo Make sure your Django backend is running on: http://localhost:8000
echo.
pause










