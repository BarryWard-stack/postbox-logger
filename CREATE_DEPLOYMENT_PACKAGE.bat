@echo off
REM © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
REM Create a deployment package for manual upload

echo.
echo ========================================
echo  Creating Deployment Package
echo ========================================
echo.

REM Create deployment folder
echo Creating deployment folder...
if exist "deployment_package" rmdir /s /q deployment_package
mkdir deployment_package

REM Copy core files
echo Copying core files...
copy index.html deployment_package\
copy plogger.js deployment_package\
copy postboxAssets.js deployment_package\
copy postcard-engine.js deployment_package\
copy manifest.json deployment_package\
copy service-worker.js deployment_package\

REM Copy assets folder
echo Copying assets...
xcopy /E /I /Y assets deployment_package\assets

REM Create instructions file
echo Creating instructions...
(
echo Deployment Package for Heritage Postbox Logger v0.9.1
echo.
echo Files to upload to Firebase Hosting:
echo - All files in this folder
echo - Maintain the folder structure
echo.
echo Upload via Firebase Console:
echo 1. Go to: https://console.firebase.google.com/
echo 2. Select your project
echo 3. Click "Hosting" in sidebar
echo 4. Click "Add another site" or use existing
echo 5. Upload all files from this folder
echo.
echo Or use Firebase CLI:
echo firebase deploy --only hosting
) > deployment_package\README.txt

echo.
echo ========================================
echo  Package Created!
echo ========================================
echo.
echo Location: deployment_package\
echo.
echo You can now:
echo 1. Zip this folder and upload to Firebase
echo 2. Or use GitHub Pages
echo 3. Or any static hosting service
echo.
echo Terminal will close in 5 seconds...
timeout /t 5 >nul
