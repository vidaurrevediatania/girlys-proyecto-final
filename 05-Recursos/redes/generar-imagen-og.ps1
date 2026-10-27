# ============================================================
#  Girlys · imagen para compartir en redes (Open Graph)
#  1200 x 630 px, misma linea grafica que la foto de perfil
#  Uso: clic derecho > Ejecutar con PowerShell
#  Guarda directo en 01-Sitio-Web\public\og-girlys.jpg
# ============================================================
Add-Type -AssemblyName System.Drawing

$AQUI = Split-Path -Parent $MyInvocation.MyCommand.Path
$destino = Join-Path (Split-Path (Split-Path $AQUI -Parent) -Parent) '01-Sitio-Web\public'
$ancho = 1200
$alto  = 630
$punto = [char]0x00B7

function Centrado($texto, $fuente, $color, $y, $caja) {
  $brocha = New-Object System.Drawing.SolidBrush $color
  $formato = New-Object System.Drawing.StringFormat
  $formato.Alignment = 'Center'
  $formato.LineAlignment = 'Center'
  $g.DrawString($texto, $fuente, $brocha, (New-Object System.Drawing.RectangleF(0, $y, $ancho, $caja)), $formato)
  $brocha.Dispose(); $formato.Dispose()
}

function Espaciado($texto, $sep) {
  return ($texto.ToCharArray() -join $sep)
}

$bmp = New-Object System.Drawing.Bitmap($ancho, $alto)
$g   = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode     = 'AntiAlias'
$g.TextRenderingHint = 'AntiAliasGridFit'

# fondo
$rect = New-Object System.Drawing.Rectangle(0, 0, $ancho, $alto)
$degradado = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  $rect,
  [System.Drawing.ColorTranslator]::FromHtml('#FDFAF7'),
  [System.Drawing.ColorTranslator]::FromHtml('#F7E9E4'),
  90)
$g.FillRectangle($degradado, $rect)
$degradado.Dispose()

# (sin halo: la portada se apoya solo en la tipografia y el marco)

# marcos
$oro    = [System.Drawing.ColorTranslator]::FromHtml('#C0A173')
$oropal = [System.Drawing.ColorTranslator]::FromHtml('#E2D2B4')
$rosa   = [System.Drawing.ColorTranslator]::FromHtml('#744644')
$tinta  = [System.Drawing.ColorTranslator]::FromHtml('#2B211C')
$gris   = [System.Drawing.ColorTranslator]::FromHtml('#8A7370')

$p1 = New-Object System.Drawing.Pen $oro, 1.5
$g.DrawRectangle($p1, 34, 34, ($ancho - 68), ($alto - 68))
$p2 = New-Object System.Drawing.Pen $oropal, 1.0
$g.DrawRectangle($p2, 48, 48, ($ancho - 96), ($alto - 96))
$p1.Dispose(); $p2.Dispose()

# textos
$fEst = New-Object System.Drawing.Font('Georgia', 16, [System.Drawing.FontStyle]::Regular)
Centrado (Espaciado 'EST. 2019' ' ') $fEst $oro 72 32

$fNombre = New-Object System.Drawing.Font('Georgia', 126, [System.Drawing.FontStyle]::Italic)
Centrado 'Girlys' $fNombre $rosa 125 210

# filete con rombo
$pluma = New-Object System.Drawing.Pen $oro, 1.3
$g.DrawLine($pluma, 480, 352, 565, 352)
$g.DrawLine($pluma, 635, 352, 720, 352)
$pluma.Dispose()

$rombo = New-Object System.Drawing.Drawing2D.GraphicsPath
$rombo.AddPolygon(@(
  (New-Object System.Drawing.Point(600, 343)),
  (New-Object System.Drawing.Point(609, 352)),
  (New-Object System.Drawing.Point(600, 361)),
  (New-Object System.Drawing.Point(591, 352))
))
$br = New-Object System.Drawing.SolidBrush $oro
$g.FillPath($br, $rombo)
$br.Dispose(); $rombo.Dispose()

$fSub = New-Object System.Drawing.Font('Georgia', 23, [System.Drawing.FontStyle]::Regular)
Centrado (Espaciado 'MANICURA & PEDICURA' ' ') $fSub $tinta 386 44

$fLugar = New-Object System.Drawing.Font('Georgia', 19, [System.Drawing.FontStyle]::Regular)
Centrado (Espaciado "SUCRE $punto BOLIVIA" ' ') $fLugar $oro 436 38

$fPie = New-Object System.Drawing.Font('Georgia', 23, [System.Drawing.FontStyle]::Italic)
Centrado 'precio cerrado, sin sorpresas' $fPie $gris 512 38

# guardar
$jpg = Join-Path $destino 'og-girlys.jpg'
$codificador = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object { $_.MimeType -eq 'image/jpeg' }
$parametros = New-Object System.Drawing.Imaging.EncoderParameters(1)
$parametros.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
  [System.Drawing.Imaging.Encoder]::Quality, 92L)
$bmp.Save($jpg, $codificador, $parametros)

$g.Dispose(); $bmp.Dispose()
Write-Host "  Imagen creada:" -ForegroundColor Green
Write-Host "   $jpg"
