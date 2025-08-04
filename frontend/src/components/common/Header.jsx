import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Header() {
  return (
    <>
      {['md'].map((expand) => (
        <header>
        <Navbar key={expand} expand={expand} className="shadow">
          <Container fluid>
            <Navbar.Brand className="m-2" href="#home">
            <img
              src="/public/images/logo.svg"
              height="60"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">Accueil</Nav.Link>
                  <Nav.Link href="#action2">Artisans</Nav.Link>
                  <NavDropdown
                    title="Catégories"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}>
                    <NavDropdown.Item href="#action3">Bâtiment</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">Services</NavDropdown.Item>
                    <NavDropdown.Item href="#action3">Fabrication</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">Alimentation</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">Toutes les catégories</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Mon artisan..."
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-info">Trouver</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        </header>
      ))}
    </>
  );
}

export default Header;