import {FC, ReactNode} from 'react';

import css from './universalModalWindow.module.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const UniversalModalWindow: FC<ModalProps> = ({isOpen, onClose, children}) => {

    if (!isOpen) {
        return null;
    }

    return (
        <div className={css.modal_overlay}>
            <div className={css.modal_content}>
                <button className={css.modal_close} onClick={onClose}> X</button>
                {children}
            </div>
        </div>
    );
};

export {UniversalModalWindow};