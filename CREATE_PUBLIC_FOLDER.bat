@echo off
REM © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.
REM Create clean public folder for Firebase deployment

echo.
echo ========================================
echo  Creating Public Folder
echo ========================================
echo.

REM Remove old public folder if exists
if exist "public" rmdir /S /Q "public"

REM Create new public folder
mkdir public

echo Copying core files...
copy index.html public\
copy plogger.js public\
copy postboxAssets.js public\
copy postcard-engine.js public\
copy manifest.json public\
copy service-worker.js public\
copy 404.html public\

echo Copying assets folder...
xcopy /E /I /Y assets public\assets

echo.
echo ========================================
echo  Public Folder Created!
echo ========================================
echo.
echo Contents: 7 files + assets folder
echo.
echo Now update firebase.json to use "public" folder:
echo Change: "public": "." 
echo To: "public": "public"
echo.
pause
