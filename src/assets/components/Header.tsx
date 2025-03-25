import { Navbar, Nav, Container } from "react-bootstrap";

function Header() {

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 50, // Adjust for fixed navbar height
                behavior: "smooth",
            });
        }
    };

    return (
        <Navbar expand="lg" className="w-100 m-0 p-0" style={{ 
            backgroundColor: "#019689", 
            position: "fixed",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: "1000", 
        }}>
            <Container>
                <Navbar.Brand 
                    href="#home" 
                    className="text-white fs-3 fw-semibold text-center text-lg-start"
                >
                    BiteCheck <i className="fa-solid fa-cookie-bite"></i>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" style={{ backgroundColor: "white" }} />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto text-center text-lg-start">
                        <Nav.Link href="#about" className="text-white" onClick={() => scrollToSection("about")}>About</Nav.Link>
                        <Nav.Link href="#features" className="text-white">Downloads</Nav.Link>
                        <Nav.Link href="#contact" className="text-white">Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
