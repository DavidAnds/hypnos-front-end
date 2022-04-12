import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';

import BackOffice from './Pages/BackOffice/BackOffice';

import AdminHome from './Pages/AdminHome/AdminHome';
import Managers from './Pages/AdminHome/Managers/Managers';
import DeleteManager from './Pages/AdminHome/DeleteManager/DeleteManager';
import CreateManager from './Pages/AdminHome/CreateManager/CreateManager';
import Manager from './Pages/AdminHome/Manager/Manager';
import Hotels from './Pages/AdminHome/Hotels/Hotels';
import Hotel from './Pages/AdminHome/Hotel/Hotel';
import DeleteHotel from './Pages/AdminHome/DeleteHotel/DeleteHotel';
import CreateHotel from './Pages/AdminHome/CreateHotel/CreateHotel';

import ManagerHome from './Pages/ManagerHome/ManagerHome';
import MyProfil from './Pages/ManagerHome/MyProfil/MyProfil';
import MyPassword from './Pages/ManagerHome/MyPassword/MyPassword';
import Suites from './Pages/ManagerHome/Suites/Suites';
import Suite from './Pages/ManagerHome/Suite/Suite';
import DeleteSuite from './Pages/ManagerHome/DeleteSuite/DeleteSuite';
import CreateSuite from './Pages/ManagerHome/CreateSuite/CreateSuite';
import Gallery from './Pages/ManagerHome/Gallery/Gallery';

import Home from './Pages/Home/Home';
import DisplayHotel from './Pages/DisplayHotel/DisplayHotel';
import DisplaySuite from './Pages/DisplaySuite/DisplaySuite';
import UserPage from './Pages/UserPage/UserPage';
import ReservationPage from './Pages/ReservationPage/ReservationPage';

function App() {
    return (
        <>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/:HotelName' element={<DisplayHotel />} />
                    <Route path='/:HotelName/:suiteId' element={<DisplaySuite />} />
                    <Route path='/reservation' element={<ReservationPage/>} />
                    <Route path='/connexion' element={<UserPage />} />

                    <Route path='/backOffice' element={<BackOffice />} />
                    <Route path='/backOffice/adminHome' element={<AdminHome />}>
                        <Route path='/backOffice/adminHome/managers' element={<Managers />} />
                        <Route path='/backOffice/adminHome/managers/delete/:id' element={<DeleteManager />} />
                        <Route path='/backOffice/adminHome/managers/create' element={<CreateManager />}/>
                        <Route path='/backOffice/adminHome/managers/:id' element={<Manager />}/>
                        <Route path='/backOffice/adminHome/hotels' element={<Hotels />}/>
                        <Route path='/backOffice/adminHome/hotels/:id' element={<Hotel />}/>
                        <Route path='/backOffice/adminHome/hotels/delete/:id' element={<DeleteHotel />}/>
                        <Route path='/backOffice/adminHome/hotels/create'element={<CreateHotel />}/>
                    </Route>
                    <Route path='/backOffice/managerHome' element={<ManagerHome />} >
                        <Route path='/backOffice/managerHome/monProfil' element={<MyProfil/>}/>
                        <Route path='/backOffice/managerHome/motDePasse' element={<MyPassword/>}/>
                        <Route path='/backOffice/managerHome/suites' element={<Suites/>}/>
                        <Route path='/backOffice/managerHome/suites/:id' element={<Suite/>}/>
                        <Route path='/backOffice/managerHome/suites/delete/:id' element={<DeleteSuite/>}/>
                        <Route path='/backOffice/managerHome/suites/create' element={<CreateSuite/>}/>
                        <Route path='/backOffice/managerHome/suites/gallery/:suiteId' element={<Gallery/>}/>
                    </Route>
                </Routes>
            </AuthProvider>
        </>
    );
}

export default App;
