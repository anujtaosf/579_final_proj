import React, { useState, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import FeaturesMenu from './FeaturesMenu';
import AddFidget from './AddFidget';
import './FidgetBoard.css'

const FidgetBoard = () => {
  const [fidgets, setFidgets] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  const nextId = useRef(0);

  const addFidget = (Component) => {
    setFidgets([...fidgets, { id: nextId.current++, Component }]);
  };

  const removeFidget = (idToRemove) => {
    setFidgets(fidgets.filter(({ id }) => id !== idToRemove));
  };

  return (
    <Container fluid className="p-4 position-relative">
      {/* Sticky Header Row */}
      <div className="position-sticky top-0 bg-white z-3 d-flex justify-content-between align-items-center mb-4" style={{ zIndex: 1030 }}>
        {/* Left side toggle button */}
        {!showMenu && (
          <div className="position-fixed top-0 start-0 m-3">
            <Button variant="light" onClick={() => setShowMenu(true)}>
              &gt; Show Features
            </Button>
          </div>
        )}
        <h1 className="text-center flex-grow-1">My Virtual Fidget Board</h1>
        {/* Right side Add Fidget */}
        <div className="position-fixed top-0 end-0 m-3">
          <AddFidget addFidget={addFidget} />
        </div>
      </div>

      {/* Sliding Features Menu */}
      {showMenu && (
        <div
          className="position-fixed top-0 start-0 vh-100 bg-white border-end shadow p-3"
          style={{ width: '250px', zIndex: 1040 }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Features Menu</h5>
            <Button
              variant="light"
              size="sm"
              onClick={() => setShowMenu(false)}
              aria-label="Hide Menu"
            >
              ←
            </Button>
          </div>
          <FeaturesMenu />
        </div>
      )}

      {/* Main Grid Content */}
      <Row className="mt-5 pt-4">
        <Col>
          <Row xs={1} md={3} className="g-3">
          {fidgets.map(({ id, Component }) => (
            <Col key={id} className="position-relative">
              <Button
                variant="light"
                size="sm"
                className="position-absolute remove-btn"
                onClick={() => removeFidget(id)}
                aria-label="Remove Fidget"
                style={{ right: '0.5rem' }} // add space from edges
              >
                ×
              </Button>

              <Component />
            </Col>
          ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default FidgetBoard;