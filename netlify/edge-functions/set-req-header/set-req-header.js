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
  const articles = await fetch("/articles.json").then((res) => res.json());

  const metaData = articles[articleId];

  if (!metaData) {
    return response; // If no metadata, return unmodified page
  }

  // Replace placeholders in the HTML with real meta data
  page = page
    .replace("__META_TITLE__", metaData.title)
    .replace("__META_DESCRIPTION__", metaData.description)
    .replace("__META_IMAGE__", metaData.image);

  return new Response(page, {
    headers: {
      "Content-Type": "text/html",
    },
  });
};
