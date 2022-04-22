import React from "react";
import { useField, useFormikContext } from "formik";
import { TimeInput } from "@mantine/dates";

const TimeField = ({ ...restProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField({ ...restProps });
  const form = {
    date: "",
    birth_date: "",
    name: "",
    time: "",
  };
  return (
    <TimeInput
      required
      {...field}
      {...restProps}
      onChange={(val) => {
        const data = JSON.parse(window.localStorage.getItem("form"));
        if (data) {
          data[field.name] = val;
          window.localStorage.setItem("form", JSON.stringify(data));
        } else {
          form[field.name] = val;
          window.localStorage.setItem("form", JSON.stringify(form));
        }
        setFieldValue(field.name, val);
      }}
    />
  );
};

export default TimeField;
