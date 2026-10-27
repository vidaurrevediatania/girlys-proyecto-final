# ============================================================
#  Girlys · foto de perfil para Instagram y Facebook
#  1080 x 1080 px, paleta crema / rosa empolvado / laton
#  Uso: clic derecho > Ejecutar con PowerShell
# ============================================================
Add-Type -AssemblyName System.Drawing

$AQUI  = Split-Path -Parent $MyInvocation.MyCommand.Path
$lado  = 1080
$punto = [char]0x00B7   # punto medio, para "SUCRE · BOLIVIA"

# --- utilidades ---------------------------------------------
function Centrado($texto, $fuente, $color, $y, $alto) {
  $brocha = New-Object System.Drawing.SolidBrush $color
  $formato = New-Object System.Drawing.StringFormat
  $formato.Alignment = 'Center'
  $formato.LineAlignment = 'Center'
  $g.DrawString($texto, $fuente, $brocha, (New-Object System.Drawing.RectangleF(0, $y, $lado, $alto)), $formato)
  $brocha.Dispose(); $formato.Dispose()
}

# separa las letras con espacios finos: da aire de marca editorial
function Espaciado($texto, $sep) {
  $letras = $texto.ToCharArray()
  return ($letras -join $sep)
}

# --- lienzo -------------------------------------------------
$bmp = New-Object System.Drawing.Bitmap($lado, $lado)
$g   = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode      = 'AntiAlias'
$g.TextRenderingHint  = 'AntiAliasGridFit'
$g.InterpolationMode  = 'HighQualityBicubic'
$g.PixelOffsetMode    = 'HighQuality'

# fondo: degradado muy suave de crema a rosa palido
$rect = New-Object System.Drawing.Rectangle(0, 0, $lado, $lado)
$degradado = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  $rect,
  [System.Drawing.ColorTranslator]::FromHtml('#FDFAF7'),
  [System.Drawing.ColorTranslator]::FromHtml('#F7E9E4'),
  90)
$g.FillRectangle($degradado, $rect)
$degradado.Dispose()

# halo rosa detras del nombre
$halo = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(52, 191, 138, 133))
$g.FillEllipse($halo, 195, 245, 690, 640)
$halo.Dispose()

# --- marcos -------------------------------------------------
$oro   = [System.Drawing.ColorTranslator]::FromHtml('#C0A173')
$oropal = [System.Drawing.ColorTranslator]::FromHtml('#E2D2B4')
$rosa  = [System.Drawing.ColorTranslator]::FromHtml('#744644')
$tinta = [System.Drawing.ColorTranslator]::FromHtml('#2B211C')
$gris  = [System.Drawing.ColorTranslator]::FromHtml('#8A7370')

$marcoExterior = New-Object System.Drawing.Pen $oro, 1.6
$g.DrawRectangle($marcoExterior, 54, 54, 972, 972)

$marcoInterior = New-Object System.Drawing.Pen $oropal, 1.0
$g.DrawRectangle($marcoInterior, 70, 70, 940, 940)
$marcoExterior.Dispose(); $marcoInterior.Dispose()

# --- arriba: EST. 2019 --------------------------------------
$fEst = New-Object System.Drawing.Font('Georgia', 20, [System.Drawing.FontStyle]::Regular)
Centrado (Espaciado 'EST. 2019' ' ') $fEst $oro 172 40

# --- nombre -------------------------------------------------
$fuenteNombre = New-Object System.Drawing.Font('Georgia', 158, [System.Drawing.FontStyle]::Italic)
Centrado 'Girlys' $fuenteNombre $rosa 322 320

# --- filete con rombo ---------------------------------------
$pluma = New-Object System.Drawing.Pen $oro, 1.4
$g.DrawLine($pluma, 425, 677, 522, 677)
$g.DrawLine($pluma, 558, 677, 655, 677)
$pluma.Dispose()

$rombo = New-Object System.Drawing.Drawing2D.GraphicsPath
$rombo.AddPolygon(@(
  (New-Object System.Drawing.Point(540, 667)),
  (New-Object System.Drawing.Point(550, 677)),
  (New-Object System.Drawing.Point(540, 687)),
  (New-Object System.Drawing.Point(530, 677))
))
$brochaRombo = New-Object System.Drawing.SolidBrush $oro
$g.FillPath($brochaRombo, $rombo)
$brochaRombo.Dispose(); $rombo.Dispose()

# --- subtitulo ----------------------------------------------
$fSub = New-Object System.Drawing.Font('Georgia', 27, [System.Drawing.FontStyle]::Regular)
Centrado (Espaciado 'MANICURA & PEDICURA' ' ') $fSub $tinta 717 56

$fLugar = New-Object System.Drawing.Font('Georgia', 23, [System.Drawing.FontStyle]::Regular)
Centrado (Espaciado "SUCRE $punto BOLIVIA" ' ') $fLugar $oro 784 48

# --- pie ----------------------------------------------------
$fPie = New-Object System.Drawing.Font('Georgia', 29, [System.Drawing.FontStyle]::Italic)
Centrado 'precio cerrado, sin sorpresas' $fPie $gris 902 56

# --- guardar ------------------------------------------------
$png = Join-Path $AQUI 'perfil-1080.png'
$jpg = Join-Path $AQUI 'perfil-1080.jpg'

$bmp.Save($png, [System.Drawing.Imaging.ImageFormat]::Png)

$codificador = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object { $_.MimeType -eq 'image/jpeg' }
$parametros = New-Object System.Drawing.Imaging.EncoderParameters(1)
$parametros.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
  [System.Drawing.Imaging.Encoder]::Quality, 92L)
$bmp.Save($jpg, $codificador, $parametros)

$g.Dispose(); $bmp.Dispose()
Write-Host "  Imagenes creadas:" -ForegroundColor Green
Write-Host "   $png"
Write-Host "   $jpg"
