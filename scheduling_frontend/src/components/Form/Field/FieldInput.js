import React from "react";
import { useField, useFormikContext } from "formik";
import { Input, InputWrapper } from "@mantine/core";
import "./form.css";

const InputField = ({ name, id, ...restProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField({ name, ...restProps });
  const form = {
    date: "",
    birth_date: "",
    name: "",
    time: "",
  };

  return (
    <InputWrapper {...field} {...restProps}>
      <Input
        {...field}
        {...restProps}
        onChange={(val) => {
          setFieldValue(field.name, val);
          const data = JSON.parse(window.localStorage.getItem("form"));

          field.value = val.nativeEvent.data
            ? field.value + val.nativeEvent.data
            : field.value.substring(0, field.value.length - 1);
          if (data) {
            data[field.name] = field.value;
            window.localStorage.setItem("form", JSON.stringify(data));
          } else {
            form[field.name] = field.value;
            window.localStorage.setItem("form", JSON.stringify(form));
          }
        }}
      />
      {meta.error && meta.touched && (
        <span className="form_error">{meta.error}</span>
      )}
    </InputWrapper>
  );
};

export default InputField;
