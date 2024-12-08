import { ReactNode, useEffect, useState } from "react";
import Header from "../../shared/NewHeader";
import { CSSProperties } from "react"; // Import CSSProperties from React
import Footer from "../../shared/Footer";
import MobileHeader from "../../shared/MobileHeader";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component is unmounted
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={styles.pageWrapper}>
      {windowWidth <= 920 ? <MobileHeader /> : <Header />}
      <main style={styles.content}>{children}</main>
      <Footer />
    </div>
  );
};

// Define styles using CSSProperties
const styles: { [key: string]: CSSProperties } = {
  pageWrapper: {
    display: "flex",
    flexDirection: "column", // TypeScript will recognize this correctly
    minHeight: "100vh",
  },
  content: {
    flex: 1, // Allows content to stretch
  },
};

export default Layout;
