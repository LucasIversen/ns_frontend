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

  // Replace placeholders in the HTML with real meta data
  const updatedPage = page
    .replace("Nordic Storm", metaData.title)
    .replace(
      "Catch up on the latest Nordic Storm updates!",
      metaData.description
    )
    .replace("https://nordicstorm.net/default-image.png", metaData.image);

  return new Response(updatedPage, response);
};
