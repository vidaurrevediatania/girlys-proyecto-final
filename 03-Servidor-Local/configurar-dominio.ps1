# ============================================================
#  CONFIGURAR EL DOMINIO REAL
#  Uso (PowerShell, en esta carpeta):
#     .\configurar-dominio.ps1 -Dominio "https://girlys.com.bo"
#  o sin https:
#     .\configurar-dominio.ps1 -Dominio girlys.com.bo
#
#  Actualiza .env, sitemap.xml, robots.txt y vuelve a construir el sitio.
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

# Dominio anterior (el marcador o el que hubiera en .env).
$envFile = Join-Path $SITIO '.env'
$anterior = 'https://TU-DOMINIO.com'
if (Test-Path $envFile) {
    $linea = Select-String -Path $envFile -Pattern '^VITE_SITE_ORIGIN=(.*)$' | Select-Object -First 1
    if ($linea -and $linea.Matches[0].Groups[1].Value.Trim()) {
        $anterior = $linea.Matches[0].Groups[1].Value.Trim().TrimEnd('/')
    }
}

# .env
$contenido = Get-Content $envFile -Raw -Encoding UTF8
$contenido = [regex]::Replace($contenido, '(?m)^VITE_SITE_ORIGIN=.*$', "VITE_SITE_ORIGIN=$nuevo")
[System.IO.File]::WriteAllText($envFile, $contenido, (New-Object System.Text.UTF8Encoding($false)))

# Archivos que llevan la direccion escrita a mano.
$archivos = @(
    (Join-Path $SITIO 'public\sitemap.xml'),
    (Join-Path $SITIO 'public\robots.txt'),
    (Join-Path $SITIO 'index.html')
)
foreach ($archivo in $archivos) {
    if (-not (Test-Path $archivo)) { continue }
    $texto = Get-Content $archivo -Raw -Encoding UTF8
    $texto = $texto.Replace($anterior, $nuevo)
    $texto = $texto.Replace('https://TU-DOMINIO.com', $nuevo)
    [System.IO.File]::WriteAllText($archivo, $texto, (New-Object System.Text.UTF8Encoding($false)))
}

Write-Host ''
Write-Host "  Dominio configurado: $nuevo" -ForegroundColor Green
Write-Host "  Archivos actualizados: .env, sitemap.xml, robots.txt, index.html"
Write-Host ''
Write-Host '  Reconstruyendo el sitio...' -ForegroundColor Yellow

Push-Location $SITIO
try {
    npm run build
} finally {
    Pop-Location
}

Write-Host ''
Write-Host '  Listo. El sitio ya apunta al dominio nuevo.' -ForegroundColor Green
Write-Host '  Para verlo: 03-Servidor-Local\iniciar.ps1'
Write-Host ''
Read-Host 'Pulsa Enter para cerrar'
