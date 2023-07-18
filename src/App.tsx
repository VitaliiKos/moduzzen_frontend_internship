import {FC} from 'react';
import {Route, Routes} from "react-router-dom";

import {MainLayout} from './Layouts';
import {
    HomePage,
    PageNotFound,
    AboutPage,
    RegisterPage,
    AuthorizationPage,
    CompaniesListPage,
    CompanyProfilePage,
    UsersListPage,
    UserProfilePage
} from './Pages';
import {RouterEndpoints} from './routes';

const App: FC = () => {
    return (
        <div className="App">
            <Routes>
                <Route path={RouterEndpoints.index} element={<MainLayout/>}>
                    <Route path={RouterEndpoints.index} index element={<HomePage/>}/>
                    <Route path={RouterEndpoints.about} element={<AboutPage/>}/>

                    <Route path={RouterEndpoints.users} element={<UsersListPage/>}>
                        <Route path={RouterEndpoints.id} element={<UserProfilePage/>}/>
                    </Route>

                    <Route path={RouterEndpoints.company} element={<CompaniesListPage/>}>
                        <Route path={RouterEndpoints.id} element={<CompanyProfilePage/>}/>
                    </Route>

                    <Route path={RouterEndpoints.authorization} element={<AuthorizationPage/>}/>
                    <Route path={RouterEndpoints.registration} element={<RegisterPage/>}/>

                    <Route path={RouterEndpoints.notFound} element={<PageNotFound/>}/>

                </Route>
            </Routes>
        </div>
    );
}

export {App};
