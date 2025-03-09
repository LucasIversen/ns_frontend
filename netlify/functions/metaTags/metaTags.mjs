const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  try {
    console.log("🚀 Serverless Function Triggered!");

    // ✅ Extract article ID from the URL path
    let match = event.path.match(/\/news\/([^/]+)/);
    if (!match) {
      match = event.path.match(/\/metaTags\/([^/]+)/);
    }

    if (!match) {
      return {
        statusCode: 400,
        body: "Article ID not provided",
      };
    }

    const articleId = match[1];
    console.log("📌 Extracted Article ID:", articleId);

    // ✅ Load `articles.json` from Netlify's deployed functions directory
    const articlesPath = path.join(process.cwd(), "public", "articles.json");

    if (!fs.existsSync(articlesPath)) {
      console.error("❌ Error: articles.json not found!");
      return {
        statusCode: 500,
        body: "Internal Server Error: articles.json not found",
      };
    }

    const articles = JSON.parse(fs.readFileSync(articlesPath, "utf8"));
    console.log("✅ Loaded Articles JSON");

    const article = articles[articleId];

    if (!article) {
      console.log("❌ Article Not Found");
      return { statusCode: 404, body: "Article not found" };
    }

    console.log("📝 Returning meta tags for:", article.title);

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
        <meta property="og:url" content="https://your-site.com/news/${articleId}" />
      </head>
      <body>
        <p>Loading...</p>
        <script>window.location.href = "/";</script>
      </body>
      </html>
      `,
    };
  } catch (error) {
    console.error("❌ Error in Function:", error);
    return { statusCode: 500, body: "Internal Server Error" };
  }
};
