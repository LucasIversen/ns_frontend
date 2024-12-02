import { CSSProperties } from "react";
import { colors } from "../../assets/colors";

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "120px 50px 50px 50px",
    flexDirection: "column",
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
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    gap: "10px",
    padding: "10px 20px",
  },
  paginationButton: {
    padding: "10px",
    color: colors.darkBlue,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
  },
  pageNumber: {
    fontSize: "18px",
    color: colors.darkBlue,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Montserrat, sans-serif",
  },
};

export default styles;
