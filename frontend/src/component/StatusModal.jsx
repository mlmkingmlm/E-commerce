import { useState } from "react";

// ─── Icon components ──────────────────────────────────────────────────────────
const CheckIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const EditIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─── Theme config per action ──────────────────────────────────────────────────
const ACTION_CONFIG = {
  add: {
    accentBar: "#22c55e",
    iconBg: "#dcfce7",
    iconColor: "#16a34a",
    modalBg: "#f0fdf4",
    titleColor: "#14532d",
    subtitleColor: "#4ade80",
    metaBg: "#dcfce7",
    metaBorder: "#bbf7d0",
    metaText: "#166534",
    metaValColor: "#15803d",
    primaryBg: "#16a34a",
    primaryColor: "#fff",
    primaryHover: "#15803d",
    ghostBorder: "#bbf7d0",
    ghostColor: "#15803d",
    ghostHoverBg: "#dcfce7",
    label: "Added",
    icon: <CheckIcon />,
    title: (module, name) => `${module} added successfully!`,
    subtitle: (module, name) => `"${name}" is now live and visible to customers.`,
    primaryBtn: "View list",
    secondaryBtn: "Add another",
  },
  edit: {
    accentBar: "#f59e0b",
    iconBg: "#fef3c7",
    iconColor: "#d97706",
    modalBg: "#fffbeb",
    titleColor: "#78350f",
    subtitleColor: "#fbbf24",
    metaBg: "#fef3c7",
    metaBorder: "#fde68a",
    metaText: "#78350f",
    metaValColor: "#92400e",
    primaryBg: "#d97706",
    primaryColor: "#fff",
    primaryHover: "#b45309",
    ghostBorder: "#fde68a",
    ghostColor: "#92400e",
    ghostHoverBg: "#fef3c7",
    label: "Updated",
    icon: <EditIcon />,
    title: (module, name) => `${module} updated successfully!`,
    subtitle: (module, name) => `Changes to "${name}" have been saved.`,
    primaryBtn: "View list",
    secondaryBtn: "Edit another",
  },
  delete: {
    accentBar: "#ef4444",
    iconBg: "#fee2e2",
    iconColor: "#dc2626",
    modalBg: "#fff1f2",
    titleColor: "#7f1d1d",
    subtitleColor: "#f87171",
    metaBg: "#fee2e2",
    metaBorder: "#fecaca",
    metaText: "#7f1d1d",
    metaValColor: "#991b1b",
    primaryBg: "#dc2626",
    primaryColor: "#fff",
    primaryHover: "#b91c1c",
    ghostBorder: "#fecaca",
    ghostColor: "#b91c1c",
    ghostHoverBg: "#fee2e2",
    label: "Deleted",
    icon: <TrashIcon />,
    title: (module, name) => `${module} deleted!`,
    subtitle: (module, name) => `"${name}" has been permanently removed.`,
    primaryBtn: "View list",
    secondaryBtn: "Undo",
  },
  error: {
    accentBar: "#ef4444",
    iconBg: "#fee2e2",
    iconColor: "#dc2626",
    modalBg: "#fff1f2",
    titleColor: "#7f1d1d",
    subtitleColor: "#f87171",
    metaBg: "#fee2e2",
    metaBorder: "#fecaca",
    metaText: "#7f1d1d",
    metaValColor: "#991b1b",
    primaryBg: "#dc2626",
    primaryColor: "#fff",
    primaryHover: "#b91c1c",
    ghostBorder: "#fecaca",
    ghostColor: "#b91c1c",
    ghostHoverBg: "#fee2e2",
    label: "Failed",
    icon: <CloseIcon />,
    title: (module, name) => `${module} failed!`,
    subtitle: (module, name) => `Something went wrong while processing "${name}".`,
    primaryBtn: "Close",
    secondaryBtn: "",
  },
  duplicate: {
    accentBar: "#f59e0b",
    iconBg: "#fef3c7",
    iconColor: "#d97706",
    modalBg: "#fffbeb",
    titleColor: "#78350f",
    subtitleColor: "#fbbf24",
    metaBg: "#fef3c7",
    metaBorder: "#fde68a",
    metaText: "#78350f",
    metaValColor: "#92400e",
    primaryBg: "#d97706",
    primaryColor: "#fff",
    primaryHover: "#b45309",
    ghostBorder: "#fde68a",
    ghostColor: "#92400e",
    ghostHoverBg: "#fef3c7",
    label: "Duplicate",
    icon: <CloseIcon />, // ya EditIcon bhi use kar sakte ho
    title: (module, name, duplicateCol) => `${duplicateCol} already exists!`,
    subtitle: (module, name, duplicateCol) => `"${name}" is already registered. Try a different one.`,
    primaryBtn: "Close",
    secondaryBtn: "",
  },
  success: {
  accentBar: "#22c55e",
  iconBg: "#dcfce7",
  iconColor: "#16a34a",
  modalBg: "#f0fdf4",
  titleColor: "#14532d",
  subtitleColor: "#4ade80",
  metaBg: "#dcfce7",
  metaBorder: "#bbf7d0",
  metaText: "#166534",
  metaValColor: "#15803d",
  primaryBg: "#16a34a",
  primaryColor: "#fff",
  primaryHover: "#15803d",
  ghostBorder: "#bbf7d0",
  ghostColor: "#15803d",
  ghostHoverBg: "#dcfce7",
  label: "Success",
  icon: <CheckIcon />,
  title: (module, name) => `${module} successful!`,
  subtitle: (module, name) => `${name ? `${name} ` : ""} Registration completed successfully.`,
  primaryBtn: "Continue",
  secondaryBtn: "",
},
};

// ─── Module tag colors ────────────────────────────────────────────────────────
const MODULE_COLORS = {
  Category: { bg: "#dbeafe", color: "#1e3a8a" },
  Subcategory: { bg: "#ede9fe", color: "#4c1d95" },
  Brand: { bg: "#d1fae5", color: "#065f46" },
  Product: { bg: "#fce7f3", color: "#831843" },
  // Add more modules here as needed
};

const USER_ACTION_CONFIG = {
  success: {
    title: (module, name) => "Success!",
    subtitle: (module, name) => `${name ? `Hi ${name}, ` : ""}operation completed successfully.`,
    primaryBtn: "Continue",
  },
  duplicate: {
    title: (module, name, duplicateCol) => `${duplicateCol || "User"} already exists`,
    subtitle: () => `Try logging in instead.`,
    primaryBtn: "Go to Login",
  },
  error: {
    title: () => "Something went wrong",
    subtitle: () => "Please try again later.",
    primaryBtn: "Close",
  },
  purchase: {
    title: () => "Order placed successfully 🎉",
    subtitle: () => "Your order has been confirmed.",
    primaryBtn: "View Orders",
  }
};

// ─── AdminFeedbackModal ───────────────────────────────────────────────────────
/**
 * Generic admin feedback modal.
 *
 * Props:
 *  - isOpen   {boolean}                        — controls visibility
 *  - onClose  {() => void}                     — called when modal is dismissed
 *  - action   {'add' | 'edit' | 'delete'}      — determines color theme & copy
 *  - module   {string}                         — e.g. 'Category', 'Brand'
 *  - name     {string}                         — the record name, e.g. 'Electronics'
 *  - meta     {Array<{key: string, value: string}>} — optional extra rows
 *  - onPrimary   {() => void}                  — primary button handler
 *  - onSecondary {() => void}                  — secondary button handler
 *  - primaryLabel   {string}                   — override primary button text
 *  - secondaryLabel {string}                   — override secondary button text
 */
export function GlobalModal({
  isOpen,
  onClose,
  action = "add",
  module = "Category",
  name = "",
  meta = [],
  onPrimary,
  onSecondary,
  primaryLabel,
  secondaryLabel,
  duplicateCol,
  variant = "admin",
}) {
  const [primaryHovered, setPrimaryHovered] = useState(false);
  const [ghostHovered, setGhostHovered] = useState(false);

  if (!isOpen) return null;

  const cfg =
    variant === "user"
      ? { ...ACTION_CONFIG[action], ...USER_ACTION_CONFIG[action] }
      : ACTION_CONFIG[action] || ACTION_CONFIG.add;
  const modColor = MODULE_COLORS[module] || { bg: "#f1f5f9", color: "#334155" };

  const timestamp = new Date().toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  const defaultMeta = [
    { key: "Module", value: module },
    { key: "Record name", value: name },
    { key: "Action", value: cfg.label },
    { key: "Timestamp", value: timestamp },
  ];

  const metaRows = meta.length > 0 ? meta : defaultMeta;

  const handlePrimary = () => { onPrimary?.(); onClose(); };
  const handleSecondary = () => { onSecondary?.(); onClose(); };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(15,23,42,0.45)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 1050,
          animation: "fadeIn .18s ease",
        }}
      >
        {/* Modal card — stop click propagation */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "100%", maxWidth: 380,
            margin: "0 16px",
            background: cfg.modalBg,
            borderRadius: 18,
            overflow: "hidden",
            animation: "popIn .22s cubic-bezier(.34,1.56,.64,1)",
            fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
          }}
        >
          {/* Accent bar */}
          <div style={{ height: 5, background: cfg.accentBar }} />

          {/* Close button */}
          <div style={{ display: "flex", justifyContent: "flex-end", padding: "12px 14px 0" }}>
            <button
              onClick={onClose}
              style={{
                background: "transparent", border: "none",
                cursor: "pointer", padding: 4, borderRadius: 6,
                color: cfg.titleColor, opacity: 0.5,
                display: "flex", alignItems: "center",
              }}
            >
              <CloseIcon />
            </button>
          </div>

          {/* Header */}
          <div style={{ padding: "0 24px 0", textAlign: "center" }}>
            {/* Icon circle */}
            <div style={{
              width: 68, height: 68, borderRadius: "50%",
              background: cfg.iconBg, color: cfg.iconColor,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 14px",
            }}>
              {cfg.icon}
            </div>

            {/* Module tag */}
            <span style={{
              display: "inline-block",
              background: modColor.bg, color: modColor.color,
              fontSize: 11, fontWeight: 600,
              padding: "3px 11px", borderRadius: 20,
              marginBottom: 10, letterSpacing: ".02em",
            }}>
              {module}
            </span>

            {/* Title */}
            <h2 style={{
              margin: "0 0 6px", fontSize: 17, fontWeight: 700,
              color: cfg.titleColor, lineHeight: 1.3,
            }}>
              {cfg.title(module, name, duplicateCol)}
            </h2>

            {/* Subtitle */}
            <p style={{
              margin: "0 0 20px", fontSize: 13,
              color: cfg.subtitleColor, lineHeight: 1.5,
            }}>
              {cfg.subtitle(module, name, duplicateCol)}
            </p>
          </div>

          {/* Meta box */}
          <div style={{ padding: "0 20px 20px" }}>
            <div style={{
              background: cfg.metaBg,
              border: `1px solid ${cfg.metaBorder}`,
              borderRadius: 10,
              padding: "10px 14px",
            }}>
              {metaRows.map((row, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", padding: "6px 0",
                  borderBottom: i < metaRows.length - 1 ? `1px solid ${cfg.metaBorder}` : "none",
                }}>
                  <span style={{ fontSize: 12, fontWeight: 500, color: cfg.metaText, opacity: .7 }}>
                    {row.key}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: cfg.metaValColor }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer buttons */}
          <div style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            padding: "0 20px 22px",
          }}>

            {/* ❌ ERROR → only ONE button */}
            {action === "error" || action === "duplicate" || action === "success" ? (
              <button
                onClick={handlePrimary}
                onMouseEnter={() => setPrimaryHovered(true)}
                onMouseLeave={() => setPrimaryHovered(false)}
                style={{
                  width: "100%",
                  padding: "10px 0",
                  background: primaryHovered ? cfg.primaryHover : cfg.primaryBg,
                  border: "none",
                  borderRadius: 9,
                  fontSize: 13,
                  fontWeight: 600,
                  color: cfg.primaryColor,
                  cursor: "pointer",
                }}
              >
                {primaryLabel || "Close"}
              </button>
            ) : (
              <>
                {/* Secondary */}
                <button
                  onClick={handleSecondary}
                  onMouseEnter={() => setGhostHovered(true)}
                  onMouseLeave={() => setGhostHovered(false)}
                  style={{
                    flex: 1,
                    padding: "10px 0",
                    background: ghostHovered ? cfg.ghostHoverBg : "transparent",
                    border: `1.5px solid ${cfg.ghostBorder}`,
                    borderRadius: 9,
                    fontSize: 13,
                    fontWeight: 500,
                    color: cfg.ghostColor,
                    cursor: "pointer",
                  }}
                >
                  {secondaryLabel || cfg.secondaryBtn}
                </button>

                {/* Primary */}
                <button
                  onClick={handlePrimary}
                  onMouseEnter={() => setPrimaryHovered(true)}
                  onMouseLeave={() => setPrimaryHovered(false)}
                  style={{
                    flex: 1,
                    padding: "10px 0",
                    background: primaryHovered ? cfg.primaryHover : cfg.primaryBg,
                    border: "none",
                    borderRadius: 9,
                    fontSize: 13,
                    fontWeight: 600,
                    color: cfg.primaryColor,
                    cursor: "pointer",
                  }}
                >
                  {primaryLabel || cfg.primaryBtn}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes popIn  {
          from { opacity: 0; transform: scale(.88) translateY(12px) }
          to   { opacity: 1; transform: scale(1)  translateY(0) }
        }
      `}</style>
    </>
  );
}