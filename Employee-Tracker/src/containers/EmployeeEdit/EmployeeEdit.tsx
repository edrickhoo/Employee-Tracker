import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { fetchEmployeeById, updateEmployee } from "../../api/api";
import { useParams, useNavigate } from "react-router-dom";
import { FormInput } from "../../interfaces/interfaces";
import {
  canBeOnGoingHelper,
  isValidEndDateHelper,
} from "../../helper/validationHelper/validationHelper";
import { useCallback, useEffect, useState } from "react";
import PersonalInfo from "../../components/PersonalInfo/PersonalInfo";
import ContactDetails from "../../components/ContactDetails/ContactDetails";
import EmployeeStatus from "../../components/EmployeeStatus/EmployeeStatus";

const EmployeeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: async () => await fetchEmployeeById(Number(id)),
  });

  const resetAsyncForm = useCallback(async () => {
    const result = await fetchEmployeeById(Number(id)); // result: { firstName: 'test', lastName: 'test2' }
    reset(result); // asynchronously reset your form values
  }, [reset]);

  useEffect(() => {
    resetAsyncForm();
  }, [resetAsyncForm]);

  const onSubmit = async (data: FormInput) => {
    try {
      await updateEmployee(data, Number(id));
      navigate("/");
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  const isValidEndDate = () => {
    const startDay = getValues().startDateDay;
    const startMonth = getValues().startDateMonth;
    const startYear = getValues().startDateYear;
    const endDay = getValues().endDateDay;
    const endMonth = getValues().endDateMonth;
    const endYear = getValues().endDateYear;

    return isValidEndDateHelper(
      startDay,
      startMonth,
      startYear,
      endDay,
      endMonth,
      endYear
    );
  };

  const canBeOnGoing = (value: boolean): boolean => {
    if (value === false) {
      return true;
    }
    const endDateDay = getValues().endDateDay;
    const endDateMonth = getValues().endDateMonth;
    const endDateYear = getValues().endDateYear;

    return canBeOnGoingHelper({ endDateDay, endDateMonth, endDateYear });
  };

  return (
    <div>
      <div>{id}</div>
      <div>
        <div className="bg-gray-200 py-16 flex flex-col items-center md:block">
          <Link
            to="/"
            className="underline block hover:text-gray-500 text-gray-600 max-w-[1280px] w-full mx-auto px-4 mb-4 text-lg font-semibold"
          >
            &lt; Back
          </Link>
          <h2 className="text-3xl font-bold max-w-[1280px] mx-auto px-4">
            Employee Details
          </h2>
        </div>
        <div className="max-w-[1280px] mx-auto px-4 py-8">
          <form
            className="space-y-8 flex flex-col items-center md:block"
            onSubmit={handleSubmit(onSubmit)}
          >
            <PersonalInfo register={register} errors={errors} />
            <ContactDetails register={register} errors={errors} />
            <EmployeeStatus
              isCreating={false}
              register={register}
              errors={errors}
              getValues={getValues}
            />

            <button className="text-white border-2 border-blue-700 bg-blue-700 hover:bg-blue-600 px-14 py-[6.5px] md:mr-4 rounded-md">
              Update
            </button>
            <button>
              <Link
                to="/"
                className="bg-gray-300 border-2 border-gray-500 hover:bg-gray-200 px-14 py-2 rounded-md"
              >
                Cancel
              </Link>
            </button>
            {error && (
              <div className="text-red-600 text-lg">
                An error has occurred: {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeEdit;
