# ============================================================
#  GENERAR CERTIFICADO SSL AUTOFIRMADO (local)
#  Punto 3 de la lista: HTTPS sin pagar nada.
#
#  Crea 03-Servidor-Local\certs\localhost.crt y localhost.key
#  Valido para localhost y 127.0.0.1.
# ============================================================

param([switch]$SinPausa)

$ErrorActionPreference = 'Stop'
$AQUI = Split-Path -Parent $MyInvocation.MyCommand.Path
$certs = Join-Path $AQUI 'certs'
New-Item -ItemType Directory -Force -Path $certs | Out-Null

$candidatos = @(
    'C:\Program Files\Git\usr\bin\openssl.exe',
    'C:\Program Files\OpenSSL-Win64\bin\openssl.exe',
    (Get-Command openssl.exe -ErrorAction SilentlyContinue).Source
) | Where-Object { $_ -and (Test-Path $_) }

if (-not $candidatos) {
    Write-Host '  No se encontro OpenSSL.' -ForegroundColor Red
    Write-Host '  Instala Git para Windows (https://git-scm.com) y vuelve a intentar.'
    Write-Host '  Git incluye OpenSSL y ademas lo necesitas para publicar en GitHub.'
    Write-Host ''
    if (-not $SinPausa) { Read-Host 'Pulsa Enter para cerrar' }
    exit 1
}

$openssl = $candidatos[0]
Write-Host "  Usando OpenSSL: $openssl"
Write-Host '  Generando certificado valido por 825 dias...'

& $openssl req -x509 -newkey rsa:2048 -nodes `
    -keyout (Join-Path $certs 'localhost.key') `
    -out (Join-Path $certs 'localhost.crt') `
    -days 825 `
    -subj '/C=BO/ST=Santa Cruz/L=Santa Cruz/O=Girlys Local/CN=localhost' `
    -addext 'subjectAltName=DNS:localhost,DNS:girlys.local,IP:127.0.0.1' 2>$null

if (Test-Path (Join-Path $certs 'localhost.crt')) {
    Write-Host '  Certificado creado correctamente.' -ForegroundColor Green
    Write-Host '  El navegador mostrara "no seguro" la primera vez:'
    Write-Host '  haz clic en Avanzado > Continuar a localhost. Es normal en local.'
} else {
    Write-Host '  Algo fallo. Revisa el mensaje de OpenSSL.' -ForegroundColor Red
}

Write-Host ''
if (-not $SinPausa) { Read-Host 'Pulsa Enter para cerrar' }
