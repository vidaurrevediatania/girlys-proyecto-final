# Punto 3 · SSL: HTTPS en local y en producción

Hay dos escenarios y conviene no mezclarlos:

| Escenario | Certificado | Costo | Estado |
|---|---|---|---|
| **Local (tu PC)** | Autofirmado | 0 | ✅ Hecho |
| **Producción (Vercel)** | Automático (Let's Encrypt) | 0 | ✅ Al publicar |

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
  -subj "/C=BO/ST=Sucre/L=Sucre/O=Girlys Local/CN=localhost" `
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

Los dos archivos se generan en tu PC y **no se suben a GitHub** (`.gitignore`).
Si la clave se filtra, cualquiera podría suplantar el sitio **en tu red local**.
Regenerar el certificado es suficiente: `generar-certificado.ps1`.

---

## 3.2 Producción: HTTPS automático en Vercel

Vercel emite y renueva el certificado **sin configuración**:

1. El sitio se publica con la URL gratuita `https://proyecto.vercel.app`.
2. Vercel instala un certificado de Let's Encrypt y lo renueva solo.
3. Al conectar un dominio propio (documento 8), también lo emite solo.

No hay que comprar certificados, instalar AutoSSL, ni pegar claves en un panel.
Tampoco hay que forzar HTTPS a mano: Vercel redirige `http://` a `https://`.

### Comprobar que funciona

| Prueba | Resultado esperado |
|---|---|
| Abrir `https://proyecto.vercel.app` | Candado válido en el navegador |
| Abrir `http://proyecto.vercel.app` | Redirige a `https://` |
| Fecha del certificado | Vercel la renueva antes de que venza |

---

## 3.3 Por qué no hay contenido mixto

El sitio **no carga nada por HTTP**:

- Las fuentes están autoalojadas en `public/fuentes`.
- Las imágenes son locales o del mismo dominio.
- No se usan Google Fonts ni librerías desde CDN.

Por eso el candado no se rompe. Para verificarlo: abrir el sitio → `F12` →
pestaña **Console** → buscar advertencias *Mixed Content*. No debe haber ninguna.

> La única excepción posible es Google Analytics, que se carga por HTTPS y solo
> si la persona acepta el aviso de cookies.

---

## 3.4 Qué pasa con el certificado local al publicar

Nada. El certificado autofirmado **solo existe en tu PC** y no se sube a GitHub.
En producción, el navegador ve el certificado real de Vercel.

```
Tu PC:    https://localhost:8443   → certificado autofirmado (advertencia)
Internet: https://tudominio.com    → certificado de Vercel (candado verde)
```

---

## 3.5 Resumen para la defensa

1. **Local:** certificado autofirmado generado con OpenSSL, HTTPS en `localhost:8443`,
   advertencia del navegador explicada y justificada.
2. **Producción:** Vercel emite y renueva el certificado automáticamente (Let's Encrypt).
3. **Redirección:** `http://` → `https://` la hace la plataforma.
4. **Clave privada:** fuera de Git y nunca compartida.
