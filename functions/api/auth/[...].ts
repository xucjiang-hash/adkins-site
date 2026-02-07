export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // 发起 GitHub 登录
  if (url.pathname.endsWith("/auth")) {
    const redirect =
      `https://github.com/login/oauth/authorize` +
      `?client_id=${env.GITHUB_CLIENT_ID}` +
      `&scope=repo`;

    return Response.redirect(redirect, 302);
  }

  // GitHub 回调
  if (url.pathname.endsWith("/callback")) {
    const code = url.searchParams.get("code");

    const tokenRes = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      }
    );

    const token = await tokenRes.json();

    return new Response(
      `<script>
        window.opener.postMessage(${JSON.stringify(token)}, "*");
        window.close();
      </script>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  return new Response("Not Found", { status: 404 });
}
