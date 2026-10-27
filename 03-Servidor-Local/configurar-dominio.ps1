# ============================================================
#  CONFIGURAR EL DOMINIO REAL
#  Uso (PowerShell, en esta carpeta):
#     .\configurar-dominio.ps1 -Dominio "https://tudominio.com"
#  o sin https:
#     .\configurar-dominio.ps1 -Dominio tudominio.com
#
#  Actualiza 01-Sitio-Web\.env y vuelve a construir el sitio.
#  El canonical, el sitemap y robots.txt se generan solos.
# ============================================================

param(
    [Parameter(Mandatory = $true)]
    [string]$Dominio
)

$ErrorActionPreference = 'Stop'
$AQUI = Split-Path -Parent $MyInvocation.MyCommand.Path
$RAIZ = Split-Path -Parent $AQUI
$SITIO = Join-Path $RAIZ '01-Sitio-Web'

$nuevo = $Dominio.Trim().TrimEnd('/')
if ($nuevo -notmatch '^https?://') { $nuevo = 'https://' + $nuevo }
$nuevo = $nuevo -replace '^http://', 'https://'

$envFile = Join-Path $SITIO '.env'
if (-not (Test-Path $envFile)) {
    Write-Host '  [ERROR] No existe 01-Sitio-Web\.env' -ForegroundColor Red
    Read-Host 'Pulsa Enter para cerrar'
    exit 1
}

$contenido = Get-Content $envFile -Raw -Encoding UTF8
$contenido = [regex]::Replace($contenido, '(?m)^VITE_SITE_ORIGIN=.*$', "VITE_SITE_ORIGIN=$nuevo")
[System.IO.File]::WriteAllText($envFile, $contenido, (New-Object System.Text.UTF8Encoding($false)))

Write-Host ''
Write-Host "  Dominio configurado: $nuevo" -ForegroundColor Green
Write-Host '  Reconstruyendo el sitio...' -ForegroundColor Yellow

Push-Location $SITIO
try {
    npm run build
} finally {
    Pop-Location
}

Write-Host ''
Write-Host '  Listo. El sitio, el sitemap y robots.txt ya apuntan al dominio nuevo.' -ForegroundColor Green
Write-Host '  Para verlo: 03-Servidor-Local\iniciar.ps1'
Write-Host ''
Read-Host 'Pulsa Enter para cerrar'
