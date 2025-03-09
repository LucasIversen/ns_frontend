const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  const userAgent = event.headers["user-agent"] || "";
  const isCrawler = /bot|crawl|spider|slurp/i.test(userAgent);

  if (!isCrawler) {
    return {
      statusCode: 301,
      headers: {
        Location: "/",
      },
    };
  }

  // Load pre-built articles.json
  const articlesPath = path.resolve(__dirname, "../../public/articles.json");
  const articles = JSON.parse(fs.readFileSync(articlesPath, "utf8"));

  // Extract article ID from URL
  const match = event.path.match(/^\/news\/([^/]+)/);
  if (!match) {
    return {
      statusCode: 404,
      body: "Article not found",
    };
  }

  const articleId = match[1];
  const article = articles[articleId];

  if (!article) {
    return {
      statusCode: 404,
      body: "Article not found",
    };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${article.title}</title>

      <meta property="og:title" content="${article.title}" />
      <meta property="og:description" content="${article.description}" />
      <meta property="og:image" content="${article.articleImage}" />
      <meta property="og:url" content="https://your-website.com/news/${articleId}" />
    </head>
    <body>
      <p>Loading...</p>
      <script>window.location.href = "/";</script>
    </body>
    </html>
    `,
  };
};
