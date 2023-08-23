import {FC} from 'react';

import css from './actionConfirmation.module.css';

interface IProps {
    onClose: () => void
    handleYes: () => void

}

const ActionConfirmation: FC<IProps> = ({handleYes, onClose}) => {
    return (
        <div className={css.modal_overlay}>
            <div className={css.modal_content}>
                <h3>Are you sure? </h3>
                <button onClick={handleYes}>YES</button>
                <button className={css.modal_close} onClick={onClose}> NO</button>
            </div>
        </div>
    );
};

export {ActionConfirmation};