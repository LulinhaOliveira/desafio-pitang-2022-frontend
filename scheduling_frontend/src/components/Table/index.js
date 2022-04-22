import { Table, Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import moment from "moment";
import axios from "../../services/api";

const TableComponent = ({ columns = [], rows = [], setRow = () => {} }) => {
  const onUptaded = async (id, status) => {
    try {
      await axios.patch(`/${id}`, { status: status });

      setRow(
        rows.filter((scheduling) => {
          scheduling.users.filter((user) => {
            if (user.id === id) {
              user.status = status;
            }
            return user;
          });
          return scheduling;
        })
      );

      window.localStorage.setItem("schedulings", JSON.stringify(rows));

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

  const new_rows = rows.map((row, index) => (
    <tr key={index}>
      <td>{moment.utc(row.date_time).format("YYYY-MM-DD HH:mm")}</td>
      {row.users.map((user, index) => (
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
    <Table style={table} horizontalSpacing="xs" highlightOnHover>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>{new_rows}</tbody>
    </Table>
  );
};

export default TableComponent;
