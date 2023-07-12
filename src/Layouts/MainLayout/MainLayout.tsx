import {FC} from 'react';
import {Outlet} from 'react-router-dom';
import {Footer, Header} from '../../Components';
import css from './mainLayout.module.css';

const MainLayout: FC = () => {
    return (
        <div className={css.wrapper}>

            <div className={css.menu}>
                <Header/>
            </div>

            <div className={css.content}>
                <Outlet/>
            </div>

            <div className={css.footer}>
                <Footer/>
            </div>
        </div>
    );
};

export {MainLayout};