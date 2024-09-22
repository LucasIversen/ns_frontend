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

function App() {
  return (
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
  );
}

export default App;
