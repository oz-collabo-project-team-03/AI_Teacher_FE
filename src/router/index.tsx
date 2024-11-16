import { Route, Routes } from 'react-router';

import DefaultLayout from '../layouts/defaultLayout';
import LoginPage from '../pages/auth/loginPage';
import MyPage from '../pages/myPage/myPage';
import RoleSelect from '../pages/auth/roleSelectPage';
import SignupCompletePage from '../pages/auth/signupCompletePage';
import SignupPage from '../pages/auth/signupPage';
import StudentLayout from '../layouts/studentLayout';
import TeacherLayout from '../layouts/teacherLayout';
import TermsOfServicePage from '../pages/auth/termsOfServicePage';

// import StudentChatListPage from '../pages/chat/studentChatListPage';

const Router = () => {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path='*' />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/my-page' element={<MyPage />} />
          <Route path='/member-agree' element={<TermsOfServicePage />} />
          <Route path='/role-selection' element={<RoleSelect />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/signup-complete' element={<SignupCompletePage />} />
        </Route>
        <Route element={<StudentLayout />}>
          {/* <Route path='/chat' element={<StudentChatListPage />} /> */}
        </Route>
        <Route element={<TeacherLayout />}>
          {/* <Route path='/chat1' element={<TeacherChatListPage />} /> */}
        </Route>
      </Routes>
    </>
  );
};
export default Router;
