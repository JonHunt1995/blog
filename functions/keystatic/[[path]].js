export async function onRequest(context) {
  const url = new URL(context.request.url);

  // If requesting a static file with an extension, fetch directly from assets
  if (url.pathname.slice('/keystatic'.length).includes('.')) {
    return context.env.ASSETS.fetch(context.request);
  }

  // For any SPA route under /keystatic, serve the Keystatic index.html
  const indexUrl = new URL('/keystatic/index.html', context.request.url);
  return context.env.ASSETS.fetch(new Request(indexUrl, context.request));
}
