import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { userAdded } from "./usersSlice";
import { Button, Container, Card, Form, Row, Col, Alert } from 'react-bootstrap';

export function AddUser() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [firtsName, setFirtsName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);

  const handleName = (e) => setFirtsName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleSalary = (e) => setSalary(e.target.value);
  const handleDate = (e) => setDate(e.target.value);

  const usersAmount = useSelector((state) => state.users.entities.length);

  const handleClick = () => {
    if (firtsName && lastName && email && salary && date) {
      dispatch(
        userAdded({
          id: usersAmount + 1,
          firtsName,
          lastName,
          email,
          salary,
          date
        })
      );

      setError(null);
      history.push("/");
    } else {
      setError("Fill in all fields");
    }

    setFirtsName("");
    setLastName("");
    setEmail("");
    setSalary("");
    setDate("");
  };

  const handleCancel = (e) => history.push("/");
  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title><h4>Add Employee</h4></Card.Title>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Jhone"
                  onChange={handleName}
                  value={firtsName} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Carlo"
                  onChange={handleLastName}
                  value={lastName} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email Adress</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="test@mailbox.com"
                  onChange={handleEmail}
                  value={email} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Salary</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="999.99"
                  onChange={handleSalary}
                  value={salary} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  onChange={handleDate}
                  value={date} />
              </Form.Group>
            </Col>
          </Row>
          {error &&
            <Alert variant="danger">
              {error}
            </Alert>}
          <div className="d-flex justify-content-end">
            <Button onClick={handleClick} variant="primary" style={{ marginRight: "5px" }}>
              Save
            </Button>
            <Button onClick={handleCancel} variant="danger">
              Cancel
            </Button>
          </div>

        </Card.Body>
      </Card>
    </Container>
  );
}
