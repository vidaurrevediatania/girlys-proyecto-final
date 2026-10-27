export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID
  if (!clientId) {
    res.status(500).send('Falta GITHUB_CLIENT_ID en las variables de entorno de Vercel.')
    return
  }
  const scope = 'repo,user'
  const redirectUri = 'https://girlys-proyecto-final.vercel.app/api/callback'
  const url =
    'https://github.com/login/oauth/authorize' +
    '?client_id=' + encodeURIComponent(clientId) +
    '&scope=' + encodeURIComponent(scope) +
    '&redirect_uri=' + encodeURIComponent(redirectUri)
  res.redirect(302, url)
}
