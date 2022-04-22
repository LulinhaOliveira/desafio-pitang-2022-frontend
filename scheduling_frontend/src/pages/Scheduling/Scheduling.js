import { DatePicker, TimeInput } from "@mantine/dates";
import { Button, Container, Input, InputWrapper } from "@mantine/core";
import { useState } from "react";
import moment from "moment";
import axios from "../../services/api";
import { showNotification } from "@mantine/notifications";

const Scheduling = () => {
  const [form, setForm] = useState({
    birth_date: "",
    name: "",
    time: "",
    date: "",
  });

  const onChange = (event) => {
    setForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onCreated = async () => {
    const { time, date, name, birth_date } = form;
    let date_time = moment.utc(date);
    date_time.set({
      hour: time.getHours(),
      minute: time.getMinutes(),
      second: time.getSeconds(),
    });

    const scheduling = {
      name,
      birth_date,
      date_time: date_time.toJSON(),
    };

    try {
      const response = await axios.post("/", scheduling);

      let newData;

      const data = JSON.parse(window.localStorage.getItem("schedulings"));
      if (data) {
        newData = [...data, response];
      } else {
        newData = [response];
      }
      window.localStorage.setItem("schedulings", JSON.stringify(newData));

      showNotification({
        color: "green",
        title: "Success",
        message: `Scheduling Created Sucess`,
      });
    } catch (error) {
      if (error.response) {
        showNotification({
          color: "red",
          title: "Failed Create API",
          message: error.response.data.Message,
        });
      }
    }
  };

  return (
    <Container>
      <DatePicker
        label="Date Scheduling"
        onChange={(value) => onChange({ target: { name: "date", value } })}
        required
        value={form.date}
      />

      <TimeInput
        value={form.time}
        name="time"
        onChange={(value) => onChange({ target: { name: "time", value } })}
        required
        label="Time Scheduling"
      />

      <InputWrapper id="name" required label="Name" description="User Fullname">
        <Input
          id="name"
          name="name"
          onChange={onChange}
          placeholder="Lulinha Oliveira"
          value={form.name}
        />
      </InputWrapper>

      <DatePicker
        label="Birth Date"
        onChange={(value) =>
          onChange({ target: { name: "birth_date", value } })
        }
        required
        value={form.birth_date}
      />

      <Button mt={10} className="mt-3" onClick={onCreated}>
        Create
      </Button>
    </Container>
  );
};

export default Scheduling;
