# ============================================================
#  APAGAR EL SITIO LOCAL
#  Cierra el proceso de Node que abrio iniciar.ps1.
# ============================================================

$ErrorActionPreference = 'SilentlyContinue'

Write-Host ''
Write-Host '  Apagando servidor local...' -ForegroundColor Yellow

foreach ($puerto in 8443, 8080) {
    $conexiones = Get-NetTCPConnection -LocalPort $puerto -State Listen -ErrorAction SilentlyContinue
    foreach ($c in $conexiones) {
        $proceso = Get-Process -Id $c.OwningProcess -ErrorAction SilentlyContinue
        if ($proceso -and $proceso.ProcessName -match 'node') {
            Stop-Process -Id $proceso.Id -Force -ErrorAction SilentlyContinue
            Write-Host "  Cerrado: $($proceso.ProcessName) (puerto $puerto)"
        }
    }
}

Write-Host '  Listo.' -ForegroundColor Green
Write-Host ''
Start-Sleep -Seconds 1
