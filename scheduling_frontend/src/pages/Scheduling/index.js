import { Table, Container, Button } from "@mantine/core";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axios from "../../services/api";

const Schedulings = () => {
  const [schedulings, setSchedulings] = useState([]);

  useEffect(() => {
    axios
      .get("/")
      .then((response) => setSchedulings(response.data))
      .catch((error) => console.error(error));
  }, []);

  const onUptaded = (id, status) => {
    axios
      .patch(`/${id}`, { status: status })
      .catch((error) => console.error(error));

    setSchedulings(
      schedulings.filter((scheduling) => {
        scheduling.users.filter((user) => {
          if (user.id === id) {
            user.status = status;
          }

          return user;
        });
        return scheduling;
      })
    );
  };

  const rows = schedulings.map((scheduling, index) => (
    <tr key={index}>
      <td>{scheduling.date_time}</td>
      {scheduling.users.map((user, index) => (
        <td key={index}>
          Name : {user.name} <br />
          Birth Date : {user.birth_date} <br />
          Status : {user.status} <br />
          <Button
            onClick={() => onUptaded(user.id, "attended")}
            className="m-1"
          >
            Attended
          </Button>
          <Button
            onClick={() => onUptaded(user.id, "not_attended")}
            className="m-1"
          >
            Not Attended
          </Button>
        </td>
      ))}
    </tr>
  ));

  const table = {
    border: "2px solid",
  };
  return (
    <Container>
      <Table mb={20} style={table} horizontalSpacing="xs" highlightOnHover>
        <thead>
          <tr>
            <th>Date Time</th>
            <th>User 1</th>
            <th>User 2</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Container>
  );
};

export default Schedulings;
