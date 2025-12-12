@echo off
title CrimeDash - Servidor + Editor
color 0B

echo ========================================
echo  CrimeDash - Iniciando Servidor + Editor
echo ========================================
echo.

REM Iniciar servidor em segundo plano
echo [1/2] Iniciando servidor...
start "CrimeDash Server" /MIN cmd /c start-server-auto.bat

REM Aguardar servidor inicializar (ajuste se necessário)
echo [2/2] Aguardando servidor inicializar...
timeout /t 5 /nobreak >nul

REM Abrir navegador no editor
echo.
echo [OK] Abrindo editor no navegador...
start http://localhost:5173/admin/links-editor

echo.
echo ========================================
echo  PRONTO!
echo ========================================
echo.
echo  Servidor: http://localhost:5173
echo  Editor:   http://localhost:5173/admin/links-editor
echo.
echo  O servidor esta rodando em segundo plano
echo  Feche a janela "CrimeDash Server" para parar
echo ========================================
echo.

pause
exit /b 0
