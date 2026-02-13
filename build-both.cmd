@echo off
:: 確保路徑正確切換到腳本所在資料夾
cd /d %~dp0

:: 1. 設定環境變數
set NODE_OPTIONS=--max-old-space-size=8192

:: 2. 執行第一個編譯
echo [Step 1] Starting Build Jota-T...
call pnpm run build-jota-t
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Build Jota-T failed, stopping process.
    exit /b %ERRORLEVEL%
)

:: 3. 複製檔案到網路路徑
echo.
echo [Step 2] Copying files to server...
:: /NP (No Progress) 可以減少在終端機刷屏，讓畫面更乾淨
robocopy .\dist-t \\ap01\app\m2302-jota-t /E /XF /NP config.json /R:3 /W:5

:: 4. 判斷 Robocopy 結果 (0-7 均代表成功)
if %ERRORLEVEL% leq 7 (
    echo.
    echo "******************************************************************"
    echo "* JOTA-T build process is completed, TEST IT NOW!                *"
    echo "******************************************************************"
    echo.
    echo [Step 3] Copy successful, starting Build Jota...
    call pnpm run build-jota
) else (
    echo [ERROR] Robocopy failed with code %ERRORLEVEL%
    exit /b %ERRORLEVEL%
)