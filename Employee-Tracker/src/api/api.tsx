import axios from "axios";
import { EmployeeApiData, FormInput } from "../interfaces/interfaces";

const BASE_URL = "http://localhost:8080/employees/";

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
  const response = await axios.put(BASE_URL + `update/${id}`, data, {
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
