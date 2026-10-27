# ============================================================
#  INSTALACION COMPLETA DESDE CERO
#  Instala las dependencias del sitio, construye el blog estático
#  y genera el certificado SSL local.
#
#  Solo hace falta: Windows + Node.js 18 o superior + internet.
#  Uso: clic derecho > Ejecutar con PowerShell
# ============================================================

$ErrorActionPreference = 'Stop'
$AQUI = Split-Path -Parent $MyInvocation.MyCommand.Path
$RAIZ = Split-Path -Parent $AQUI
$SITIO = Join-Path $RAIZ '01-Sitio-Web'

function Bien($texto) { Write-Host "  [ok] $texto" -ForegroundColor Green }
function Info($texto) { Write-Host "  $texto" }

Write-Host ''
Write-Host '  ======================================================' -ForegroundColor Magenta
Write-Host '   GIRLYS - instalacion local completa' -ForegroundColor Magenta
Write-Host '  ======================================================' -ForegroundColor Magenta
Write-Host ''

# 1. Node.js
$node = Get-Command node -ErrorAction SilentlyContinue
if (-not $node) {
    Write-Host '  [ERROR] No se encontro Node.js.' -ForegroundColor Red
    Write-Host '          Descargalo gratis en https://nodejs.org (version LTS).'
    Write-Host '          Instalalo con las opciones por defecto y vuelve a ejecutar este archivo.'
    Write-Host ''
    Read-Host 'Pulsa Enter para cerrar'
    exit 1
}

$version = (& node --version).Trim()
Bien "Node.js $version detectado"

# 2. Dependencias y construccion
Info 'Instalando dependencias del sitio...'
Push-Location $SITIO
try {
    npm install --no-audit --no-fund
    Info 'Construyendo el sitio y el blog...'
    npm run build
} finally {
    Pop-Location
}
Bien 'Sitio construido en 01-Sitio-Web\dist'

# 3. Certificado SSL local
if (-not (Test-Path (Join-Path $AQUI 'certs\localhost.crt')) -or -not (Test-Path (Join-Path $AQUI 'certs\localhost.key'))) {
    Info 'Generando certificado SSL autofirmado...'
    & (Join-Path $AQUI 'generar-certificado.ps1') -SinPausa
} else {
    Bien 'Certificado SSL ya existia'
}

Write-Host ''
Write-Host '  Todo listo. Ejecuta iniciar.ps1 para abrir el sitio.' -ForegroundColor Green
Write-Host ''
Read-Host 'Pulsa Enter para cerrar'
