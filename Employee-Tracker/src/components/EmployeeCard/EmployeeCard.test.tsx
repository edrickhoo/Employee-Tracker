import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { vi } from "vitest";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import EmployeeCard from "./EmployeeCard";
import { EmployeeApiData } from "../../interfaces/interfaces";

describe("EmployeeCard Component Tests", () => {
  const mockEmployee: EmployeeApiData = {
    id: 1,
    firstName: "waterr",
    middleName: "",
    lastName: "Jones",
    email: "test@hotmail.com",
    phone: "041235678",
    address: "5 Grove Ave",
    contract: "Contract",
    startDateDay: 21,
    startDateMonth: "January",
    startDateYear: 1999,
    endDateDay: 25,
    endDateMonth: "January",
    endDateYear: 2033,
    onGoing: false,
    basis: "Full-time",
    hoursPerWeek: 25,
  };

  it("should render employee data passed into component", async () => {
    const removeFunction = vi.fn((value) => true);
    render(
      <BrowserRouter>
        <EmployeeCard removeEmployee={removeFunction} employee={mockEmployee} />
      </BrowserRouter>
    );
    expect(screen.getByText("test@hotmail.com")).toBeInTheDocument();
    expect(screen.getByText(/waterr/i)).toBeInTheDocument();
    expect(screen.getByText(/Contract/i)).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  it("should fire onclick removeEmployee function when remove button is pressed", async () => {
    const removeFunction = vi.fn((value) => true);
    render(
      <BrowserRouter>
        <EmployeeCard removeEmployee={removeFunction} employee={mockEmployee} />
      </BrowserRouter>
    );

    const removeBtn = screen.getByText("Remove");
    await userEvent.click(removeBtn);
    expect(removeFunction).toBeCalled();
  });
});
