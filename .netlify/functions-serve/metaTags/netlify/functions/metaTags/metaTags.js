// netlify/functions/metaTags/metaTags.mjs
var fs = require("fs");
var path = require("path");
exports.handler = async (event) => {
  try {
    console.log("\u{1F680} Serverless Function Triggered!");
    let match = event.path.match(/\/news\/([^/]+)/);
    if (!match) {
      match = event.path.match(/\/metaTags\/([^/]+)/);
    }
    if (!match) {
      return {
        statusCode: 400,
        body: "Article ID not provided"
      };
    }
    const articleId = match[1];
    console.log("\u{1F4CC} Extracted Article ID:", articleId);
    const response = await fetch("https://nordicstorm.net/articles.json");
    if (!response.ok) {
      throw new Error("Failed to load articles.json");
    }
    const articles = await response.json();
    console.log("\u2705 Loaded Articles JSON");
    const article = articles[articleId];
    if (!article) {
      console.log("\u274C Article Not Found");
      return { statusCode: 404, body: "Article not found" };
    }
    console.log("\u{1F4DD} Returning meta tags for:", article.title);
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
      `
    };
  } catch (error) {
    console.error("\u274C Error in Function:", error);
    return { statusCode: 500, body: "Internal Server Error" };
  }
};
//# sourceMappingURL=metaTags.js.map
