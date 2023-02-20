import { Link } from "react-router-dom";
import { convMonthToNum } from "../../helper/validationHelper/validationHelper";
import { EmployeeApiData } from "../../interfaces/interfaces";

interface Props {
  employee: EmployeeApiData;
  removeEmployee: (id: number) => void;
}

const EmployeeCard = ({ employee, removeEmployee }: Props) => {
  const timeWithCompany = (
    startMonth: string,
    startYear: number,
    endMonth: string,
    endYear: number
  ): string => {
    const convStartMonth = convMonthToNum(startMonth);
    const convEndMonth = convMonthToNum(endMonth);
    let total = "";
    if (startYear === endYear) {
      total += convEndMonth - convStartMonth;
      if (total == "1") {
        total += " month";
      } else {
        total += " months";
      }
      return total;
    }
    total += endYear - startYear;
    if (total === "1") {
      total += " yr";
    } else {
      total += " yrs";
    }

    return total;
  };

  return (
    <div className="flex justify-between py-4 border-b boder-gray-400">
      <div>
        <p className="font-semibold">
          {employee.firstName} {employee.middleName} {employee.lastName}
        </p>
        <p>
          {employee.contract} -{" "}
          {timeWithCompany(
            employee.startDateMonth,
            employee.startDateYear,
            employee.endDateMonth,
            employee.endDateYear
          )}
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
