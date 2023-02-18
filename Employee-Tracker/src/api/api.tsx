import axios from "axios";
import { FormInput } from "../containers/EmployeeAdd/EmployeeAdd";

const BASE_URL = "http://localhost:8080/employees/";

export interface EmployeeApiData {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: number;
  address: string;
  contract: string;
  startDateDay: string;
  startDateMonth: string;
  startDateYear: string;
  endDateDay: string;
  endDateMonth: string;
  endDateYear: string;
  onGoing: boolean;
  basis: string;
  hoursPerWeek: string;
}

export const fetchEmployees = async (): Promise<EmployeeApiData[]> => {
  const data = await axios.get(BASE_URL);
  return data.data;
};

export const addEmployee = async (data: FormInput) => {
  const response = await axios.post(BASE_URL + "add", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const fetchEmployeeById = async (id: number) => {
  const data = await axios.get(BASE_URL + id);
  return data.data;
};

export const updateEmployee = async (data: FormInput, id: number) => {
  const response = await axios.post(BASE_URL + `update/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log({ response });
  return response;
};

export const removeEmployeeById = async (id: number) => {
  await axios.delete(BASE_URL + `remove/${id}`);
};
