import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";
import { Link } from "react-router-dom";
import { fetchEmployees, removeEmployeeById } from "../../api/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { EmployeeApiData } from "../../interfaces/interfaces";

const EmployeeList = () => {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery("employeesData", () =>
    fetchEmployees()
  );
  console.log(data ? data[0] : null);

  const removeEmployeeMutation = useMutation(removeEmployeeById, {
    onSuccess: (data, id) => {
      queryClient.setQueryData<EmployeeApiData[] | undefined>(
        "employeesData",
        (oldData) =>
          oldData?.filter((todo: EmployeeApiData) => {
            console.log(id);
            return todo.id !== id;
          })
      );
    },
  });

  if (isLoading) return <div>Loading...</div>;

  if (error instanceof Error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  const handleRemoveClick = (id: number) => {
    removeEmployeeMutation.mutate(id);
  };

  return (
    <div>
      <div className="bg-gray-200 py-16">
        <h2 className="text-3xl font-bold max-w-[1280px] mx-auto px-4">
          Employees' list
        </h2>
      </div>
      <div className="max-w-[1280px] mx-auto px-4 py-2">
        <div className="flex items-center justify-between py-4 border-gray-200 border-b">
          <p>Please click on 'Edit' to find more details of each employee.</p>
          <Link
            to="/employee/add"
            className="rounded-md text-white py-2 px-8 bg-blue-800"
          >
            Add <span className="hidden md:inline">Employee</span>
          </Link>
        </div>
        {data
          ? data.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                removeEmployee={handleRemoveClick}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default EmployeeList;
