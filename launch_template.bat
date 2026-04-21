:: © 2025 Insight Geospatial, Eurotech Marine Data Services Ltd. All rights reserved.
:: Author: Barry Ward
:: License: Proprietary – Not for redistribution without written consent.
:: Description: Universal launcher template. Activates the local venv and runs the target script.

@echo off
setlocal

:: --- CONFIGURATION -------------------------------------------------------
:: CHANGE THIS filename to match the main python script of your project.
set TARGET_SCRIPT=main.py
:: -------------------------------------------------------------------------

echo -----------------------------------------------------------------------
echo  INSIGHT GEOSPATIAL - PROJECT LAUNCHER
echo -----------------------------------------------------------------------

:: 1. Check if the portable environment exists
if not exist ".venv" (
    echo.
    echo  [CRITICAL] Virtual Environment not found!
    echo  It looks like this project hasn't been set up on this computer yet.
    echo.
    echo  [ACTION] Please double-click 'RESET_ENV.bat' to initialize it.
    echo.
    pause
    exit /b
)

:: 2. Activate the environment
call .venv\Scripts\activate.bat

:: 3. Check if the target script exists
if not exist "%TARGET_SCRIPT%" (
    echo.
    echo  [ERROR] Could not find the script: %TARGET_SCRIPT%
    echo  Please edit this .bat file and set TARGET_SCRIPT to the correct filename.
    echo.
    pause
    exit /b
)

:: 4. Run the script
echo  Launching %TARGET_SCRIPT%...
echo -----------------------------------------------------------------------
echo.
python "%TARGET_SCRIPT%"

echo.
echo -----------------------------------------------------------------------
echo  Process Finished.
pause