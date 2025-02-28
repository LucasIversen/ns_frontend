import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Home = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    const newsQuery = query(
      collection(db, "news"),
      where("published", "==", true),
      orderBy("newsDate", "desc"),
      limit(5)
    );

    await getDocs(newsQuery)
      .then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setNews(newData);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Nordic Storm</title>
        <meta
          name="description"
          content="Nordic Storm, the newest team in the European League of Football."
        />
        <meta
          name="keywords"
          content="Nordic Storm, American Football Copenhagen, American Football Denmark, American Football Sweden, Football Copenhagen, Football Denmark, Football Sweden, Copenhagen Football Team, ELF Team Denmark, ELF Team Sweden, ELF Team Nordic, ELF Team Copenhagen"
        />
        <meta property="og:title" content="Nordic Storm" />
        <meta
          property="og:description"
          content="Nordic Storm, the newest team in the European League of Football."
        />
        <meta property="og:image" content="/assets/primary_logo-oczmX7WM.png" />
        <meta property="og:type" content="website" />
      </Helmet>
      {loading ? (
        <div className="loading">
          <div className="loading__spinner"></div>
        </div>
      ) : (
        <div className="homepage">
          <div className="homepage__hero">
            <img
              src={news[0].articleImage}
              alt={news[0].title}
              className="cover_photo"
            />
          </div>
        </div>
      )}
    </HelmetProvider>
  );
};

export default Home;
