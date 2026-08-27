const BLOCKED_COUNTRY_CODE = "AM";

export default async (request, context) => {
  const countryCode = context.geo?.country?.code;

  if (countryCode === BLOCKED_COUNTRY_CODE) {
    return new Response(
      `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Unavailable</title>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: #0e1116;
        background: #f6f3ee;
      }
      main {
        width: min(90vw, 520px);
        text-align: center;
      }
      h1 {
        margin: 0 0 12px;
        font-size: clamp(30px, 5vw, 48px);
      }
      p {
        margin: 0;
        color: rgba(14, 17, 22, 0.62);
        line-height: 1.6;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Website unavailable</h1>
      <p>This website is not available in your region.</p>
    </main>
  </body>
</html>`,
      {
        status: 403,
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "no-store",
        },
      },
    );
  }

  return context.next();
};
