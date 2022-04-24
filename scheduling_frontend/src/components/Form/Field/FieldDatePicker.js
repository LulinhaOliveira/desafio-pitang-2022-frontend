import React from "react";
import { useField, useFormikContext } from "formik";
import { DatePicker } from "@mantine/dates";
import "./form.css";

const DatePickerField = ({ ...restProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField({ ...restProps });
  const form = {
    date: "",
    birth_date: "",
    name: "",
    time: "",
  };
  return (
    <>
      <DatePicker
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
      {meta.error && meta.touched && (
        <span className="form_error">{meta.error}</span>
      )}
    </>
  );
};

export default DatePickerField;
