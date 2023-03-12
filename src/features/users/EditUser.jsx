import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Container, Card, Form, Row, Col, Alert } from 'react-bootstrap';
import { useState } from "react";
import { userUpdated } from "./usersSlice";

export function EditUser() {
  const { pathname } = useLocation();
  const userId = parseInt(pathname.replace("/edit-user/", ""));

  const user = useSelector((state) =>
    state.users.entities.find((user) => user.id === userId)
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const [firtsName, setFirtsName] = useState(user.firtsName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [salary, setSalary] = useState(user.salary);
  const [date, setDate] = useState(user.date);
  const [error, setError] = useState(null);

  const handleName = (e) => setFirtsName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleSalary = (e) => setSalary(e.target.value);
  const handleDate = (e) => setDate(e.target.value);

  const handleClick = () => {
    if (firtsName && lastName && email && salary && date) {
      dispatch(
        userUpdated({
          id: userId,
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
  };

  const handleCancel = (e) => history.push("/");

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title><h4>Edit Employee</h4></Card.Title>
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
                  placeholder="99"
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
              Update
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
