import {FC} from 'react';
import {Route, Routes} from "react-router-dom";

import {MainLayout} from './Layouts';
import {HomePage, PageNotFound,  AboutPage} from './Pages';
import { RouterEndpoints } from './routes';

const App:FC = () => {
    return (
        <div className="App">
            <Routes>
                <Route path={'/'} element={<MainLayout/>}>
                    <Route path={RouterEndpoints.index} index element={<HomePage/>}/>
                    <Route path={RouterEndpoints.about} index element={<AboutPage/>}/>
                    <Route path={RouterEndpoints.notFound} element={<PageNotFound/>}/>

                </Route>
            </Routes>
        </div>
    );
}

export {App};
