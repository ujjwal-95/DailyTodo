// import React from "react";
// import "./Navbar.css";
// import Button from '@mui/material/Button';
// import NoteAddIcon from '@mui/icons-material/NoteAdd';
// import logo from "../assets/Todologo.png";

// const Navbar = ({ setShowForm, setShowAllTasks, handleLogout }) => {
//   return (
//     <nav className="sidebar">
//       <div className="logo">
//         <img src={logo} alt="Logo" className="logo-img" />
//       </div>
//       <ul className="nav-buttons">
//         <li>
//           <Button variant="contained" startIcon={<NoteAddIcon />} onClick={() => { setShowForm(true); setShowAllTasks(false); }}>Add Task</Button>
//         </li>
//         <li>
//           <Button variant="contained" onClick={() => { setShowForm(false); setShowAllTasks(false); }}>Today's Tasks</Button>
//         </li>
//         <li>
//           <Button variant="contained" onClick={() => { setShowForm(false); setShowAllTasks(true); }}>All Tasks</Button>
//         </li>
//         <li>
//           <Button variant="contained" color="error" onClick={handleLogout}>Logout</Button>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState } from "react";
import "./Navbar.css";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import logo from "../assets/Todologo.png";
import { IconButton, Drawer, List, ListItem } from "@mui/material";

const Navbar = ({ setShowForm, setShowAllTasks, handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update state when window resizes
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMenuOpen(false); // Auto-close menu on big screen
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (action) => {
    action();
    setMenuOpen(false); // Close menu on link click
  };

  return (
    <>
      {/* Mobile menu icon */}
      {isMobile && (
        <IconButton className="menu-icon" onClick={() => setMenuOpen(true)}>
          <MenuIcon fontSize="large" />
        </IconButton>
      )}

      {/* Sidebar for large screens & Drawer for mobile */}
      <Drawer
        anchor="left"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        className="mobile-nav"
      >
        <div className="sidebar">
          <div className="logo">
            <img src={logo} alt="Logo" className="logo-img" />
          </div>
          <List className="nav-buttons">
            <ListItem>
              <Button variant="contained" startIcon={<NoteAddIcon />} onClick={() => handleNavClick(() => { setShowForm(true); setShowAllTasks(false); })}>
                Add Task
              </Button>
            </ListItem>
            <ListItem>
              <Button variant="contained" onClick={() => handleNavClick(() => { setShowForm(false); setShowAllTasks(false); })}>
                Today's Tasks
              </Button>
            </ListItem>
            <ListItem>
              <Button variant="contained" onClick={() => handleNavClick(() => { setShowForm(false); setShowAllTasks(true); })}>
                All Tasks
              </Button>
            </ListItem>
            <ListItem>
              <Button variant="contained" color="error" onClick={() => handleNavClick(handleLogout)}>
                Logout
              </Button>
            </ListItem>
          </List>
        </div>
      </Drawer>

      {/* Sidebar for large screens */}
      {!isMobile && (
        <div className="sidebar desktop">
          <div className="logo">
            <img src={logo} alt="Logo" className="logo-img" />
          </div>
          <ul className="nav-buttons">
            <li>
              <Button variant="contained" startIcon={<NoteAddIcon />} onClick={() => { setShowForm(true); setShowAllTasks(false); }}>
                Add Task
              </Button>
            </li>
            <li>
              <Button variant="contained" onClick={() => { setShowForm(false); setShowAllTasks(false); }}>
                Today's Tasks
              </Button>
            </li>
            <li>
              <Button variant="contained" onClick={() => { setShowForm(false); setShowAllTasks(true); }}>
                All Tasks
              </Button>
            </li>
            <li>
              <Button variant="contained" color="error" onClick={handleLogout}>
                Logout
              </Button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;



