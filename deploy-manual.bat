@echo off
echo ========================================
echo Gram Panchayat Website - Manual Deploy
echo ========================================
echo.

echo Step 1: Building project...
call npm run build
echo.

echo ========================================
echo Build Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Go to: https://vercel.com/new
echo 2. Drag and drop the 'dist' folder
echo 3. Click Deploy
echo.
echo The 'dist' folder is located at:
echo %CD%\dist
echo.
echo Press any key to open the dist folder...
pause > nul
explorer dist
echo.
echo Press any key to open Vercel in browser...
pause > nul
start https://vercel.com/new
echo.
echo Done! Follow the instructions above.
pause
