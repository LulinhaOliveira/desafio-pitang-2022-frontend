/* eslint-disable testing-library/no-debugging-utils */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import Table from ".";
import { cleanup, render } from "@testing-library/react";

const columns = ["Date Time", "User 1", "User 2"];
const rows = [
  {
    date_time: "2020-01-01T12:00:00.000Z",
    users: [
      {
        id: "123",
        name: "Luiz",
        birth_date: "1999-01-01T12:00:00.000Z",
        status: "pending",
      },
      {
        id: "1234",
        name: "Antonio",
        birth_date: "1998-01-01T12:00:00.000Z",
        status: "not_attended",
      },
    ],
  },
  {
    date_time: "2020-01-01T13:00:00.000Z",
    users: [
      {
        id: "12345",
        name: "Luiz2",
        birth_date: "1999-01-01T12:00:00.000Z",
        status: "pending",
      },
    ],
  },
];

describe("Table", () => {
  beforeEach(() => {
    cleanup();
  });

  it("Render Table", () => {
    const { container } = render(<Table />);

    const trHeadRows = container.querySelectorAll("thead tr");
    const trBodyRows = container.querySelectorAll("tbody tr");
    expect(trHeadRows.length).toBe(1);
    expect(trBodyRows.length).toBe(0);
  });

  it("Table with rows and columns", () => {
    const { container } = render(<Table rows={rows} columns={columns} />);

    const thTrHeadColumns = container.querySelectorAll("thead tr th");
    const trBodyRows = container.querySelectorAll("tbody tr");
    const tdTrBodyRows_0 = trBodyRows[0].querySelectorAll("td");
    const tdTrBodyRows_1 = trBodyRows[1].querySelectorAll("td");
    const buttonTdTrBodyRows_0 = tdTrBodyRows_0[2].querySelectorAll("button");
    const buttonTdTrBodyRows_1 = tdTrBodyRows_1[1].querySelectorAll("button");

    expect(thTrHeadColumns.length).toBe(3);
    expect(trBodyRows.length).toBe(2);
    expect(tdTrBodyRows_0.length).toBe(3);
    expect(tdTrBodyRows_1.length).toBe(2);
    expect(buttonTdTrBodyRows_0.length).toBe(2);
    expect(buttonTdTrBodyRows_1.length).toBe(2);
  });
});
