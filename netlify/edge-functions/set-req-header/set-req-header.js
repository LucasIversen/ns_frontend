export default async (request, context) => {
  // Get the original response (news-placeholder.html)
  const response = await context.next();
  let page = await response.text();

  // Extract the news ID from the URL
  const url = new URL(request.url);
  const newsId = url.pathname.split("/").pop(); // Extracts ID from /news/:id

  if (!newsId) {
    return response; // Return unmodified page if no ID is found
  }

  // Fetch metadata from an API (replace with your actual API endpoint)
  const articles = await fetch("https://nordicstorm.net/articles.json").then(
    (res) => res.json()
  );

  const metaData = articles[newsId];

  if (!metaData) {
    return response; // If no metadata, return unmodified page
  }

  page = page.replace(
    /<meta[^>]+(name|property)="(title|description|og:[^"]+)"[^>]*>/gi,
    ""
  );
  page = page.replace(/<title>.*<\/title>/i, "");

  // Inject new meta tags dynamically
  const newMetaTags = `
    <title>${metaData.title}</title>
    <meta name="description" content="${metaData.description}">
    <meta property="og:title" content="${metaData.title}">
    <meta property="og:description" content="${metaData.description}">
    <meta property="og:image" content="${metaData.articleImage}">
  `;

  const updatedPage = page.replace("</head>", `${newMetaTags}</head>`);

  return new Response(updatedPage, response);
};
