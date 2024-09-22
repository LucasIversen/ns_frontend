import Props from "./interfaces";
import styles from "./styles";

const DeleteDialog = (props: Props) => {
  return (
    <div>
      {props.open && (
        <dialog style={styles.confirmDialog} onClick={() => props.onClose()}>
          <div
            style={styles.confirmInnerDialog}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.confirmDialogText}>Er du sikker?</div>
            <div style={styles.confirmDialogButtons}>
              <button
                style={styles.cancelDialogButton}
                onClick={() => props.onClose()}
              >
                Annuller
              </button>
              <button
                style={styles.deleteDialogButton}
                onClick={() => props.onDelete()}
              >
                Slet
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default DeleteDialog;
