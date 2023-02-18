import { Link } from "react-router-dom";
import { EmployeeApiData } from "../../api/api";

interface Props {
  employee: EmployeeApiData;
  removeEmployee: (id: number) => void;
}

const EmployeeCard = ({ employee, removeEmployee }: Props) => {
  return (
    <div className="flex justify-between py-4 border-b boder-gray-400">
      <div>
        <p className="font-semibold">
          {employee.firstName} {employee.middleName} {employee.lastName}
        </p>
        <p>
          {employee.contract} -{" "}
          {employee.endDateYear !== employee.startDateYear
            ? Number(employee.endDateYear) -
              Number(employee.startDateYear) +
              " yrs"
            : Number(employee.endDateMonth) -
              Number(employee.startDateMonth) +
              " months"}
        </p>
        <p>{employee.email}</p>
      </div>
      <div className="text-blue-900 font-semibold">
        <Link to={`/employee/edit/${employee.id}`} className="px-2 underline">
          Edit
        </Link>
        <button
          onClick={() => removeEmployee(employee.id)}
          className="px-2 border-l underline border-gray-400"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
