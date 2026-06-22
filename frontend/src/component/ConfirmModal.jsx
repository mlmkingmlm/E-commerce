import React from "react";

function ConfirmModal({ isOpen, onClose, onConfirm, moduleName, status }) {
  if (!isOpen) return null;

  const config = {
    confirm: {
      color: "#f59e0b",
      icon: "⚠️",
      title: "Are you sure?",
      message: `This action will permanently delete this ${moduleName}.`,
      btn: "Delete",
    },
    success: {
      color: "#10b981",
      icon: "✅",
      title: "Deleted!",
      message: `${moduleName} has been deleted successfully.`,
      btn: "Close",
    },
    error: {
      color: "#ef4444",
      icon: "❌",
      title: "Error!",
      message: `Failed to delete ${moduleName}. Try again.`,
      btn: "Close",
    },
  };

  const current = config[status];

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        
        {/* Close */}
        <button style={styles.close} onClick={onClose}>×</button>

        {/* Icon */}
        <div style={{ ...styles.icon, background: current.color }}>
          {current.icon}
        </div>

        {/* Title */}
        <h2 style={styles.title}>{current.title}</h2>

        {/* Message */}
        <p style={styles.message}>{current.message}</p>

        {/* Buttons */}
        <div style={styles.actions}>
          {status === "confirm" ? (
            <>
              <button style={styles.cancelBtn} onClick={onClose}>
                Cancel
              </button>
              <button
                style={{ ...styles.confirmBtn, background: current.color }}
                onClick={onConfirm}
              >
                {current.btn}
              </button>
            </>
          ) : (
            <button
              style={{ ...styles.confirmBtn, background: current.color }}
              onClick={onClose}
            >
              {current.btn}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(6px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },

  modal: {
    width: "380px",
    background: "#111827",
    color: "#fff",
    borderRadius: "16px",
    padding: "25px",
    textAlign: "center",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    position: "relative",
    animation: "scaleIn 0.3s ease",
  },

  close: {
    position: "absolute",
    top: "10px",
    right: "12px",
    background: "transparent",
    border: "none",
    color: "#aaa",
    fontSize: "20px",
    cursor: "pointer",
  },

  icon: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    margin: "0 auto 15px",
  },

  title: {
    margin: "10px 0",
    fontSize: "22px",
    fontWeight: "600",
  },

  message: {
    fontSize: "14px",
    color: "#9ca3af",
    marginBottom: "20px",
  },

  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },

  cancelBtn: {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "1px solid #374151",
    background: "transparent",
    color: "#ccc",
    cursor: "pointer",
  },

  confirmBtn: {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    color: "#fff",
    fontWeight: "500",
    cursor: "pointer",
  },
};