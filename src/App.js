import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import BackOffice from './Pages/BackOffice/BackOffice';
import AdminHome from './Pages/AdminHome/AdminHome';
import ManagerHome from './Pages/ManagerHome/ManagerHome';
import Managers from './Pages/AdminHome/Managers/Managers';
import DeleteManager from './Pages/AdminHome/DeleteManager/DeleteManager';
import CreateManager from './Pages/AdminHome/CreateManager/CreateManager';
import Manager from './Pages/AdminHome/Manager/Manager';
import Hotels from './Pages/AdminHome/Hotels/Hotels';
import Hotel from './Pages/AdminHome/Hotel/Hotel';
import DeleteHotel from './Pages/AdminHome/DeleteHotel/DeleteHotel';
import CreateHotel from './Pages/AdminHome/CreateHotel/CreateHotel';
import Home from './Pages/Home/Home';

function App() {
    return (
        <>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/backOffice' element={<BackOffice />}/>
                    <Route
                            path='/backOffice/adminHome'
                            element={<AdminHome />}
                        >
                            <Route
                                path='/backOffice/adminHome/managers'
                                element={<Managers />}
                            />
                            <Route
                                path='/backOffice/adminHome/managers/delete/:id'
                                element={<DeleteManager />}
                            />
                            <Route
                                path='/backOffice/adminHome/managers/create'
                                element={<CreateManager />}
                            />
                            <Route
                                path='/backOffice/adminHome/managers/:id'
                                element={<Manager />}
                            />
                            <Route
                                path='/backOffice/adminHome/hotels'
                                element={<Hotels />}
                            />
                            <Route
                                path='/backOffice/adminHome/hotels/:id'
                                element={<Hotel />}
                            />
                            <Route
                                path='/backOffice/adminHome/hotels/delete/:id'
                                element={<DeleteHotel />}
                            />
                            <Route
                                path='/backOffice/adminHome/hotels/create'
                                element={<CreateHotel />}
                            />
                        </Route>
    
                    <Route path='/managerHome' element={<ManagerHome />} />
                </Routes>
            </AuthProvider>
        </>
    );
}

export default App;
