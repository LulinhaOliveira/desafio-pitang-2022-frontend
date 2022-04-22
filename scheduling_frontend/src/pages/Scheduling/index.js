import { Table, Container, Button } from "@mantine/core";
import { useState, useEffect } from "react";
import axios from "../../services/api";
import moment from "moment";
import { showNotification } from "@mantine/notifications";

const Schedulings = () => {
  const [schedulings, setSchedulings] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/");
        window.localStorage.setItem("schedulings", JSON.stringify(response));
      } catch (error) {
        if (error.response) {
          showNotification({
            color: "red",
            title: "Failed Get API Schedulings",
            message: error.response,
          });
        }
      } finally {
        const data = JSON.parse(window.localStorage.getItem("schedulings"));
        setSchedulings(data.data);
      }
    })();
  }, []);

  const onUptaded = async (id, status) => {
    try {
      await axios.patch(`/${id}`, { status: status });

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

      window.localStorage.setItem("schedulings", JSON.stringify(schedulings));

      showNotification({
        color: "green",
        title: "Success",
        message: `Status Updated Sucess`,
      });
    } catch (error) {
      showNotification({
        color: "red",
        title: "Failed Uptade API",
        message: error.response,
      });
    }
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
