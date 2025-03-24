import { Container, Nav, Navbar } from "react-bootstrap";

export default function AppNavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className="justify-content-center">
        <Navbar.Brand href="/" className="mx-auto">Pixel Turf</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
          <Nav>
            <Nav.Link href="/">Play</Nav.Link>
            <Nav.Link href="/battleLog">Battle Log</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
