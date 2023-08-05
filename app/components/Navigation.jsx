import { Link, NavLink, useSubmit } from "@remix-run/react";
import {
  FaHome,
  FaCoffee,
  FaSignOutAlt,
  FaUserCog,
  FaEdit,
} from "react-icons/fa";
// Bootstrap
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
// import Button from "react-bootstrap/Button";

export default function Navigation() {
  const submit = useSubmit();

  const handleLogout = () => {
    submit(null, { method: "post", action: "/logout" });
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        bg="light"
        expand="sm"
        sticky="top"
        className="bg-body-tertiary shadow-sm rounded mb-2"
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <FaHome />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Offcanvas placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <hr />
              {/* Left side Nav */}
              {/* -------------- */}
              <Nav className="me-auto">
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {/* Posts */}
                  <Nav.Link as={NavLink} to="posts">
                    Posts
                  </Nav.Link>
                  {/* Forms */}
                  <NavDropdown title="Forms">
                    <NavDropdown.Item as={NavLink} to="forms/input-form">
                      Input Form
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="forms/preload-form">
                      Preloaded Form
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action4">Form 3</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Nav>
              {/* Right side Nav */}
              {/* ------------- */}
              <Nav>
                {/* Info */}
                <Nav.Link as={NavLink} to="info">
                  Info
                </Nav.Link>
                {/* Perfil */}
                <NavDropdown
                  align="end"
                  title={<FaCoffee size={22} style={{ color: "DarkOrange" }} />}
                >
                  <NavDropdown.Item as={NavLink} to="perfil">
                    <FaUserCog /> &nbsp;Mi Perfil
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="pass">
                    <FaEdit /> &nbsp;Cambiar Contraseña
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    <FaSignOutAlt /> &nbsp;Cerrar Sesión
                  </NavDropdown.Item>
                  {/* <RemixForm action="/logout" method="post">
                    <button type="submit">
                      <FaSignOutAlt /> &nbsp;Cerrar Sesión
                    </button>
                  </RemixForm> */}
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
