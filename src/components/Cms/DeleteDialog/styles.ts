import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  confirmDialog: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
  },
  confirmInnerDialog: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "5px",
    width: "300px",
    textAlign: "center",
  },
  confirmDialogText: {
    marginBottom: "20px",
  },
  confirmDialogButtons: {
    display: "flex",
    justifyContent: "space-between",
  },
  deleteDialogButton: {
    padding: "10px",
    backgroundColor: "#dc3545",
    color: "#ffffff",
    borderRadius: "5px",
    cursor: "pointer",
  },
  cancelDialogButton: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#ffffff",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default styles;
