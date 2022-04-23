import { Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import moment from "moment";
import axios from "../../services/api";
import InputField from "./Field/FieldInput";
import DatePickerField from "./Field/FieldDatePicker";
import TimeField from "./Field/FieldTime";
import schema from "./schema.js";

const FormComponent = ({ form = {} }) => {
  const navigate = useNavigate();
  const onCreated = async (values) => {
    const { time, date, name, birth_date } = values;
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

      const schedulingData = {
        date_time: response.data.result.schedulingId,
        users: [
          {
            birth_date: response.data.result.birth_date,
            name: response.data.result.name,
          },
        ],
      };

      let newData;
      let data = JSON.parse(window.localStorage.getItem("schedulings"));

      if (data) {
        if (data[data.length - 1].date_time === schedulingData.date_time) {
          data[data.length - 1].users.push(schedulingData.users[0]);
          newData = [...data];
        } else {
          newData = [...data, schedulingData];
        }
      } else {
        newData = [schedulingData];
      }

      window.localStorage.setItem("schedulings", JSON.stringify(newData));

      showNotification({
        color: "green",
        title: "Success",
        message: `Scheduling Created Sucess`,
      });

      window.localStorage.removeItem("form");
      navigate("/");
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
    <>
      <Formik
        initialValues={form}
        onSubmit={onCreated}
        validationSchema={schema}
        render={({ submitForm }) => (
          <Form>
            <DatePickerField name="date" label="Date Scheduling" />
            <TimeField name="time" label="Time Scheduling" />

            <InputField
              name="name"
              placeholder="Jonh Figueira"
              label="Name"
              description="Full Name"
            />

            <DatePickerField name="birth_date" label="Birth Date" />

            <Button mt={10} className="mt-3" onClick={submitForm}>
              Create
            </Button>
          </Form>
        )}
      />
    </>
  );
};

export default FormComponent;
