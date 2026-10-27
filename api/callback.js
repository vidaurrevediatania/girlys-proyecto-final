export default async function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID
  const clientSecret = process.env.GITHUB_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    res.status(500).send('Faltan GITHUB_CLIENT_ID o GITHUB_CLIENT_SECRET en Vercel.')
    return
  }

  const code = req.query && req.query.code
  if (!code) {
    res.status(400).send('No se recibió el código de autorización de GitHub.')
    return
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
      }),
    })

    const data = await response.json()

    if (data.error) {
      res.status(400).send('Error de GitHub: ' + (data.error_description || data.error))
      return
    }

    const token = data.access_token
    if (!token) {
      res.status(400).send('GitHub no devolvió un token de acceso.')
      return
    }

    const html = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Autorizando…</title>
  </head>
  <body>
    <script>
      (function () {
        var token = ${JSON.stringify(token)};
        var provider = 'github';
        if (window.opener) {
          window.opener.postMessage(
            'authorization:' + provider + ':success:' + JSON.stringify({ token: token, provider: provider }),
            '*'
          );
        }
        window.close();
      })();
    </script>
    <p>Autorizando…</p>
  </body>
</html>`

    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.status(200).send(html)
  } catch (error) {
    res.status(500).send('Error al intercambiar el código: ' + (error && error.message ? error.message : String(error)))
  }
}
