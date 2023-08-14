import {FC, useState} from 'react';
import {Outlet} from 'react-router-dom';

import {Footer, Header, UniversalModalWindow} from '../../Components';
import css from './mainLayout.module.css';

const MainLayout: FC = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={css.wrapper}>

            <div className={css.modalWindow}>
                <button className={css.modalWindowButton} onClick={openModal}>Open Modal</button>

                <UniversalModalWindow visible={isModalOpen} onClose={closeModal}>
                    <h2>Modal Content</h2>
                    <p>This is an example modal window.</p>
                </UniversalModalWindow>
            </div>

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