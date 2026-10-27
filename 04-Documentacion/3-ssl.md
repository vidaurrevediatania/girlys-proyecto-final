# Punto 3 · SSL: autofirmado, Let's Encrypt y ZeroSSL

Hay dos escenarios y conviene no mezclarlos:

| Escenario | Certificado | Costo | Estado |
|---|---|---|---|
| **Local (tu PC)** | Autofirmado | 0 | ✅ Hecho |
| **Hosting real** | Let's Encrypt (recomendado) o ZeroSSL | 0 | ⏳ Cuando haya dominio |

---

## 3.1 Local: certificado autofirmado (ya funcionando)

### Qué es

Un certificado que **nosotros mismos** generamos. Cifra la conexión igual que uno pagado,
pero ningún navegador lo reconoce como "de confianza" porque no lo firma una autoridad pública.

Sirve para:

- Practicar HTTPS en local.
- Que el sitio funcione con `https://localhost:8443` igual que en producción.
- Cumplir el requisito de "incorporación de SSL" sin dominio.

### Cómo se generó

```powershell
openssl req -x509 -newkey rsa:2048 -nodes `
  -keyout certs\localhost.key -out certs\localhost.crt `
  -days 825 `
  -subj "/C=BO/ST=Santa Cruz/L=Santa Cruz/O=Girlys Local/CN=localhost" `
  -addext "subjectAltName=DNS:localhost,DNS:girlys.local,IP:127.0.0.1"
```

Resultado:

```
03-Servidor-Local\certs\localhost.crt   ← certificado (público)
03-Servidor-Local\certs\localhost.key   ← clave privada (NO compartir)
```

Válido hasta **2029**. Para regenerarlo: `generar-certificado.ps1`.

### Por qué el navegador muestra "No es privada"

Porque el certificado no lo firma una autoridad certificadora. Es **esperado**.
Haz clic en **Avanzado → Continuar a localhost**.

### (Opcional) Quitar la advertencia en tu PC

1. Doble clic en `localhost.crt`.
2. **Instalar certificado → Equipo local → Colocar todos los certificados en el almacén siguiente**.
3. Elegir **Entidades de certificación raíz de confianza**.
4. Aceptar y reiniciar el navegador.

Es opcional. Solo hazlo en tu computadora, nunca en un equipo compartido.

### Seguridad de la clave privada

`localhost.key` está excluida de Git (`.gitignore`). Si se filtra, cualquiera podría
suplantar el sitio **en tu red local**. Regenerar el certificado es suficiente.

---

## 3.2 Hosting real: Let's Encrypt (recomendado)

Gratis, se renueva sola cada 90 días y la mayoría de los paneles la instala en dos clics.

### En CWP (panel de usuario)

1. Entrar a `https://TU-HOST:2083`.
2. Menú **SSL / TLS → AutoSSL**.
3. Seleccionar el dominio y pulsar **Run AutoSSL**.
4. Esperar 1-2 minutos. Debe aparecer *Certificate installed*.

### En cPanel

1. **Seguridad → SSL/TLS Status**.
2. Marcar el dominio → **Run AutoSSL**.

### Verificar

- Abrir `https://tudominio.com` y comprobar el candado.
- Ver la fecha de vencimiento (debe ser ~90 días).
- Probar `http://tudominio.com` → debe redirigir a `https://`.

Si AutoSSL falla, casi siempre es porque el DNS todavía no apunta al servidor.
Esperar la propagación (hasta 24 h) y reintentar.

---

## 3.3 Hosting real: ZeroSSL (alternativa)

Útil si el hosting no tiene AutoSSL o si Let's Encrypt está limitado por rate limit.

1. Crear cuenta gratis en <https://zerossl.com>.
2. **New Certificate → 90-day Free**.
3. Escribir el dominio (sin `https://`, sin barra final).
4. Elegir validación **HTTP File Upload** (la más simple):
   - ZeroSSL da un archivo y una ruta.
   - Subirlo con el Administrador de archivos del hosting.
   - Pulsar **Verify**.
5. Descargar el paquete. Vienen 3 archivos:
   - `certificate.crt` (el certificado)
   - `ca_bundle.crt` (la cadena)
   - `private.key` (la clave)
6. En CWP: **SSL / TLS → Install Certificate**, pegar los tres y guardar.
7. Renovar cada 90 días (ZeroSSL gratis **no** renueva automático).

> Let's Encrypt es preferible justamente por la renovación automática.
> ZeroSSL queda como plan B documentado.

---

## 3.4 Forzar HTTPS (ya incluido)

El archivo `01-Sitio-Web\deploy\.htaccess` ya trae las reglas para el hosting Apache:

```apache
# HTTP -> HTTPS
RewriteCond %{HTTPS} !=on
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# www -> sin www
RewriteCond %{HTTP_HOST} ^www\.(.+)$ [NC]
RewriteRule ^ https://%1%{REQUEST_URI} [L,R=301]
```

Se sube junto con el sitio (es un archivo oculto: activar "mostrar archivos ocultos" en el
administrador de archivos).

### Comprobar que no hay contenido mixto

El sitio **no carga nada por HTTP**: fuentes autoalojadas, imágenes locales, sin Google Fonts.
Por eso el candado no se rompe.

Para verificarlo: abrir el sitio → `F12` → pestaña **Console** → buscar advertencias
*Mixed Content*. No debe haber ninguna.

---

## 3.5 Resumen para la defensa

1. **Local:** certificado autofirmado generado con OpenSSL, HTTPS en `localhost:8443`,
   advertencia del navegador explicada y justificada.
2. **Producción:** Let's Encrypt gratis con renovación automática desde el panel;
   ZeroSSL documentado como alternativa manual.
3. **Redirección:** HTTP → HTTPS y `www` → sin `www` mediante `.htaccess`.
4. **Clave privada:** fuera de Git y nunca compartida.
