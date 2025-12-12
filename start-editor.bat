@echo off
title CrimeDash - Servidor + API + Editor
color 0B

echo ========================================
echo  CrimeDash - Sistema Completo
echo ========================================
echo.

REM Iniciar servidor Vite em segundo plano
echo [1/3] Iniciando servidor Vite...
start "CrimeDash Vite" /MIN cmd /c start-server-auto.bat

REM Iniciar API em segundo plano
echo [2/3] Iniciando servidor API...
start "CrimeDash API" /MIN cmd /c "set PATH=%PATH%;C:\Program Files\nodejs;%USERPROFILE%\AppData\Roaming\npm && cd /d %~dp0 && npm run dev:api"

REM Aguardar servidores inicializarem
echo [3/3] Aguardando inicialização...
timeout /t 8 /nobreak >nul

REM Abrir navegador no editor
echo.
echo [OK] Abrindo editor no navegador...
start http://localhost:5173/admin/links-editor

echo.
echo ========================================
echo  PRONTO!
echo ========================================
echo.
echo  Vite:   http://localhost:5173
echo  API:    http://localhost:3001
echo  Editor: http://localhost:5173/admin/links-editor
echo.
echo  Servidores rodando em segundo plano:
echo  - CrimeDash Vite
echo  - CrimeDash API
echo.
echo  Feche as janelas para parar
echo ========================================
echo.

pause
exit /b 0
