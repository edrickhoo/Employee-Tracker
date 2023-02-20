import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { addEmployee } from "../../api/api";
import {
  canBeOnGoingHelper,
  isValidEndDateHelper,
} from "../../helper/validationHelper/validationHelper";
import { FormInput } from "../../interfaces/interfaces";

const EmployeeAdd = () => {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FormInput>();

  const navigate = useNavigate();

  const onSubmit = async (data: FormInput) => {
    try {
      await addEmployee(data);
      navigate("/");
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  const isValidEndDate = (endDateYear: number) => {
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
      <div>
        <div className="bg-gray-200 py-16 flex flex-col items-center md:block">
          <Link
            to="/"
            className="underline block hover:text-gray-500 text-gray-600 max-w-[1280px] w-full mx-auto px-4 mb-4 text-lg font-semibold"
          >
            &lt; Back
          </Link>
          <h2 className="text-3xl font-bold max-w-[1280px] mx-auto px-4">
            Add Employee
          </h2>
        </div>
        <div className="max-w-[1280px] mx-auto px-4 py-8">
          <form
            className="space-y-8 flex flex-col items-center md:block"
            onSubmit={handleSubmit(onSubmit)}
          >
            <section className="flex flex-col space-y-2">
              <h5 className="font-bold text-2xl">Personal information</h5>
              <label htmlFor="firstName">First name</label>
              <input
                data-testid="firstName"
                {...register("firstName", {
                  required: true,
                  pattern: /^[A-Za-z]+$/i,
                })}
                name="firstName"
                className="border-gray-500 border-2 rounded w-[300px] px-2 py-1"
                type="text"
              />
              {errors?.firstName?.type === "required" && (
                <p className="text-red-600">This field is required</p>
              )}
              {errors?.firstName?.type === "pattern" && (
                <p className="text-red-600">Alphabetic characters only</p>
              )}
              <label>Middle name (if applicable)</label>
              <input
                data-testid="middleName"
                {...register("middleName", {
                  pattern: /^[A-Za-z]+$/i,
                })}
                name="middle-name"
                className="border-gray-500 border-2 rounded w-[300px] px-2 py-1"
                type="text"
              />
              {errors?.middleName?.type === "pattern" && (
                <p className="text-red-600">Alphabetic characters only </p>
              )}
              <label>Last name</label>
              <input
                data-testid="lastName"
                {...register("lastName", {
                  required: true,
                })}
                name="lastName"
                className="border-gray-500 border-2 rounded w-[300px] px-2 py-1"
                type="text"
              />
              {errors?.lastName?.type === "required" && (
                <p className="text-red-600">This field is required</p>
              )}
              {errors?.lastName?.type === "pattern" && (
                <p className="text-red-600">Alphabetic characters only </p>
              )}
            </section>
            <section className="flex flex-col space-y-2">
              <h5 className="font-bold text-2xl">Contact details</h5>
              <label>Email address</label>
              <input
                data-testid="email"
                {...register("email", {
                  required: true,
                  pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                })}
                name="email"
                className="border-gray-500 border-2 rounded w-[300px] px-2 py-1"
                type="email"
              />
              {errors?.email?.type === "required" && (
                <p className="text-red-600">This field is required</p>
              )}
              <div>
                <label htmlFor="phone">Mobile number</label>
                <div className="text-sm text-gray-400">
                  Must be an Australian number
                </div>
              </div>

              <div className="flex border-gray-500 border-2 rounded w-[300px] relative">
                <span className="bg-gray-300 flex justify-center items-center rounded-none px-2 py-1 absolute left-0 ">
                  +61
                </span>
                <input
                  data-testid="phone"
                  {...register("phone", {
                    required: true,
                  })}
                  name="phone"
                  className="pl-14 focus:outline-none w-full px-2 py-1"
                  type="text"
                />
              </div>
              {errors?.phone?.type === "required" && (
                <p className="text-red-600">This field is required</p>
              )}

              <div>
                <label htmlFor="address">Residential address</label>
                <div className="text-sm text-gray-400">
                  Start typing to search
                </div>
              </div>

              <input
                data-testid="address"
                {...register("address", {
                  required: true,
                })}
                name="address"
                type="text"
                className="border-gray-500 border-2 rounded min-w-[300px] max-w-[600px] px-2 py-1"
              />
              {errors?.address?.type === "required" && (
                <p className="text-red-600">This field is required</p>
              )}
            </section>
            <section className="space-y-4">
              <h5 className="font-bold text-2xl mb-4">Employee status</h5>
              <div className="space-y-2">
                <span className="font-semibold">What is contract type?</span>
                <div>
                  <input
                    data-testid="contractpPermanent"
                    {...register("contract")}
                    className="scale-150 mr-2"
                    type="radio"
                    value="Permanent"
                    defaultChecked
                  />
                  <label>Permanent</label>
                </div>
                <div>
                  <input
                    data-testid="contractContract"
                    {...register("contract")}
                    className="scale-150 mr-2"
                    type="radio"
                    value="Contract"
                  />
                  <label>Contract</label>
                </div>
              </div>
              <div className="font-semibold">Start date</div>
              <div className="flex space-x-4">
                <div className="flex flex-col max-w-[70px]">
                  <label className="font-semibold" htmlFor="start-date-day">
                    Day
                  </label>
                  <input
                    data-testid="startDateDay"
                    {...register("startDateDay", {
                      required: true,
                      max: 32,
                    })}
                    className="border-gray-500 border-2 rounded px-2 py-1"
                    type="text"
                  />
                  {errors?.startDateDay?.type === "required" && (
                    <p className="text-red-600">Field required</p>
                  )}
                </div>
                <div className="flex flex-col max-w-[150px]">
                  <label className="font-semibold" htmlFor="start-date-day">
                    Month
                  </label>
                  <select
                    data-testid="startDateMonth"
                    {...register("startDateMonth", {
                      required: true,
                    })}
                    className="border-gray-500 border-2 rounded px-2 py-1 h-[36px]"
                    id="startMonth"
                  >
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>
                <div className="flex flex-col max-w-[70px]">
                  <label className="font-semibold">Year</label>
                  <input
                    data-testid="startDateYear"
                    {...register("startDateYear", {
                      required: true,
                      min: 0,
                    })}
                    className="border-gray-500 border-2 rounded px-2 py-1"
                    type="text"
                  />
                  {errors?.startDateYear?.type === "required" && (
                    <p className="text-red-600">Field required</p>
                  )}
                </div>
              </div>
              <div className="font-semibold">End date</div>
              <div className="flex space-x-4">
                <div className="flex flex-col max-w-[70px]">
                  <label className="font-semibold" htmlFor="end-date-day">
                    Day
                  </label>
                  <input
                    data-testid="endDateDay"
                    {...register("endDateDay", {
                      required: true,
                      max: 32,
                    })}
                    className="border-gray-500 border-2 rounded px-2 py-1"
                    name="endDateDay"
                    type="text"
                  />
                  {errors?.endDateDay?.type === "required" && (
                    <p className="text-red-600">Field required</p>
                  )}
                </div>
                <div className="flex flex-col max-w-[150px]">
                  <label className="font-semibold" htmlFor="start-date-day">
                    Month
                  </label>
                  <select
                    data-testid="endDateMonth"
                    {...register("endDateMonth", {
                      required: true,
                    })}
                    className="border-gray-500 border-2 rounded px-2 py-1"
                    name="endDateMonth"
                    id="endDateMonth"
                  >
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>
                <div className="flex flex-col max-w-[70px]">
                  <label className="font-semibold" htmlFor="endDateYear">
                    Year
                  </label>
                  <input
                    data-testid="endDateYear"
                    {...register("endDateYear", {
                      required: true,
                      validate: isValidEndDate,
                    })}
                    className="border-gray-500 border-2 rounded px-2 py-1"
                    name="endDateYear"
                    type="text"
                  />
                  {errors?.endDateYear?.type === "required" && (
                    <p className="text-red-600">Field required</p>
                  )}

                  {errors?.endDateYear?.type === "min" && (
                    <p className="text-red-600">
                      Must be greater than{" "}
                      {Number(getValues().startDateYear) - 1}
                    </p>
                  )}
                </div>
              </div>
              {errors?.endDateYear?.type === "validate" && (
                <p className="text-red-600">
                  End Day cannot be earlier than start date
                </p>
              )}
              <div className="pl-2 pb-4 py-2 ">
                <input
                  data-testid="onGoing"
                  {...register("onGoing", {
                    validate: canBeOnGoing,
                  })}
                  name="onGoing"
                  className="scale-[200%] mr-4 rounded-none"
                  type="checkbox"
                />
                <label htmlFor="onGoing">On goining</label>{" "}
                {errors?.onGoing?.type === "validate" && (
                  <p className="text-red-600 inline ml-3">
                    End date passed cannot be on going
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <span className="font-semibold">
                  Is this on a full-time or part-time basis?
                </span>
                <div>
                  <input
                    data-testid="basisFull"
                    {...register("basis")}
                    className="scale-150 mr-2"
                    name="basis"
                    type="radio"
                    value="Full-time"
                    defaultChecked
                  />

                  <label htmlFor="basis">Full-time</label>
                </div>
                <div>
                  <input
                    data-testid="basisPart"
                    {...register("basis")}
                    className="scale-150 mr-2"
                    name="basis"
                    type="radio"
                    value="Part-time"
                  />
                  <label htmlFor="basis">Part-time</label>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="hoursPerWeek" className="font-semibold">
                  Hours per week
                </label>
                <input
                  data-testid="hoursPerWeek"
                  {...register("hoursPerWeek", {
                    required: true,
                    min: 0,
                  })}
                  className="border-gray-500 border-2 rounded px-2 py-1 max-w-[70px]"
                  name="hoursPerWeek"
                  type="text"
                />
                {errors?.hoursPerWeek?.type === "required" && (
                  <p className="text-red-600">This field is required</p>
                )}
              </div>
            </section>

            <button className="text-white border-2 border-blue-700 bg-blue-700 hover:bg-blue-600 px-16 py-[6.5px] md:mr-4 rounded-md">
              Save
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

export default EmployeeAdd;
