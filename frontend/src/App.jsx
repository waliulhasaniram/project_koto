import './App.css'
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import Home from './pages/Home'
import Navber from './navber/Navber'
import About from './pages/About'
import Contact from './pages/Contact'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile';
import AdminDashboard from './pages/admin/AdminDashboard';
import Logout from './pages/Logout';
import AdminAllUser from './pages/admin/AdminAllUser';
import AdminContacts from './pages/admin/AdminContacts';
import AdminUploadProduct from './pages/admin/AdminUploadsProduct';
import SingleProduct from './pages/SingleProduct';
import AdminProdcutUpdate from './pages/admin/AdminProdcutUpdate';
import AdminEditProduct from './pages/admin/AdminEditProduct';
import Footer from './pages/Footer';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navber />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/:id' element={<SingleProduct />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/logout' element={<Logout />}/>
          <Route path='/admin' element={<AdminDashboard />}>
              <Route path='admin-all-users' element={<AdminAllUser/>}/>
              <Route path='admin-contacts' element={<AdminContacts />}/>
              <Route path='admin-upload' element={<AdminUploadProduct />}/>
              <Route path='product-update' element={<AdminProdcutUpdate />}/>
              <Route path='edit-product/:id' element={<AdminEditProduct/>}/>
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
