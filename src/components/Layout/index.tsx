import { ReactNode } from "react";
import Header from "../../shared/NewHeader";
import { CSSProperties } from "react"; // Import CSSProperties from React
import Footer from "../../shared/Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div style={styles.pageWrapper}>
      <Header />
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
