# ============================================================
#  INSTALACION COMPLETA DESDE CERO
#  Descarga PHP, WordPress, el tema y los plugins, construye el
#  sitio y deja WordPress configurado.
#
#  Solo hace falta: Windows + Node.js + conexion a internet.
#  Uso: clic derecho > Ejecutar con PowerShell
# ============================================================

$ErrorActionPreference = 'Stop'
$AQUI = Split-Path -Parent $MyInvocation.MyCommand.Path
$RAIZ = Split-Path -Parent $AQUI
$PHP  = Join-Path $AQUI 'php'
$WP   = Join-Path $RAIZ '02-WordPress'
$DESC = Join-Path $RAIZ '99-Descargas'
$SITIO = Join-Path $RAIZ '01-Sitio-Web'

function Bien($t) { Write-Host "  [ok] $t" -ForegroundColor Green }
function Info($t) { Write-Host "  $t" }
function Bajar($url, $destino) {
    if (Test-Path $destino) { return }
    Info "Descargando $(Split-Path -Leaf $destino)..."
    curl.exe -sSL --max-time 600 -o $destino $url
    if (-not (Test-Path $destino)) { throw "No se pudo descargar $url" }
}

New-Item -ItemType Directory -Force -Path $DESC, $PHP | Out-Null

Write-Host ''
Write-Host '  ======================================================' -ForegroundColor Magenta
Write-Host '   GIRLYS - instalacion local completa' -ForegroundColor Magenta
Write-Host '  ======================================================' -ForegroundColor Magenta
Write-Host ''

# 1. PHP portatil
if (-not (Test-Path (Join-Path $PHP 'php.exe'))) {
    Bajar 'https://downloads.php.net/~windows/releases/php-8.2.35-1-nts-Win32-vs16-x64.zip' (Join-Path $DESC 'php.zip')
    Info 'Descomprimiendo PHP...'
    tar.exe -xf (Join-Path $DESC 'php.zip') -C $PHP
    Copy-Item (Join-Path $PHP 'php.ini-development') (Join-Path $PHP 'php.ini') -Force
    $ini = @"

extension_dir = "ext"
extension=openssl
extension=mbstring
extension=curl
extension=gd
extension=zip
extension=fileinfo
extension=pdo_sqlite
extension=sqlite3
extension=exif
extension=intl
memory_limit = 512M
upload_max_filesize = 128M
post_max_size = 128M
max_execution_time = 300
date.timezone = America/La_Paz
"@
    Add-Content -Path (Join-Path $PHP 'php.ini') -Value $ini
    Bien 'PHP 8.2 listo'
} else {
    Bien 'PHP ya estaba instalado'
}

# 2. WordPress
if (-not (Test-Path (Join-Path $WP 'wp-load.php'))) {
    Bajar 'https://wordpress.org/latest.zip' (Join-Path $DESC 'wordpress.zip')
    $tmp = Join-Path $DESC '_wp'
    Remove-Item $tmp -Recurse -Force -ErrorAction SilentlyContinue
    New-Item -ItemType Directory -Force -Path $tmp | Out-Null
    Info 'Descomprimiendo WordPress...'
    tar.exe -xf (Join-Path $DESC 'wordpress.zip') -C $tmp
    # robocopy evita el limite de 260 caracteres de Windows
    robocopy (Join-Path $tmp 'wordpress') $WP /E /NFL /NDL /NJH /NJS /R:1 /W:1 | Out-Null
    Remove-Item $tmp -Recurse -Force -ErrorAction SilentlyContinue
    Bien 'WordPress listo'
} else {
    Bien 'WordPress ya estaba instalado'
}

# 3. Tema y plugins
$plugins = @(
    @{ url = 'https://downloads.wordpress.org/plugin/sqlite-database-integration.zip'; carpeta = 'sqlite-database-integration'; tipo = 'plugins' },
    @{ url = 'https://downloads.wordpress.org/plugin/seo-by-rank-math.zip';          carpeta = 'seo-by-rank-math';          tipo = 'plugins' },
    @{ url = 'https://downloads.wordpress.org/plugin/updraftplus.zip';               carpeta = 'updraftplus';               tipo = 'plugins' },
    @{ url = 'https://downloads.wordpress.org/plugin/wordfence.zip';                 carpeta = 'wordfence';                 tipo = 'plugins' },
    @{ url = 'https://downloads.wordpress.org/plugin/wp-super-cache.zip';            carpeta = 'wp-super-cache';            tipo = 'plugins' },
    @{ url = 'https://downloads.wordpress.org/theme/astra.zip';                      carpeta = 'astra';                     tipo = 'themes' }
)

foreach ($p in $plugins) {
    $destinoFinal = Join-Path $WP ("wp-content\" + $p.tipo + "\" + $p.carpeta)
    if (Test-Path $destinoFinal) { continue }
    $zip = Join-Path $DESC ("extra-" + $p.carpeta + ".zip")
    Bajar $p.url $zip
    $tmp = Join-Path $DESC '_extra'
    Remove-Item $tmp -Recurse -Force -ErrorAction SilentlyContinue
    New-Item -ItemType Directory -Force -Path $tmp | Out-Null
    tar.exe -xf $zip -C $tmp
    Move-Item (Join-Path $tmp $p.carpeta) $destinoFinal -Force
    Remove-Item $tmp -Recurse -Force -ErrorAction SilentlyContinue
    Bien ("Instalado: " + $p.carpeta)
}

# 4. Certificado SSL local
if (-not (Test-Path (Join-Path $AQUI 'certs\localhost.crt'))) {
    Info 'Generando certificado SSL autofirmado...'
    & (Join-Path $AQUI 'generar-certificado.ps1') -SinPausa
} else {
    Bien 'Certificado SSL ya existia'
}

# 5. Sitio web
if (-not (Test-Path (Join-Path $SITIO 'dist\index.html'))) {
    Info 'Instalando dependencias y construyendo el sitio...'
    Push-Location $SITIO
    try {
        npm install --no-audit --no-fund
        npm run build
    } finally {
        Pop-Location
    }
    Bien 'Sitio construido'
} else {
    Bien 'El sitio ya estaba construido'
}

# 6. WordPress: base de datos, tema, plugins y contenido
Info 'Configurando WordPress...'
& (Join-Path $PHP 'php.exe') (Join-Path $AQUI 'instalar-wordpress.php')

Write-Host ''
Write-Host '  Todo listo. Ejecuta iniciar.ps1 para abrir el sitio.' -ForegroundColor Green
Write-Host ''
Read-Host 'Pulsa Enter para cerrar'
