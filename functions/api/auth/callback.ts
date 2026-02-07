export const onRequestGet: PagesFunction = async ({ request, env }) => {
  const url = new URL(request.url)
  const code = url.searchParams.get("code")

  if (!code) {
    return new Response("Missing code", { status: 400 })
  }

  const tokenResponse = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
      }),
    }
  )

  const tokenData = await tokenResponse.json()

  if (!tokenData.access_token) {
    return new Response("GitHub OAuth failed", { status: 401 })
  }

  return new Response(
    JSON.stringify({
      token: tokenData.access_token,
      provider: "github",
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
}
