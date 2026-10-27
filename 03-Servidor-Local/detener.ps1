# ============================================================
#  APAGAR TODO (sitio web + WordPress)
#  Cierra los procesos de PHP y Node que abrio iniciar.ps1.
# ============================================================

$ErrorActionPreference = 'SilentlyContinue'

Write-Host ''
Write-Host '  Apagando servidores locales...' -ForegroundColor Yellow

foreach ($puerto in 8090, 8443, 8080) {
    $conexiones = Get-NetTCPConnection -LocalPort $puerto -State Listen -ErrorAction SilentlyContinue
    foreach ($c in $conexiones) {
        $proceso = Get-Process -Id $c.OwningProcess -ErrorAction SilentlyContinue
        if ($proceso -and $proceso.ProcessName -match 'php|node') {
            Stop-Process -Id $proceso.Id -Force -ErrorAction SilentlyContinue
            Write-Host "  Cerrado: $($proceso.ProcessName) (puerto $puerto)"
        }
    }
}

Write-Host '  Listo.' -ForegroundColor Green
Write-Host ''
Start-Sleep -Seconds 1
