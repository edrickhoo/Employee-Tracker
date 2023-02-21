import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import EmployeeStatus from "./EmployeeStatus";

describe("EmployeeStatus Component Tests", () => {
  it("should render section title and labels", async () => {
    const mockRegister = vi.fn();
    const getValues = vi.fn();
    const mockErrors = {};
    const mockIsCreating = true;

    render(
      <EmployeeStatus
        register={mockRegister}
        errors={mockErrors}
        isCreating={mockIsCreating}
        getValues={getValues}
      />
    );

    expect(screen.getByText(/Employee status/i)).toBeInTheDocument();
    expect(screen.getByText(/What is contract type?/i)).toBeInTheDocument();
    expect(screen.getByText(/Start date/i)).toBeInTheDocument();
    expect(screen.getByText(/End date/i)).toBeInTheDocument();
    expect(screen.getByText(/On goining/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Is this on a full-time or part-time basis?/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Hours per week/i)).toBeInTheDocument();
  });
});
