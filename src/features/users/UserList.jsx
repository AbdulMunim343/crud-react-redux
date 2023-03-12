import { fetchUsers, userDeleted } from "./usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { Card, Table, Container, Button } from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa"

import { Link } from "react-router-dom";

export function UserList() {
  const dispatch = useDispatch();

  const { entities } = useSelector((state) => state.users);
  const loading = useSelector((state) => state.loading);

  const handleDelete = (id) => {
    dispatch(userDeleted({ id }));
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header>

          <Link to="/add-user">
            <Button style={{ marginRight: "5px" }}>Add Employee</Button>
          </Link>
          <Button
            variant="outline-secondary">
            Logout
          </Button>
        </Card.Header>
        <Card.Body>

          {loading ? (
            "Loading..."
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Salary</th>
                  <th>Date</th>
                  <th colSpan={2} className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {entities.length &&
                  entities.map(({ id, firtsName, lastName, email, salary, date }, i) => (
                    <tr key={i}>
                      <td>{id}</td>
                      <td>{firtsName}</td>
                      <td>{lastName}</td>
                      <td>{email}</td>
                      <td>${salary}</td>
                      <td>{date}</td>
                      <td className="text-center">
                        <FaTrash onClick={() => handleDelete(id)} style={{ color: "#000", cursor: "pointer" }} />
                      </td>
                      <td className="text-center">
                        <Link to={`/edit-user/${id}`}>
                          <FaEdit style={{ color: "#000", cursor: "pointer" }} />
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          )}

        </Card.Body>
      </Card>
    </Container>
  );
}
