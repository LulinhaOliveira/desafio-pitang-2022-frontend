import { Table, Container, Button } from "@mantine/core";
import { useState, useEffect } from "react";
import axios from "../../services/api";
import moment from "moment";

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
      <td>{moment.utc(scheduling.date_time).format("YYYY-MM-DD HH:mm")}</td>
      {scheduling.users.map((user, index) => (
        <td key={index}>
          Name : {user.name} <br />
          Birth Date : {moment.utc(user.birth_date).format("YYYY-MM-DD")} <br />
          Status : {user.status} <br />
          <Button onClick={() => onUptaded(user.id, "attended")}>
            Attended
          </Button>
          <Button onClick={() => onUptaded(user.id, "not_attended")} ml={5}>
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
      <Table style={table} horizontalSpacing="xs" highlightOnHover>
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
