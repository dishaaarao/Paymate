import './Modal.css';

const Modal = ({ isOpen, onClose, title, children, onConfirm, confirmText = 'Confirm', isLoading = false }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container animate-slide-up" onClick={(e) => e.stopPropagation()}>
                <header className="modal-header">
                    <h3 className="modal-title">{title}</h3>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </header>

                <div className="modal-body">
                    {children}
                </div>

                <footer className="modal-footer">
                    <button className="modal-btn cancel" onClick={onClose} disabled={isLoading}>Cancel</button>
                    <button
                        className={`modal-btn confirm ${isLoading ? 'loading' : ''}`}
                        onClick={onConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : confirmText}
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default Modal;
