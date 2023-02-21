import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import ContactDetails from "./ContactDetails";

describe("ContactDetails Component Tests", () => {
  it("should render section title and labels", async () => {
    const mockRegister = vi.fn();
    const mockErrors = {};

    render(<ContactDetails register={mockRegister} errors={mockErrors} />);

    expect(screen.getByText(/Contact details/i)).toBeInTheDocument();
    expect(screen.getByText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Mobile number/i)).toBeInTheDocument();
    expect(screen.getByText(/Residential address/i)).toBeInTheDocument();
  });
});
