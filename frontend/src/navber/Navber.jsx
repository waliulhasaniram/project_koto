import { useState } from 'react';
import { useAuth } from '../store/productContext';
import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import { GiHamburgerMenu } from "react-icons/gi";

const Navber = () => {
  const {IsLoggedIn, loggedInUser} = useAuth()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggolMepu =()=>{
        setIsMenuOpen(!isMenuOpen)
    }
  
  return (
    <Wraper>
    <nav className="nav-container">
      <div><NavLink to="/"><img src="/public/koto.png" alt="koto logo" width={170}/></NavLink></div>
      

      <div className='menubar'>
        <div className="menu" onClick={toggolMepu}>
          <GiHamburgerMenu onClick={toggolMepu}/>
        </div>
        <ul className={isMenuOpen ? "navList active" : "navList"}>
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} onClick={toggolMepu}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""} onClick={toggolMepu}>About</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""} onClick={toggolMepu}>Contact</NavLink>
            </li>

          {IsLoggedIn ? 
              loggedInUser && loggedInUser.isAdmin ? (
                  <>
                    <li><NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""} onClick={toggolMepu}>Profile</NavLink></li>
                    <li><NavLink to="/admin" className={({ isActive }) => isActive ? "active" : ""} onClick={toggolMepu}>Admin</NavLink></li>
                    <li><NavLink to="/logout" className={({ isActive }) => isActive ? "active" : ""} onClick={toggolMepu}>Logout</NavLink></li>
                  </>
                ) : (
                  <>
                    <li><NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""} onClick={toggolMepu}>Profile</NavLink></li>
                    <li><NavLink to="/logout" className={({ isActive }) => isActive ? "active" : ""} onClick={toggolMepu}>Logout</NavLink></li>
                  </>
                    ) 
              : (<>
                  <li><NavLink to="/register" className={({ isActive }) => isActive ? "active" : ""} onClick={toggolMepu}>Register</NavLink></li>
                  <li><NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""} onClick={toggolMepu}>Login</NavLink></li>
              </>)}

        </ul>
      </div>
    </nav>
    </Wraper>
  );
}

const Wraper = styled.section`
.title {
  margin-left: 50px;
  font-size: xx-large;
  color: #ffffff;
}

.nav-container {
  width: 100%;
  display: flex;
  justify-content: space-between; /* Title on left, menu on right */
  align-items: center;           /* Vertically center them */
  font-size: large;
  position: relative;
  height: 60px;
  background-image: linear-gradient(to right, #3792e7, #3cb4fa, #1e7cf8);
}

.menubar {
  /* Make .menubar a positioned container */
  position: relative;
  padding-right: 40px;
  font-size: large;
}

/* The menu is hidden by default */
.navList {
  display: none;
  flex-direction: column;
  /* Position absolutely so it won't enlarge the parent */
  position: absolute;
  top: 50px;   /* Adjust if needed */
  right: 5px;
  left: -40px;
  background-color: #f5f5f5; 
  
  margin-right: 1rem;          
  box-shadow: 0 2px 5px rgba(0,0,0,0.2); /* Optional drop shadow */
  z-index: 999;           /* Ensures it appears above other elements */
}

/* When active, display the menu */
.navList.active {
  display: flex;
}

ul {
  list-style: none;
  display: flex;
  gap: 1rem;
}

a.active {
  color: rgb(26, 176, 202);
  font-weight: bold;
}

.menu {
  margin: 20px;
  display: block;
  text-align: end;
  font-size: x-large;
  color: #f5f5f5;
}
`

export default Navber;