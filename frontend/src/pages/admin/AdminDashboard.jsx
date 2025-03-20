import { useState } from "react";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <Wrapper>
      {/* 1) A toggle button that is always accessible */}
      <ToggleButton onClick={toggleSidebar}>
        <RiMenuUnfoldFill style={{color: "#000"}}/>
      </ToggleButton>

      <Sidebar className={isOpen ? "active" : ""}>
        <div className="panelHeader">
        </div>
        <ul>
          <li>
            <NavLink to="/admin/admin-all-users" className={({ isActive }) => (isActive ? "active" : "")} onClick={toggleSidebar}> Users </NavLink>
          </li>
          <li>
            <NavLink to="/admin/admin-contacts" className={({ isActive }) => (isActive ? "active" : "")} onClick={toggleSidebar}> contacts </NavLink>
          </li>
          <li>
            <NavLink to="/admin/admin-upload" className={({ isActive }) => (isActive ? "active" : "")} onClick={toggleSidebar}> Upload Product </NavLink>
          </li>
          <li>
            <NavLink to="/admin/product-update" className={({ isActive }) => (isActive ? "active" : "")} onClick={toggleSidebar}> Update Product </NavLink>
          </li>
        </ul>
      </Sidebar>

      <MainContent>
        <Header>
          <h1>KoTo Admin Dashboard</h1>
          <p>choose an option to see data</p>
        </Header>
        <ContentArea>
          <Outlet />
        </ContentArea>
      </MainContent>
    </Wrapper>
  );
};

export default AdminDashboard;

/* --------------- STYLED COMPONENTS --------------- */

const Wrapper = styled.section`
  /* We can use flex if desired, but not strictly required.
     Position relative so absolutely positioned children can overlay. */
  display: flex;
  position: relative;
  min-height: 100vh;
  background-color: #f5f6fa;
`;

/* A button that’s always visible so the sidebar can be opened. */
const ToggleButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 999; /* Above the sidebar */
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 1.2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #eee;
  }
`;

/* The sidebar is absolutely positioned so it won't take up space
   when off-screen. It overlays the main content on small screens. */
const Sidebar = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0; /* Fill the height if you want a full vertical panel */
  width: 200px;

  background: #2c3e50;
  color: white;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);

  /* Start hidden off the screen */
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 998;

  /* Slide in when .active is applied */
  &.active {
    transform: translateX(0);
  }

  ul {
    list-style: none;
    margin: 3rem 0 0 0;
    padding: 0;
  }

  li {
    margin-bottom: 1rem;
  }

  a{
    color: white;
    font-weight: bold;
  }

  a.active {
    color: rgb(26, 176, 202);
    font-weight: bold;
  }

  .panelHeader {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
`;

const MainContent = styled.main`
  /* Fills the remaining space, unaffected by the hidden sidebar */
  flex: 1;
  padding: 30px;
`;

const Header = styled.header`
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;

  h1 {
    text-align: center;
    color: #2c3e50;
    margin: 0;
  }
`;

const ContentArea = styled.div`
  background: white;
  color: #2c3e50;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
