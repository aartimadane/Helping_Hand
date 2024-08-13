import './style.css'; 
/*export default function Login() {
  return (<div className="expense-manager">
        <div className="bg-custom d-flex justify-content-center ">
    <main>
      <div class="text-pale-turquoise">
        <h1>Your Contribution, Their Future</h1>
        <p>Welcome to Helping Hands, where your generosity fuels change and transforms lives. Together, we bridge the gap between those in need and those willing to give. Every donation, big or small, makes a significant impact, providing essential resources, hope, and support to communities worldwide. Join us in making a difference today – because every helping hand counts.</p>

      </div>
      <div className="feature">
        <p>Handel Expense</p>
      </div>
    </main>
    <footer>
      <p>Copyright ©SpendWise</p>
    </footer>
    </div>
  </div>)
}
*/



/// src/HomePage.js
import React from 'react';
import { Container, Navbar, Nav, Button, Row, Col, Card } from 'react-bootstrap';
import './style.css'; // Import custom CSS for additional styling

const Login = () => {
  return (
    <div>
 

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay">
          <Container className="text-center text-white py-5">
            <h1 className="display-3 font-weight-bold">Welcome to Helping Hands</h1>
            <p className="lead mb-4">
            <p>Where your generosity fuels change and transforms lives. Together, we bridge the gap between those in need and those willing to give. Every donation, big or small, makes a significant impact, providing essential resources, hope, and support to communities worldwide. Join us in making a difference today – because every helping hand counts.</p>
            </p>
        {/*   <Button variant="light" size="lg" className="hero-button">Get Started</Button>*/}
          </Container>
        </div>
      </div>

      {/* Features Section */}
      <Container>
        <Row className="text-center my-5">
          <Col md={4}>
            <Card className="shadow-lg">
              <Card.Body>
                <Card.Title className="font-weight-bold">Track Donations</Card.Title>
                <Card.Text>
                  reports and analytics.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-lg">
              <Card.Body>
                <Card.Title className="font-weight-bold">Manage Donors</Card.Title>
                <Card.Text>
                   communication.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-lg">
              <Card.Body>
                <Card.Title className="font-weight-bold">Generate Reports</Card.Title>
                <Card.Text>
                  donation activities.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
