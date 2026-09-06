export async function onRequest(context) {
  const url = new URL(context.request.url);

  // If requesting a static file with an extension, fetch directly from assets
  if (url.pathname.slice('/keystatic'.length).includes('.')) {
    return context.env.ASSETS.fetch(context.request);
  }

  // Fetch the main Keystatic page
  const res = await context.env.ASSETS.fetch(new URL('/keystatic/', context.request.url));

  // If Cloudflare returns a redirect (e.g. trailing slash canonicalization), follow it internally
  if (res.status >= 300 && res.status < 400 && res.headers.has('location')) {
    const target = new URL(res.headers.get('location'), context.request.url);
    const followed = await context.env.ASSETS.fetch(new Request(target, context.request));
    return new Response(followed.body, {
      status: 200,
      headers: followed.headers,
    });
  }

  return new Response(res.body, {
    status: 200,
    headers: res.headers,
  });
}
