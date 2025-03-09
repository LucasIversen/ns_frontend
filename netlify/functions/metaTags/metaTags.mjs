export default async (request, context) => {
  try {
    const url = new URL(request.url);
    const pathSegments = url.pathname.split("/");
    const articleId = pathSegments[pathSegments.length - 1];

    if (!articleId) {
      return new Response("Article ID not found", { status: 404 });
    }

    // ✅ Fetch the pre-built `articles.json` file instead of reading from disk
    const response = await fetch("https://your-netlify-site.com/articles.json");
    if (!response.ok) {
      throw new Error("Failed to load articles.json");
    }

    const articles = await response.json();
    const article = articles[articleId];

    if (!article) {
      return new Response("Article not found", { status: 404 });
    }

    // ✅ Return dynamically generated meta tags
    return new Response(
      `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${article.title}</title>

        <meta property="og:title" content="${article.title}" />
        <meta property="og:description" content="${article.description}" />
        <meta property="og:image" content="${article.articleImage}" />
        <meta property="og:url" content="${url.href}" />
      </head>
      <body>
        <p>Loading...</p>
        <script>window.location.href = "/";</script>
      </body>
      </html>
      `,
      { headers: { "Content-Type": "text/html" } }
    );
  } catch (error) {
    return new Response(`Error: ${error.toString()}`, { status: 500 });
  }
};
