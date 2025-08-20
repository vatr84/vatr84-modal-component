import { memo, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const Modal = memo(({
  isOpen,
  onClose,
  children,
  title = "Success!",
  closeText = "Close",
  maxWidth = null,
  className = "",
  fadeDuration = 300
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        if (overlayRef.current && contentRef.current) {
          overlayRef.current.classList.add(styles['modal-visible']);
          contentRef.current.classList.add(styles['modal-visible']);
        }
      }, 10);
      return () => clearTimeout(timer);
    } else {
      if (overlayRef.current && contentRef.current) {
        overlayRef.current.classList.remove(styles['modal-visible']);
        contentRef.current.classList.remove(styles['modal-visible']);
      }
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = '';
      }, fadeDuration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, fadeDuration]);

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      className={`${styles.modalOverlay}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{ '--fade-duration': `${fadeDuration}ms` }}
    >
      <div
        ref={contentRef}
        className={`${styles.modalContent} ${className}`}
        style={{
          maxWidth: maxWidth ? `${maxWidth}px` : undefined,
          '--fade-duration': `${fadeDuration}ms`
        }}
      >
        {title && <h2 id="modal-title">{title}</h2>}
        {children}
        <button
          className={styles.modalButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          {closeText}
        </button>
      </div>
    </div>
  );
});

Modal.displayName = "Modal";

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  title: PropTypes.string,
  closeText: PropTypes.string,
  maxWidth: PropTypes.number,
  className: PropTypes.string,
  fadeDuration: PropTypes.number
};

export default Modal;