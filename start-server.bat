@echo off
echo ========================================
echo  CrimeDash - Servidor de Desenvolvimento
echo ========================================
echo.

REM Atualizar PATH
set PATH=%PATH%;C:\Program Files\nodejs;%USERPROFILE%\AppData\Roaming\npm

REM Verificar se Node.js está instalado
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERRO] Node.js nao encontrado!
    echo Por favor, instale o Node.js de: https://nodejs.org/
    pause
    exit /b 1
)

REM Verificar se npm está instalado
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERRO] npm nao encontrado!
    pause
    exit /b 1
)

echo [OK] Node.js encontrado: 
node --version
echo [OK] npm encontrado:
npm --version
echo.

REM Verificar se node_modules existe
if not exist "node_modules\" (
    echo [AVISO] node_modules nao encontrado. Instalando dependencias...
    echo.
    npm install
    if %errorlevel% neq 0 (
        echo.
        echo [ERRO] Falha ao instalar dependencias!
        pause
        exit /b 1
    )
    echo.
    echo [OK] Dependencias instaladas com sucesso!
    echo.
)

echo ========================================
echo  Iniciando servidor...
echo ========================================
echo.
echo Servidor rodando em: http://localhost:5173
echo.
echo Pressione Ctrl+C para parar o servidor
echo ========================================
echo.

REM Iniciar servidor
npm run dev

REM Se o servidor parar, perguntar se quer reiniciar
echo.
echo.
echo [AVISO] Servidor parou!
echo.
choice /C SN /M "Deseja reiniciar o servidor? (S/N)"
if %errorlevel% equ 1 (
    echo.
    echo Reiniciando...
    echo.
    goto :start
)

echo.
echo Servidor encerrado.
pause
exit /b 0

:start
cls
goto :eof
