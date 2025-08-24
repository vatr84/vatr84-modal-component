import { memo, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

// Modal component displays a dialog overlay with fade animation and accessibility features.

/**
 * Modal React component for displaying overlay dialogs.
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Controls whether the modal is open
 * @param {function} props.onClose - Function called when modal is closed
 * @param {React.ReactNode} props.children - Content to display inside the modal
 * @param {string} [props.title="Success!"] - Title displayed at the top of the modal
 * @param {string} [props.closeText="Close"] - Text for the close button
 * @param {number} [props.maxWidth=null] - Maximum width of the modal in pixels
 * @param {string} [props.className=""] - Additional CSS class names for the modal content
 * @param {number} [props.fadeDuration=300] - Duration of fade animation in milliseconds
 * @returns {JSX.Element|null} The modal dialog element, or null if not visible
 */
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
  // State to control modal visibility for fade animation
  const [isVisible, setIsVisible] = useState(false);
  // Ref for the overlay element
  const overlayRef = useRef(null);
  // Ref for the modal content element
  const contentRef = useRef(null);

  useEffect(() => {
    // Handle opening and closing with fade animation
    if (isOpen) {
      setIsVisible(true);
      // Prevent background scrolling when modal is open
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
      // Delay hiding modal for fade out effect
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = '';
      }, fadeDuration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, fadeDuration]);

  useEffect(() => {
    // Allow closing modal with Escape key for accessibility
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
    // Close modal when clicking outside the content (on overlay)
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