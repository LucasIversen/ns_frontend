import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewsOverview from "./components/NewsOverview";
import Home from "./components/Home";
import NoPage from "./components/NoPage";
import Layout from "./components/Layout";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="news" element={<NewsOverview />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
