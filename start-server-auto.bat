@echo off
title CrimeDash - Servidor
color 0A

:inicio
cls
echo ========================================
echo  CrimeDash - Servidor de Desenvolvimento
echo ========================================
echo.

REM Atualizar PATH
set PATH=%PATH%;C:\Program Files\nodejs;%USERPROFILE%\AppData\Roaming\npm

REM Verificar Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo [ERRO] Node.js nao encontrado!
    echo Instale de: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js: 
node --version
echo.

REM Verificar dependências
if not exist "node_modules\" (
    echo [INSTALANDO] Dependencias...
    npm install
    if %errorlevel% neq 0 (
        color 0C
        echo [ERRO] Falha ao instalar!
        pause
        exit /b 1
    )
    echo [OK] Instalado!
    echo.
)

echo ========================================
echo  SERVIDOR ATIVO
echo ========================================
echo.
echo  URL: http://localhost:5173
echo.
echo  Ctrl+C para parar
echo  Reinicia automaticamente em caso de erro
echo ========================================
echo.

REM Rodar servidor com reinício automático
:loop
npm run dev

REM Se falhar, aguardar e reiniciar
if %errorlevel% neq 0 (
    color 0E
    echo.
    echo [AVISO] Servidor parou com erro!
    echo Reiniciando em 3 segundos...
    timeout /t 3 /nobreak >nul
    color 0A
    goto loop
)

REM Se parar normalmente, perguntar
echo.
choice /C SN /M "Reiniciar servidor? (S/N)" /T 10 /D S
if %errorlevel% equ 1 goto loop

echo.
echo Servidor encerrado.
pause
exit /b 0
