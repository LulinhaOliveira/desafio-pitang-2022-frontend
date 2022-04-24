/* eslint-disable testing-library/no-debugging-utils */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import NavBar from "./navBar";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("NavBar", () => {
  it("Render NavBar", () => {
    const { container } = render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    const ul_itens = container.querySelectorAll("li");
    expect(ul_itens.length).toBe(2);
    expect(ul_itens[0].textContent).toBe("List");
    expect(ul_itens[1].textContent).toBe("Create");
  });
});
