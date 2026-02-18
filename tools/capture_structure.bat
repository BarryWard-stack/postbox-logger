@echo off
REM Directory Structure Capture - Quick Launcher
REM (c) 2025 Insight Geospatial, Eurotech Marine Data Services Ltd.

echo ========================================
echo Directory Structure Capture Utility
echo ========================================
echo.

REM Get the directory where this batch file is located
set SCRIPT_DIR=%~dp0

REM Default to current directory if no argument provided
set TARGET_DIR=%~1
if "%TARGET_DIR%"=="" set TARGET_DIR=%cd%

REM Default output filename with timestamp
for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c-%%a-%%b)
for /f "tokens=1-2 delims=/: " %%a in ('time /t') do (set mytime=%%a%%b)
set OUTPUT_FILE=structure_%mydate%_%mytime%.txt

echo Target Directory: %TARGET_DIR%
echo Output File: %OUTPUT_FILE%
echo.
echo Scanning directory structure...
echo.

REM Call Python script from batch file's directory
python "%SCRIPT_DIR%capture_structure.py" "%TARGET_DIR%" "%OUTPUT_FILE%"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Structure captured successfully!
    echo Opening output file...
    notepad "%OUTPUT_FILE%"
) else (
    echo.
    echo Error capturing structure. Check Python installation and path.
    pause
)