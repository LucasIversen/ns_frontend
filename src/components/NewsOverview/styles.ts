import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "50px",
  },
  newsPage: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "50px",
    justifyItems: "center",
    alignItems: "center",
    maxWidth: "1200px",
    width: "100%",
  },
};

export default styles;
