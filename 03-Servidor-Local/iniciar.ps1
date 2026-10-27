# ============================================================
#  INICIAR EL SITIO  (React + blog estático + HTTPS)
#  Doble clic sobre este archivo, o clic derecho > Ejecutar con PowerShell
# ============================================================

$ErrorActionPreference = 'Stop'
$AQUI = Split-Path -Parent $MyInvocation.MyCommand.Path
$RAIZ = Split-Path -Parent $AQUI

$logs = Join-Path $AQUI 'logs'
$dist = Join-Path $RAIZ '01-Sitio-Web\dist\index.html'
$cert = Join-Path $AQUI 'certs\localhost.crt'
$llave = Join-Path $AQUI 'certs\localhost.key'

function Aviso($texto) { Write-Host "  $texto" -ForegroundColor Yellow }
function Bien($texto)  { Write-Host "  $texto" -ForegroundColor Green }

Write-Host ''
Write-Host '  ======================================================' -ForegroundColor Magenta
Write-Host '   GIRLYS - Proyecto Final 2.0' -ForegroundColor Magenta
Write-Host '  ======================================================' -ForegroundColor Magenta
Write-Host ''

if (-not (Test-Path $dist)) {
    Aviso 'El sitio web todavia no esta construido.'
    Write-Host '  Abriendo la carpeta 01-Sitio-Web...'
    Start-Process powershell -ArgumentList "-NoExit","-Command","Set-Location '$RAIZ\01-Sitio-Web'; npm install; npm run build"
    Read-Host 'Cuando termine la construccion, pulsa Enter para continuar'
}

if (-not (Test-Path $cert) -or -not (Test-Path $llave)) {
    Aviso 'Falta el certificado SSL local. Generandolo...'
    & (Join-Path $AQUI 'generar-certificado.ps1') -SinPausa
}
New-Item -ItemType Directory -Force -Path $logs | Out-Null

# Si ya hay algo escuchando en los puertos, lo cerramos para evitar duplicados.
foreach ($puerto in 8443, 8080) {
    $conexiones = Get-NetTCPConnection -LocalPort $puerto -State Listen -ErrorAction SilentlyContinue
    foreach ($c in $conexiones) {
        $proceso = Get-Process -Id $c.OwningProcess -ErrorAction SilentlyContinue
        if ($proceso -and $proceso.ProcessName -match 'node') {
            Stop-Process -Id $proceso.Id -Force -ErrorAction SilentlyContinue
        }
    }
}

Bien 'Encendiendo el sitio con HTTPS...'
Write-Host ''
try {
    Push-Location $AQUI
    & node servidor.js
}
finally {
    Pop-Location
    Write-Host ''
    Write-Host '  Servidor detenido.' -ForegroundColor Yellow
    Read-Host '  Pulsa Enter para cerrar'
}
