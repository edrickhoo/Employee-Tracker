import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import EmployeeAdd from "./EmployeeAdd";
import axios from "axios";

describe("EmployeeAdd Component Tests", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
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

  it("should have required fields errors when no values are in and form is submitted", async () => {
    render(
      <BrowserRouter>
        <EmployeeAdd />
      </BrowserRouter>
    );
    const submitBtn = screen.getByText("Save");
    await userEvent.click(submitBtn);

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
      screen.getByText(/End date cannot be earlier than start date/i)
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

  it("should display Alphabetic characters only error when first/middle/last inputs have non alphabetic characters on form submit", async () => {
    render(
      <BrowserRouter>
        <EmployeeAdd />
      </BrowserRouter>
    );

    const submitBtn = screen.getByText("Save");
    const firstNameInput = screen.getByTestId("firstName");
    const middleNameInput = screen.getByTestId("middleName");
    const lastNameInput = screen.getByTestId("lastName");

    await userEvent.type(firstNameInput, "Pizza  Pizza");
    await userEvent.type(middleNameInput, "Peter2018");
    await userEvent.type(lastNameInput, "Jack_");
    await userEvent.click(submitBtn);
    expect(screen.getAllByText(/Alphabetic characters only/i).length).toBe(3);
  });

  it("should display notify user about maxium digits of 10 when more than 10 digits are used in the phone input on form submit", async () => {
    render(
      <BrowserRouter>
        <EmployeeAdd />
      </BrowserRouter>
    );

    const submitBtn = screen.getByText("Save");
    const phoneInput = screen.getByTestId("phone");

    await userEvent.type(phoneInput, "0123456789014");
    await userEvent.click(submitBtn);
    expect(
      screen.getByText(/Exceeding maximun digits of 10/i)
    ).toBeInTheDocument();
  });

  it("should display notify user about input min-max of 1-31 when a number not in that range is input for start/end day on form submit", async () => {
    render(
      <BrowserRouter>
        <EmployeeAdd />
      </BrowserRouter>
    );

    const submitBtn = screen.getByText("Save");
    const startDayInput = screen.getByTestId("startDateDay");
    const endDayInput = screen.getByTestId("endDateDay");

    await userEvent.type(startDayInput, "0");
    await userEvent.type(endDayInput, "35");
    await userEvent.click(submitBtn);
    expect(
      screen.getByText(/Please input start day between 1-31/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Please input end day between 1-31/i)
    ).toBeInTheDocument();
  });

  it("should display notify user about input min-max of 1-31 when a number not in that range is input for start/end day on form submit", async () => {
    render(
      <BrowserRouter>
        <EmployeeAdd />
      </BrowserRouter>
    );

    const submitBtn = screen.getByText("Save");
    const startDayInput = screen.getByTestId("startDateDay");
    const endDayInput = screen.getByTestId("endDateDay");

    await userEvent.type(startDayInput, "0");
    await userEvent.type(endDayInput, "35");
    await userEvent.click(submitBtn);
    expect(
      screen.getByText(/Please input start day between 1-31/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Please input end day between 1-31/i)
    ).toBeInTheDocument();
  });

  it("should display notify user about input min 0 when a number less than 0 inputted for hours per week on form submit", async () => {
    render(
      <BrowserRouter>
        <EmployeeAdd />
      </BrowserRouter>
    );

    const submitBtn = screen.getByText("Save");
    const hoursPerInput = screen.getByTestId("hoursPerWeek");

    await userEvent.type(hoursPerInput, "0");
    await userEvent.click(submitBtn);
    expect(
      screen.getByText(/Number must be greater than 0/i)
    ).toBeInTheDocument();

    await userEvent.clear(hoursPerInput);
    await userEvent.type(hoursPerInput, "-44");
    screen.logTestingPlaygroundURL();
    expect(
      screen.getByText(/Number must be greater than 0/i)
    ).toBeInTheDocument();
  });

  it("should display notify user about invalid when input doesnt begin with 02/03/04/07/08 and have 8 digits the phone input on form submit", async () => {
    render(
      <BrowserRouter>
        <EmployeeAdd />
      </BrowserRouter>
    );

    const submitBtn = screen.getByText("Save");
    const phoneInput = screen.getByTestId("phone");

    await userEvent.type(phoneInput, "04123");
    await userEvent.click(submitBtn);
    expect(
      screen.getByText(/Please enter valid number e.g 0412345678/i)
    ).toBeInTheDocument();

    await userEvent.clear(phoneInput);
    await userEvent.type(phoneInput, "0012345678");
    await userEvent.click(submitBtn);
    expect(
      screen.getByText(/Please enter valid number e.g 0412345678/i)
    ).toBeInTheDocument();

    await userEvent.clear(phoneInput);
    await userEvent.type(phoneInput, "0512345678");
    await userEvent.click(submitBtn);
    expect(
      screen.getByText(/Please enter valid number e.g 0412345678/i)
    ).toBeInTheDocument();

    await userEvent.clear(phoneInput);
    await userEvent.type(phoneInput, "0112345678");
    await userEvent.click(submitBtn);
    expect(
      screen.getByText(/Please enter valid number e.g 0412345678/i)
    ).toBeInTheDocument();

    await userEvent.clear(phoneInput);
    await userEvent.type(phoneInput, "0912345678");
    await userEvent.click(submitBtn);
    expect(
      screen.getByText(/Please enter valid number e.g 0412345678/i)
    ).toBeInTheDocument();

    await userEvent.clear(phoneInput);
    await userEvent.type(phoneInput, "0612345678");
    await userEvent.click(submitBtn);
    expect(
      screen.getByText(/Please enter valid number e.g 0412345678/i)
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
