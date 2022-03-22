import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import BackOffice from './Pages/BackOffice/BackOffice';
import AdminHome from './Pages/AdminHome/AdminHome';
import ManagerHome from './Pages/ManagerHome/ManagerHome';
import Home from './Pages/Home/Home';

function App() {
    return (
        <>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/backOffice' element={<BackOffice />} />
                    <Route path='/adminHome' element={<AdminHome />} />
                    <Route path='/managerHome' element={<ManagerHome/>} />
                </Routes>
            </AuthProvider>
        </>
    );
}

export default App;
