import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewsOverview from "./components/NewsOverview";
import Home from "./components/Home";
import NoPage from "./components/NoPage";
import Layout from "./components/Layout";
import "./App.css";
import News from "./components/News";
import MediaOverview from "./components/MediaOverview";
import Media from "./components/Media";
import FAQ from "./components/Faq";
import Investor from "./components/Investor";
import AboutUs from "./components/AboutUs";
import Cms from "./components/Cms";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import OnlineEvent from "./components/OnlineEvent";
import Roster from "./components/Roster";
import Schedule from "./components/Schedule";
import NewsletterUnsubscripe from "./components/NewsletterUnsubscripe";
import Cheer from "./components/Cheer";
import { CacheProvider } from "./shared/CacheContext";
import CheerPage from "./components/CheerPage";

function App() {
  return (
    <CacheProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route index element={<Home />} />
            <Route path="news" element={<NewsOverview />} />
            <Route path="news/:id" element={<News />} />
            <Route path="media" element={<MediaOverview />} />
            <Route path="media/:id" element={<Media />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="investor" element={<Investor />} />
            <Route path="about_us" element={<AboutUs />} />
            <Route path="online_event/:id" element={<OnlineEvent />} />
            <Route path="roster" element={<Roster />} />
            <Route path="schedule" element={<Schedule />} />
            <Route
              path="newsletter_unsubscripe"
              element={<NewsletterUnsubscripe />}
            />
            <Route path="cheer" element={<CheerPage />} />
            <Route path="login" element={<Login />} />
            <Route
              path="cms"
              element={
                <PrivateRoute>
                  <Cms />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CacheProvider>
  );
}

export default App;
