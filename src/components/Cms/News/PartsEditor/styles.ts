import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  partContainer: {
    border: "1px solid #ccc",
    padding: "20px",
    marginBottom: "20px",
    backgroundColor: "#f9f9f9",
    width: "100%",
  },
  partHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  partTitle: {
    margin: 0,
  },
  partActions: {
    display: "flex",
    gap: "10px",
  },
  removeButton: {
    padding: "6px 12px",
    fontSize: "14px",
    cursor: "pointer",
    border: "none",
    backgroundColor: "#dc3545",
    color: "#fff",
  },
  moveButton: {
    padding: "6px 12px",
    fontSize: "14px",
    cursor: "pointer",
    border: "none",
    backgroundColor: "#6c757d",
    color: "#fff",
  },
  fieldGroup: {
    marginBottom: "15px",
  },
  htmlFieldGroup: {
    height: "700px",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "8px",
    boxSizing: "border-box",
  },
  select: {
    width: "100%",
    padding: "8px",
    boxSizing: "border-box",
  },
  fileInput: {
    width: "100%",
    padding: "8px",
    boxSizing: "border-box",
  },
  partImage: {
    maxWidth: "100%",
    marginTop: "10px",
  },
  quill: {
    height: "200px",
    marginBottom: "100px",
    backgroundColor: "#fff",
  },
};

export default styles;
