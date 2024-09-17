import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewsOverview from "./components/NewsOverview";
import Home from "./components/Home";
import NoPage from "./components/NoPage";
import Layout from "./components/Layout";
import "./App.css";
import News from "./components/News";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="news" element={<NewsOverview />} />
          <Route path="news/:id" element={<News />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
