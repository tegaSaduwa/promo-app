import React, { useState, useEffect } from "react";
import "./navbar.style.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Dropdown,
  FormText,
} from "reactstrap";

const NavMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    const mainUser = JSON.parse(sessionStorage.getItem("wm.auth"));
    //console.log(mainUser);
    setUser(mainUser);
  }, []);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const toggle2 = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const onClick = () => {
    localStorage.removeItem("wm.auth");
  };

  return (
    <div>
      <Navbar id="nav-bg" dark expand="md">
        <NavbarBrand href="#">
          {" "}
          <img
            src={process.env.PUBLIC_URL + "/images/wema-logo.PNG"}
            alt="wemalogo"
            id="wemalogo"
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              {user?.role === "User" && (
                <NavLink href="/promoportal/">PROMO PORTAL</NavLink>
              )}
            </NavItem>
            <NavItem>
              {user?.role === "Audit" && (
                <NavLink href="/audit-trail">AUDIT TRAIL</NavLink>
              )}
            </NavItem>
          </Nav>

          <Dropdown
            isOpen={dropdownOpen}
            toggle={toggle2}
            inNavbar
            style={{ backgroundColor: "#92137e" }}
          >
            <DropdownToggle
              style={{
                backgroundColor: "#92137e",
                border: "2px solid #92137e",
              }}
            >
              {user ? user?.displayName : null}
              <br></br>

              <small style={{ color: "white" }}>
                {user ? user?.department : null}
              </small>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>
                <a
                  href="/promoportal/login"
                  onClick={() => {
                    sessionStorage.removeItem("wm.auth");
                    window.location.href = `/promoportal/login`;
                  }}
                >
                  <i
                    className="fas fa-sign-out"
                    style={{ color: "purple" }}
                  ></i>
                  Log Out
                </a>
              </DropdownItem>
              {/* <NavLink href="/login" onClick={onClick}>
                <small>logout</small>
              </NavLink> */}
              <DropdownItem divider />
            </DropdownMenu>
          </Dropdown>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavMenu;
