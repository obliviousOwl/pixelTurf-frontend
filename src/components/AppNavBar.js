import { Container, Nav, Navbar } from "react-bootstrap";
import { useLocation } from "react-router-dom"; 
import "../styles/AppNavBar.css";

export default function AppNavBar() {
  const location = useLocation();

  return (
    <Navbar expand="lg" className="app-navbar fixed-top">
      <Container>
        <Navbar.Brand href="/" className="navbar-brand">Color Clash</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" style={{ borderColor: "#fff" }}>
          <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }}></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto nav-links">
            <Nav.Link
              href="/play"
              className={`nav-item ${location.pathname === "/play" ? "active-tab" : ""}`}
            >
              Play
            </Nav.Link>
            <Nav.Link
              href="/battleLog"
              className={`nav-item ${location.pathname === "/battleLog" ? "active-tab" : ""}`}
            >
              Battle Log
            </Nav.Link>
            <Nav.Link
              href="/howToPlay"
              className={`nav-item ${location.pathname === "/howToPlay" ? "active-tab" : ""}`}
            >
              How To Play
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
