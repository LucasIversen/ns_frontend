const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  try {
    console.log("🚀 Serverless Function Triggered!");

    // ✅ Extract article ID from the URL path
    let match = event.path.match(/\/share_news\/([^/]+)/);
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
    const response = await fetch("https://nordicstorm.net/articles.json");

    if (!response.ok) {
      throw new Error("Failed to load articles.json");
    }

    const articles = await response.json();
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
        <meta property="og:url" content="https://nordicstorm.net/news/${articleId}" />
      </head>
      <body>
        <p>Loading...</p>
        <script>window.location.href = "/news/${articleId}";</script>
      </body>
      </html>
      `,
    };
  } catch (error) {
    console.error("❌ Error in Function:", error);
    return { statusCode: 500, body: "Internal Server Error" };
  }
};
