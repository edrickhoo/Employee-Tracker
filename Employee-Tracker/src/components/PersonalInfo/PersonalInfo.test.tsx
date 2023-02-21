import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import PersonalInfo from "./PersonalInfo";

describe("EmployeeStatus Component Tests", () => {
  it("should render section title and labels", async () => {
    const mockRegister = vi.fn();
    const mockErrors = {};

    render(<PersonalInfo register={mockRegister} errors={mockErrors} />);

    expect(screen.getByText(/Personal information/i)).toBeInTheDocument();
    expect(screen.getByText(/First name/i)).toBeInTheDocument();
    expect(screen.getByText(/Middle name/i)).toBeInTheDocument();
    expect(screen.getByText(/Last name/i)).toBeInTheDocument();
  });
});
