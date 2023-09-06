import {FC} from 'react';
import {useNavigate} from 'react-router-dom';

import css from './buttonNavigate.module.css';

interface IProps {
    navigate_params: string
    button_title: string
}

const ButtonNavigate: FC<IProps> = ({navigate_params, button_title}) => {

    const navigate = useNavigate();

    return (
        <div className={css.closeWindow}>
            <button onClick={() => {
                navigate(navigate_params)
            }} className={css.buttonClose}>{button_title}
            </button>
        </div>);
};

export {ButtonNavigate};