import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  tabSelector: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    marginTop: "80px",
  },
  tab: {
    padding: "10px 20px",
    cursor: "pointer",
    backgroundColor: "#f0f0f0",
    borderRadius: "5px",
    margin: "0 10px",
  },
  tabSelected: {
    padding: "10px 20px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    borderRadius: "5px",
    margin: "0 10px",
    color: "#ffffff",
  },
  tabContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  tabContentDevin: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "100px",
  },
};

export default styles;
