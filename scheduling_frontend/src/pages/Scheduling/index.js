import { Container } from "@mantine/core";
import TableComponent from "../../components/Table";
import { useState, useEffect } from "react";
import axios from "../../services/api";
import { showNotification } from "@mantine/notifications";

const Schedulings = () => {
  const [schedulings, setSchedulings] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/");
        window.localStorage.setItem(
          "schedulings",
          JSON.stringify(response.data)
        );
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
        setSchedulings(data);
      }
    })();
  }, []);

  return (
    <Container>
      <TableComponent
        columns={["Data Time", "User 1", "User 2"]}
        rows={schedulings}
        setRow={setSchedulings}
      />
    </Container>
  );
};

export default Schedulings;
