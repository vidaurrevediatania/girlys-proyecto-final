# ============================================================
#  INICIAR TODO  (sitio web + WordPress + HTTPS)
#  Doble clic sobre este archivo, o clic derecho > Ejecutar con PowerShell
# ============================================================

$ErrorActionPreference = 'Stop'
$AQUI = Split-Path -Parent $MyInvocation.MyCommand.Path
$RAIZ = Split-Path -Parent $AQUI

$phpExe = Join-Path $AQUI 'php\php.exe'
$wpDir  = Join-Path $RAIZ '02-WordPress'
$logs   = Join-Path $AQUI 'logs'
$dist   = Join-Path $RAIZ '01-Sitio-Web\dist\index.html'
$cert   = Join-Path $AQUI 'certs\localhost.crt'

function Aviso($texto) { Write-Host "  $texto" -ForegroundColor Yellow }
function Bien($texto)  { Write-Host "  $texto" -ForegroundColor Green }

Write-Host ''
Write-Host '  ======================================================' -ForegroundColor Magenta
Write-Host '   GIRLYS - Proyecto Final 2.0' -ForegroundColor Magenta
Write-Host '  ======================================================' -ForegroundColor Magenta
Write-Host ''

if (-not (Test-Path $phpExe)) {
    Aviso 'No se encontro PHP en 03-Servidor-Local\php.'
    Aviso 'Ejecuta primero: instalar.ps1'
    Read-Host 'Pulsa Enter para cerrar'
    exit 1
}

if (-not (Test-Path $dist)) {
    Aviso 'El sitio web todavia no esta construido.'
    Write-Host '  Abriendo la carpeta 01-Sitio-Web...'
    Start-Process powershell -ArgumentList "-NoExit","-Command","Set-Location '$RAIZ\01-Sitio-Web'; npm install; npm run build"
    Read-Host 'Cuando termine la construccion, pulsa Enter para continuar'
}

if (-not (Test-Path $cert)) {
    Aviso 'Falta el certificado SSL local. Generandolo...'
    & (Join-Path $AQUI 'generar-certificado.ps1')
}

New-Item -ItemType Directory -Force -Path $logs | Out-Null

# Si ya hay algo escuchando en los puertos, lo cerramos para evitar duplicados.
foreach ($puerto in 8090, 8443, 8080) {
    $conexiones = Get-NetTCPConnection -LocalPort $puerto -State Listen -ErrorAction SilentlyContinue
    foreach ($c in $conexiones) {
        $proceso = Get-Process -Id $c.OwningProcess -ErrorAction SilentlyContinue
        if ($proceso -and $proceso.ProcessName -match 'php|node') {
            Stop-Process -Id $proceso.Id -Force -ErrorAction SilentlyContinue
        }
    }
}

Bien 'Encendiendo WordPress (PHP)...'
$php = Start-Process -FilePath $phpExe `
    -ArgumentList "-S 127.0.0.1:8090 -t `"$wpDir`" `"$(Join-Path $wpDir 'router.php')`"" `
    -WorkingDirectory $wpDir -PassThru -WindowStyle Hidden `
    -RedirectStandardOutput (Join-Path $logs 'php.log') `
    -RedirectStandardError  (Join-Path $logs 'php-error.log')

Start-Sleep -Seconds 2

Bien 'Encendiendo el sitio web con HTTPS...'
Write-Host ''
try {
    Push-Location $AQUI
    & node servidor.js
}
finally {
    Pop-Location
    if ($php -and -not $php.HasExited) { Stop-Process -Id $php.Id -Force -ErrorAction SilentlyContinue }
    Write-Host ''
    Write-Host '  Servidor detenido.' -ForegroundColor Yellow
    Read-Host '  Pulsa Enter para cerrar'
}
