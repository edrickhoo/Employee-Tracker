export interface EmployeeApiData {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  contract: string;
  startDateDay: number;
  startDateMonth: string;
  startDateYear: number;
  endDateDay: number;
  endDateMonth: string;
  endDateYear: number;
  onGoing: boolean;
  basis: string;
  hoursPerWeek: number;
}

export interface FormInput {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  contract: string;
  startDateDay: number;
  startDateMonth: string;
  startDateYear: number;
  endDateDay: number;
  endDateMonth: string;
  endDateYear: number;
  onGoing: boolean;
  basis: string;
  hoursPerWeek: number;
}
