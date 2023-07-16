import {FC} from 'react';
import {useNavigate} from 'react-router-dom';

import css from './buttonNavigate.module.css';

interface IProps {
    navigate_params:string
}
const ButtonNavigate: FC<IProps> = ({navigate_params}) => {

    const navigate = useNavigate();

    return (
        <div className={css.closeWindow}>
            <button onClick={() => {
                navigate(navigate_params)
            }} className={css.buttonClose}>X
            </button>
        </div>);
};

export {ButtonNavigate};