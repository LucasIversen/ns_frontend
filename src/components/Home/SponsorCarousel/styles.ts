import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  sponsorImageContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  sponsorImage: {
    height: "100px",
    width: "auto",
    objectFit: "contain",
    cursor: "pointer",
    borderRadius: "20px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
};

export default styles;
