# Genera la foto de perfil para Instagram y Facebook (1080 x 1080 px)
# Uso: clic derecho > Ejecutar con PowerShell
Add-Type -AssemblyName System.Drawing

$AQUI = Split-Path -Parent $MyInvocation.MyCommand.Path
$ancho = 1080
$alto  = 1080

$bmp = New-Object System.Drawing.Bitmap($ancho, $alto)
$g   = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'
$g.TextRenderingHint = 'AntiAliasGridFit'

$fondo = [System.Drawing.ColorTranslator]::FromHtml('#FDF8F4')
$g.Clear($fondo)

# Circulo suave de fondo
$rosaSuave = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#F6E3E7'))
$g.FillEllipse($rosaSuave, 90, 90, 900, 900)

# Nombre
$rosa = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#B4566D'))
$fuenteNombre = New-Object System.Drawing.Font('Georgia', 190, [System.Drawing.FontStyle]::Italic)
$formato = New-Object System.Drawing.StringFormat
$formato.Alignment = 'Center'
$g.DrawString('Girlys', $fuenteNombre, $rosa, (New-Object System.Drawing.RectangleF(0, 370, $ancho, 260)), $formato)

# Linea
$pluma = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml('#B4566D')), 3
$g.DrawLine($pluma, 390, 660, 690, 660)

# Subtitulo
$tinta = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#2B1B1F'))
$fuenteSub = New-Object System.Drawing.Font('Segoe UI', 34, [System.Drawing.FontStyle]::Regular)
$g.DrawString('MANICURA  /  SANTA CRUZ', $fuenteSub, $tinta, (New-Object System.Drawing.RectangleF(0, 700, $ancho, 80)), $formato)

# Detalle inferior
$fuentePie = New-Object System.Drawing.Font('Segoe UI', 24, [System.Drawing.FontStyle]::Regular)
$gris = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#7D6B70'))
$g.DrawString('precio cerrado, sin sorpresas', $fuentePie, $gris, (New-Object System.Drawing.RectangleF(0, 790, $ancho, 60)), $formato)

$png = Join-Path $AQUI 'perfil-1080.png'
$jpg = Join-Path $AQUI 'perfil-1080.jpg'
$bmp.Save($png, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save($jpg, [System.Drawing.Imaging.ImageFormat]::Jpeg)

$g.Dispose(); $bmp.Dispose()
Write-Host "  Imagenes creadas:" -ForegroundColor Green
Write-Host "   $png"
Write-Host "   $jpg"
