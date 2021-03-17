import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function nav() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>UET TreeGuard</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
      </Nav>
      <Nav className="mr-sm-2">
          <Nav.Link>Admin</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default nav;
