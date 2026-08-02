function ConfirmModal({ body, confirmLabel, onClose, onConfirm, open, title }) {
  if (!open) return null;
  return (
    <div className="dashboard-modal-backdrop">
      <div className="dashboard-modal">
        <h2>{title}</h2>
        <p>{body}</p>
        <div className="dashboard-form-actions">
          <button className="dashboard-secondary-btn" onClick={onClose} type="button">Cancel</button>
          <button className="dashboard-danger-btn" onClick={onConfirm} type="button">{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
