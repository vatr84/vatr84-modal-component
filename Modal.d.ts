import { ReactNode } from 'react';


export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
    title?: string;
    closeText?: string;
    maxWidth?: string | number;
    className?: string;
    fadeDuration?: number;
}

declare function Modal(props: ModalProps): React.ReactElement;
export default Modal;
