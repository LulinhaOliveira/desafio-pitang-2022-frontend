import { Container } from "@mantine/core";
import FormComponent from "../../components/Form/Form_ik";

const Scheduling = () => {
  const data = JSON.parse(window.localStorage.getItem("form"));
  let form;

  if (data) {
    form = {
      name: data.name,
      birth_date: new Date(data.birth_date),
      time: new Date(data.time),
      date: new Date(data.date),
    };
  } else {
    form = {
      name: "",
      birth_date: "",
      time: "",
      date: "",
    };
  }
  return (
    <Container>
      <FormComponent form={form} />
    </Container>
  );
};

export default Scheduling;
