export const onRequestGet: PagesFunction = async ({ env }) => {
  const clientId = env.GITHUB_CLIENT_ID

  const redirectUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${clientId}` +
    `&scope=repo,user`

  return Response.redirect(redirectUrl, 302)
}
