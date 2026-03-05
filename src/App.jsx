import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useContext } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import { ConfigProvider } from 'antd';
import { AuthContext } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';
import UsersList from './pages/UsersList';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import LogsList from './pages/LogsList';
import Events from './pages/Events';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';

function App() {
  const { token } = useContext(AuthContext);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#f7078b",
          colorInfo: "#f7078b",
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
           <Route path='events' element={<Events />} />
 
          {
            token &&
            <Route path='/' element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path='/user/add' element={<AddUser />} />
              <Route path='/user/edit/:id' element={<EditUser />} />
              <Route path='/user/list' element={<UsersList />} />
               <Route path='/logs/list' element={<LogsList />} />
                  <Route path='/profile' element={<Profile />} />
                    <Route path='/change-password' element={<ChangePassword />} />

            </Route>
          }

          {!token && <Route path='*' element={<Login />} />}
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App;