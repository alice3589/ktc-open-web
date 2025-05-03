import { Navbar, Nav, Container } from 'react-bootstrap';
import { ContentType } from './types';

interface CustomNavbarProps {
  onSelect: (type: ContentType) => void;
}

export const CustomNavbar = ({ onSelect }: CustomNavbarProps) => (
  <Navbar bg="light" expand="lg" className="mb-4 position-fixed w-100" style={{ zIndex: 1000 }}>
    <Container>
      <Navbar.Brand href="#home">学校ポータル</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link onClick={() => onSelect("greeting")}>学校長挨拶</Nav.Link>
          <Nav.Link onClick={() => onSelect("schedule")}>スケジュール</Nav.Link>
          <Nav.Link onClick={() => onSelect("map")}>キャンバスマップ</Nav.Link>
          <Nav.Link onClick={() => onSelect("notice")}>連絡事項</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
); 