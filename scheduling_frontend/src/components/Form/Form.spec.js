/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-debugging-utils */
import Form from ".";
import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const initalValues = {
  name: "",
  birth_date: "",
  time: "",
  date: "",
};

const initalValuesStorage = {
  name: "casa",
  birth_date: new Date("2001-01-01T00:00:00"),
  time: new Date("2001-01-01T15:30:00"),
  date: new Date("2003-02-01T00:00:00"),
};

describe("Form", () => {
  beforeEach(() => {
    cleanup();
  });

  it("Render Form ", () => {
    const { container, debug } = render(
      <MemoryRouter>
        <Form form={initalValues} />
      </MemoryRouter>
    );

    const inputs = container.querySelectorAll("input");
    const button = container.querySelector("button[name = 'create']");
    expect(inputs.length).toBe(5);
    expect(inputs[0].value).toBe(""); //DatePicker Scheduling
    expect(inputs[1].value).toBe(""); //Time Hours
    expect(inputs[2].value).toBe(""); //Time Minutes
    expect(inputs[3].value).toBe(""); //Name
    expect(inputs[4].value).toBe(""); //DatePicker Birht_Date
    expect(button.textContent).toBe("Create");
  });

  it("Render Form with Inital LocalStorage Values ", () => {
    const { container, debug, queryByText } = render(
      <MemoryRouter>
        <Form form={initalValuesStorage} />
      </MemoryRouter>
    );

    const inputs = container.querySelectorAll("input");
    const button = container.querySelector("button[name = 'create']");
    expect(inputs[0].value).toBe("February 1, 2003"); //DatePicker Scheduling
    expect(inputs[1].value).toBe("15"); //Time Hours
    expect(inputs[2].value).toBe("30"); //Time Minutes
    expect(inputs[3].value).toBe("casa"); //Name
    expect(inputs[4].value).toBe("January 1, 2001"); //DatePicker Birht_Date
    expect(button.textContent).toBe("Create");
  });
});
