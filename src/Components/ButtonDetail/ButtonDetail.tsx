import {FC} from 'react';
import {useNavigate} from 'react-router-dom';

import css from './buttonDetail.module.css';

interface IProps {
    id: number
}

const ButtonDetail: FC<IProps> = ({id}) => {

    const navigate = useNavigate();

    return (
        <>
            <button className={css.button_detail} onClick={() => {
                navigate(`${id.toString()}`)
            }}>Get detail
            </button>
        </>
    );
};

export {ButtonDetail};