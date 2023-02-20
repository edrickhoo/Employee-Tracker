import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { vi } from "vitest";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import EmployeeEdit from "./EmployeeEdit";
import { createMemoryHistory } from "history";
import axios, { AxiosResponse } from "axios";
import * as api from "../../api/api";

describe("EmployeeEdit Component Tests", () => {
  it("should render title of page", async () => {
    render(
      <BrowserRouter>
        <EmployeeEdit />
      </BrowserRouter>
    );
    expect(screen.getByText(/Employee Details/i)).toBeInTheDocument();
  });

  it("should render back button", async () => {
    render(
      <BrowserRouter>
        <EmployeeEdit />
      </BrowserRouter>
    );
    expect(screen.getByText(/back/i)).toBeInTheDocument();
  });

  it("should render all labels of form", async () => {
    render(
      <BrowserRouter>
        <EmployeeEdit />
      </BrowserRouter>
    );
    expect(screen.getByText(/First name/i)).toBeInTheDocument();
    expect(screen.getByText(/Middle name/i)).toBeInTheDocument();
    expect(screen.getByText(/Last name/i)).toBeInTheDocument();
    expect(screen.getByText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Mobile number/i)).toBeInTheDocument();
    expect(screen.getByText(/Residential address/i)).toBeInTheDocument();
    expect(screen.getByText(/What is contract type?/i)).toBeInTheDocument();
    expect(screen.getByText(/Start date/i)).toBeInTheDocument();
    expect(screen.getByText(/End date/i)).toBeInTheDocument();
    expect(screen.getByText(/On goining/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Is this on a full-time or part-time basis?/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Hours per week/i)).toBeInTheDocument();
  });

  // Axois error when clicking submit button dunno why
  it("should have required fields errors when no values are in and form is submitted", async () => {
    const mockData = {
      id: 1,
      firstName: "water",
      middleName: "",
      lastName: "jack",
      email: "water@hotmail.com",
      phone: "0412345678",
      address: "5 John St, Peter, 2588 Sydney",
      contract: "Permanent",
      startDateDay: "18",
      startDateMonth: "January",
      startDateYear: "2019",
      endDateDay: "3",
      endDateMonth: "January",
      endDateYear: "2024",
      onGoing: false,
      basis: "Full-time",
      hoursPerWeek: "44",
    };

    vi.spyOn(api, "fetchEmployeeById").mockResolvedValue(mockData);
    const component = (
      <MemoryRouter initialEntries={["/employees/1"]}>
        <Routes>
          <Route path="/employees/:id" element={<EmployeeEdit />}></Route>
        </Routes>
      </MemoryRouter>
    );
    const history = createMemoryHistory();
    history.push("/users/123");
    const { rerender } = render(component);
    rerender(component);
    const submitBtn = screen.getByText("Update");
    const firstNameInput = screen.getByTestId("firstName");
    console.log(firstNameInput);

    // await userEvent.click(submitBtn);
    screen.logTestingPlaygroundURL();
    await expect(screen.queryAllByText(/This field is required/i).length).toBe(
      6
    );
    expect(screen.queryAllByText(/Field required/i).length).toBe(4);
  });
});
