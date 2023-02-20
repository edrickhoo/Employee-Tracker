import axios, { AxiosResponse } from "axios";
import { render, screen } from "@testing-library/react";
import EmployeeList from "./EmployeeList";
import { vi } from "vitest";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

describe("EmployeeList Component Tests", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  const queryClient = new QueryClient();

  it("should render page title, description and add button", async () => {
    vi.spyOn(axios, "get").mockRejectedValue(new Error("Error"));

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <EmployeeList />
        </BrowserRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText("Employees' list")).toBeInTheDocument();
    expect(await screen.findByText("error")).toBeInTheDocument();
    const btn = screen.getByText(/add/i);
    expect(btn.tagName).toBe("A");
  });

  it("should render employees data from data fetched", async () => {
    const axiosResponse = {
      data: [
        { id: 1, firstName: "Sam", email: "test@hotmail.com" },
        { id: 2, firstName: "Jeffrey", email: "test@gmail.com" },
      ],
    } as AxiosResponse;
    vi.spyOn(axios, "get").mockResolvedValueOnce(axiosResponse);

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <EmployeeList />
        </BrowserRouter>
      </QueryClientProvider>
    );
    expect(await screen.findByText("Sam")).toBeInTheDocument();
    expect(await screen.findByText("Jeffrey")).toBeInTheDocument();
    expect(await screen.findByText("test@hotmail.com")).toBeInTheDocument();
    const removeBtn = screen.queryAllByRole("button");
    expect(removeBtn.length).toBe(axiosResponse.data.length);
  });

  it("should render page title, description and add button", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <EmployeeList />
        </BrowserRouter>
      </QueryClientProvider>
    );
    expect(screen.getByText("Employees' list")).toBeInTheDocument();
    expect(
      await screen.findByText(
        "Please click on 'Edit' to find more details of each employee."
      )
    ).toBeInTheDocument();
    const btn = screen.getByText(/add/i);
    expect(btn.tagName).toBe("A");
  });
});
