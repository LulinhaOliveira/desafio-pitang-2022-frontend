import { Container } from "@mantine/core";
import { useEffect, useState } from "react";
import FormComponent from "../../components/Form";

const Scheduling = () => {
  const [form, setForm] = useState({
    birth_date: "",
    name: "",
    time: "",
    date: "",
  });

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem("form"));
    if (data) {
      const aux = {
        name: data.name,
        birth_date: new Date(data.birth_date),
        time: new Date(data.time),
        date: new Date(data.date),
      };
      setForm(aux);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("form", JSON.stringify(form));
  }, [form]);

  return (
    <Container>
      <FormComponent form={form} setForm={setForm} />
    </Container>
  );
};

export default Scheduling;
