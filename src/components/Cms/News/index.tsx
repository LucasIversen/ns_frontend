import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useEffect, useState } from "react";
import styles from "./styles";
import DeleteDialog from "../DeleteDialog";
import NewNews from "./NewNews";
import EditNews from "./EditNews";

const News = () => {
  const [news, setNews] = useState<any[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedNewsId, setSelectedNewsId] = useState("");
  const [tabContent, setTabContent] = useState("news");
  const [editingArticle, setEditingArticle] = useState<any | null>(null);

  const togglePublished = async (newsId: string, currentValue: boolean) => {
    try {
      const articleRef = doc(db, "news", newsId);
      await updateDoc(articleRef, { published: !currentValue });
      await fetchNews(); // Refresh the list
    } catch (err) {
      console.error("Fejl ved opdatering af 'published' status:", err);
      alert("Kunne ikke opdatere 'published' status.");
    }
  };

  const fetchNews = async () => {
    console.log("fetching news");

    if (typeof window === "undefined") return; // Don't fetch on the server

    await getDocs(collection(db, "news"))
      .then((querySnapshot) => {
        console.log("querySnapshot", querySnapshot);
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setNews(newData);
        console.log(news, newData);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const onDelete = async (id: string) => {
    console.log("Deleting news item with ID:", id);
    // Delete the news item with the given ID
    // ...
    setShowDeleteDialog(false);
  };

  switch (tabContent) {
    case "newNews":
      return <NewNews setTabContent={setTabContent} />;
    case "editNews":
      return (
        <EditNews article={editingArticle} setTabContent={setTabContent} />
      );
    default:
      return (
        <div style={styles.newsList}>
          <div style={styles.newNews}>
            <div
              style={styles.newNewsButton}
              onClick={() => setTabContent("newNews")}
            >
              Opret
            </div>
          </div>
          {news.map((newsItem) => (
            <div key={newsItem.id} style={styles.newsItem}>
              <div style={styles.newsTitle}>
                {newsItem.id} - {newsItem.title} - {newsItem.newsDate}
              </div>
              <div style={styles.buttons}>
                <div
                  style={styles.editButton}
                  onClick={() => {
                    setEditingArticle(newsItem);
                    setTabContent("editNews");
                  }}
                >
                  Rediger
                </div>
                <div
                  style={styles.deleteButton}
                  onClick={() => {
                    setSelectedNewsId(newsItem.id);
                    setShowDeleteDialog(true);
                  }}
                >
                  Slet
                </div>
                <div
                  style={{
                    ...styles.publishButton,
                    backgroundColor: newsItem.published ? "#d4edda" : "#f8d7da",
                    color: newsItem.published ? "#155724" : "#721c24",
                  }}
                  onClick={() =>
                    togglePublished(newsItem.id, newsItem.published)
                  }
                >
                  {newsItem.published ? "Publiceret" : "Ikke publiceret"}
                </div>
              </div>
            </div>
          ))}

          <DeleteDialog
            open={showDeleteDialog}
            onClose={() => {
              setShowDeleteDialog(false);
            }}
            onDelete={() => onDelete(selectedNewsId)}
          />
        </div>
      );
  }
};

export default News;
