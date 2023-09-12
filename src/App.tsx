import {FC} from 'react';
import {Route, Routes} from "react-router-dom";
import {RequiredAuth} from './hoc';

import {MainLayout} from './Layouts';
import {
    HomePage,
    PageNotFound,
    AboutPage,
    AuthorizationPage,
    CompaniesListPage,
    CompanyProfilePage,
    UsersListPage,
    UserDetailPage,
    UserProfilePage,
    RegisterPage,
    MyListCompanyPage,
    CompanyMembersPage,
    CompanyCandidatesPage,
    MyInvitesPage,
    MyRequestPage,
    CompanyRequestPage,
    FindCompany,
    CompanyAdminsPage,
    CompanyQuizzesPage,
    QuizDetailPage,
    AvaliableQuizzesPage
} from './Pages';
import {RouterEndpoints} from './routes';
import {CompanyInvitationsPage} from './Pages/CompanyInvitationsPage/CompanyInvitationsPage';
import {UserNotificatuions} from './Components';

const App: FC = () => {
    return (
        <div className="App">
            <Routes>
                <Route path={RouterEndpoints.index} element={<MainLayout/>}>
                    <Route path={RouterEndpoints.index} index element={<HomePage/>}/>


                    <Route path={RouterEndpoints.about} element={<AboutPage/>}/>

                    <Route path={RouterEndpoints.users} element={<RequiredAuth><UsersListPage/></RequiredAuth>}/>
                    <Route path={`${RouterEndpoints.users}/${RouterEndpoints.id}`}
                           element={<RequiredAuth><UserDetailPage/></RequiredAuth>}/>

                    <Route path={`${RouterEndpoints.profile}`} element={
                        <RequiredAuth>
                            <UserProfilePage/>
                        </RequiredAuth>
                    }/>
                    <Route path={`${RouterEndpoints.profile}/${RouterEndpoints.myInvites}`} element={
                        <RequiredAuth><MyInvitesPage/></RequiredAuth>}/>

                    <Route path={`${RouterEndpoints.profile}/${RouterEndpoints.myRequest}`} element={
                        <RequiredAuth><MyRequestPage/></RequiredAuth>}/>

                    <Route path={`${RouterEndpoints.profile}/${RouterEndpoints.myCompanies}`} element={
                        <RequiredAuth><MyListCompanyPage/></RequiredAuth>}/>

                    <Route path={`${RouterEndpoints.profile}/${RouterEndpoints.findCompany}`} element={
                        <RequiredAuth><FindCompany/></RequiredAuth>}/>

                    <Route path={`${RouterEndpoints.profile}/${RouterEndpoints.avaliable_quizzes}`} element={
                        <RequiredAuth><AvaliableQuizzesPage/></RequiredAuth>}/>

                    <Route path={`${RouterEndpoints.profile}/${RouterEndpoints.notification}`} element={
                        <RequiredAuth><UserNotificatuions/></RequiredAuth>}/>

                    <Route path={`${RouterEndpoints.profile}/${RouterEndpoints.myCompanies}/${RouterEndpoints.id}`}
                           element={<CompanyProfilePage/>}>
                        <Route path={'company_members'} element={<CompanyMembersPage/>}/>
                        <Route path={'company_candidates'} element={<CompanyCandidatesPage/>}/>
                        <Route path={'company_invites'} element={<CompanyInvitationsPage/>}/>
                        <Route path={'company_requests'} element={<CompanyRequestPage/>}/>
                        <Route path={'company_admins'} element={<CompanyAdminsPage/>}/>
                        <Route path={'company_quizzes'} element={<CompanyQuizzesPage/>}>
                            {/*<Route path={''} index element={<CompanyQuizzesPage/>}/>*/}
                            <Route path={':quiz_id'} element={<QuizDetailPage/>}/>
                        </Route>

                    </Route>
                    <Route path={RouterEndpoints.company} element={<RequiredAuth><CompaniesListPage/></RequiredAuth>}/>
                    <Route path={`${RouterEndpoints.company}/${RouterEndpoints.id}`} element={
                        <RequiredAuth>
                            <CompanyProfilePage/>
                        </RequiredAuth>
                    }/>

                    <Route path={RouterEndpoints.authorization} element={<AuthorizationPage/>}/>
                    <Route path={RouterEndpoints.registration} element={<RegisterPage/>}/>

                    <Route path={RouterEndpoints.notFound} element={<PageNotFound/>}/>

                </Route>
            </Routes>
        </div>
    )
        ;
}

export {
    App
};
