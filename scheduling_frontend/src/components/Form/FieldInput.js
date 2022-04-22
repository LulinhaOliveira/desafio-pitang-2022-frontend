import React from "react";
import { useField, useFormikContext } from "formik";
import { Input, InputWrapper } from "@mantine/core";

const InputField = ({ name, id, ...restProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField({ name, ...restProps });
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
          field.value = field.value + val.nativeEvent.data;
          if (data) {
            data[field.name] = field.value;
            window.localStorage.setItem("form", JSON.stringify(data));
          } else {
            form[field.name] = field.value;
            window.localStorage.setItem("form", JSON.stringify(form));
          }
        }}
      />
    </InputWrapper>
  );
};

export default InputField;
