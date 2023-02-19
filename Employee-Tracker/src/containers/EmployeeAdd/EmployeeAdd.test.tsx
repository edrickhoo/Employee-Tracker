import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { vi } from "vitest";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { EmployeeApiData } from "../../interfaces/interfaces";
import EmployeeAdd from "./EmployeeAdd";
import axios from "axios";

describe("EmployeeAdd Component Tests", () => {
  it("should render title of page", async () => {
    render(
      <BrowserRouter>
        <EmployeeAdd />
      </BrowserRouter>
    );
    expect(screen.getByText(/Add Employee/i)).toBeInTheDocument();
  });

  it("should render back button", async () => {
    render(
      <BrowserRouter>
        <EmployeeAdd />
      </BrowserRouter>
    );
    expect(screen.getByText(/back/i)).toBeInTheDocument();
  });

  it("should render all labels of form", async () => {
    render(
      <BrowserRouter>
        <EmployeeAdd />
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

  //   it("should render employee data passed into component", async () => {
  //     const removeFunction = vi.fn((value) => true);
  //     render(
  //       <BrowserRouter>
  //         <EmployeeCard removeEmployee={removeFunction} employee={mockEmployee} />
  //       </BrowserRouter>
  //     );
  //     expect(screen.getByText("test@hotmail.com")).toBeInTheDocument();
  //     expect(screen.getByText(/waterr/i)).toBeInTheDocument();
  //     expect(screen.getByText(/Contract/i)).toBeInTheDocument();
  //     expect(screen.getByText("Edit")).toBeInTheDocument();
  //   });

  it("should have required fields errors when no values are in and form is submitted", async () => {
    render(
      <BrowserRouter>
        <EmployeeAdd />
      </BrowserRouter>
    );

    const submitBtn = screen.getByText("Save");

    await userEvent.click(submitBtn);
    screen.logTestingPlaygroundURL();
    expect(screen.queryAllByText(/This field is required/i).length).toBe(6);
    expect(screen.queryAllByText(/Field required/i).length).toBe(4);
  });

  it("should display error when end year is earlier than start year", async () => {
    render(
      <BrowserRouter>
        <EmployeeAdd />
      </BrowserRouter>
    );

    const submitBtn = screen.getByText("Save");
    const startYearInput = screen.getByTestId("startDateYear");
    const endYearInput = screen.getByTestId("endDateYear");
    await userEvent.type(startYearInput, "2019");
    await userEvent.type(endYearInput, "2018");
    await userEvent.click(submitBtn);
    expect(
      screen.getByText(/End Day cannot be earlier than start date/i)
    ).toBeInTheDocument();
  });

  it("should display error when end year is passed and on goining is checked", async () => {
    render(
      <BrowserRouter>
        <EmployeeAdd />
      </BrowserRouter>
    );

    const submitBtn = screen.getByText("Save");
    const onGoingInput = screen.getByTestId("onGoing");
    const endYearInput = screen.getByTestId("endDateYear");
    await userEvent.click(onGoingInput);
    await userEvent.type(endYearInput, "2018");
    await userEvent.click(submitBtn);
    expect(
      screen.getByText(/End date passed cannot be on going/i)
    ).toBeInTheDocument();
  });

  it("should make axois post request on successful submit", async () => {
    const mockData = {
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

    const spy = vi.spyOn(axios, "post");

    render(
      <BrowserRouter>
        <EmployeeAdd />
      </BrowserRouter>
    );

    const submitBtn = screen.getByText("Save");
    const firstNameInput = screen.getByTestId("firstName");
    const lastNameInput = screen.getByTestId("lastName");
    const emailInput = screen.getByTestId("email");
    const phoneInput = screen.getByTestId("phone");
    const addressInput = screen.getByTestId("address");
    const startDateDayInput = screen.getByTestId("startDateDay");
    const startDateYearInput = screen.getByTestId("startDateYear");
    const endDateDayInput = screen.getByTestId("endDateDay");
    const endDateYearInput = screen.getByTestId("endDateYear");
    const hoursPerWeekInput = screen.getByTestId("hoursPerWeek");

    await userEvent.type(firstNameInput, "water");
    await userEvent.type(lastNameInput, "jack");
    await userEvent.type(emailInput, "water@hotmail.com");
    await userEvent.type(phoneInput, "0412345678");
    await userEvent.type(addressInput, "5 John St, Peter, 2588 Sydney");
    await userEvent.type(startDateDayInput, "18");
    await userEvent.type(startDateYearInput, "2019");
    await userEvent.type(endDateDayInput, "3");
    await userEvent.type(endDateYearInput, "2024");
    await userEvent.type(hoursPerWeekInput, "44");
    await userEvent.click(submitBtn);

    expect(spy).toHaveBeenCalledWith(
      "http://localhost:8080/employees/add",
      mockData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  });
});
