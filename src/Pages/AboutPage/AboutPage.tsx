import {FC} from 'react';
import {ChangeString, Increment} from '../../Components';

import css from './aboutPage.module.css';

const AboutPage: FC = () => {

    return (
        <div>
            <h3>AboutPage</h3>
            <div className={css.increment}>
                <Increment/>
            </div>
            <div>

                <ChangeString/>
            </div>

        </div>
    );
};

export {AboutPage};