import { useState, useEffect } from 'react';
import { useAuth } from '../store/productContext';
import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import { GiHamburgerMenu } from "react-icons/gi";
import { MdAccountCircle } from "react-icons/md";


const Navber = () => {
  const {IsLoggedIn, loggedInUser} = useAuth()
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if(offset > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggolMepu =()=>{
        setIsMenuOpen(!isMenuOpen)
    }
  
  return (
    <Wraper $isScrolled={isScrolled}>
    <nav className="nav-container">
      <div><NavLink to="/"><img src="/Koto.png" alt="koto logo" width={170}/></NavLink></div>
      

      <div className='menubar'>

        <div className="menu-container">
          <div className="icon-wrapper" onClick={toggolMepu}>
            <GiHamburgerMenu className="menu-icon" />
            <MdAccountCircle className="profile-icon" />
          </div>
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
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: large;
  position: fixed; /* Changed to fixed */
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: ${props => props.$isScrolled ? '#ffffff70' : 'white'};
  transition: all 0.3s ease-in-out;
  box-shadow: ${props => props.$isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
  backdrop-filter: ${props => props.$isScrolled ? 'blur(10px)' : 'none'};
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
  color: rgb(241, 38, 65);
  font-weight: bold;
}

/////////////////////////
.menu-container {
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 3px 1px 3px 6px;
  border-radius: 25px;
  transition: all 0.2s ease;
  border: 1px solid #dddddd;
  background-color: white;

  &:hover {
    box-shadow: 0 2px 4px rgba(0,0,0,0.18);
  }
}

.icon-wrapper {
  display: flex;
  align-items: center;
  position: relative;

  &::after {
    content: '';
    height: 20px;
    border-left: 1px solid #dddddd;
    margin-left: 8px;
  }
}

.menu-icon {
  width: 20px;
  height: 20px;
  padding: 10px;
  stroke-width: 2px;
  color: #000000;
  transition: all 0.2s ease;
  border-radius: 50%;

  &:hover {
    background-color: #f7f7f7;
  }
}

.profile-icon {
  width: 32px;
  height: 32px;
  color: #717171;
  border-radius: 70%;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f7f7f7;
  }
}

@media (max-width: 600px) {
  .menu-container {
    padding: 3px 0px 3px 8px;
  }
  
  .menu-icon {
    width: 18px;
    height: 18px;
    padding: 8px;
    margin-right: 2px;
  }
  
  .profile-icon {
    width: 25px;
    height: 25px;
  }
}
`

export default Navber;
