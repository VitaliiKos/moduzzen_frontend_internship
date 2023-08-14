import {FC} from 'react';

import css from './universalModalWindow.module.css';

interface IProps {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;


}

const UniversalModalWindow: FC<IProps> = ({visible, onClose, children}) => {

    if (!visible) {
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