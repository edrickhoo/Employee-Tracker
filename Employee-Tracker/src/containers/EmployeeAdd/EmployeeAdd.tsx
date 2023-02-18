import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { addEmployee } from "../../api/api";

export interface FormInput {
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

const EmployeeAdd = () => {
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
      console.log(e);
    }
  };
  return (
    <div>
      <div>
        <div className="bg-gray-200 py-16">
          <Link
            to="/"
            className="underline block hover:text-gray-300 text-gray-600 max-w-[1280px] w-full mx-auto px-4 mb-4"
          >
            &lt; Back
          </Link>
          <h2 className="text-3xl font-bold max-w-[1280px] mx-auto px-4">
            Add Employee
          </h2>
        </div>
        <div className="max-w-[1280px] mx-auto px-4 py-8">
          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <section className="flex flex-col space-y-2">
              <h5 className="font-bold text-2xl">Personal information</h5>
              <label>First name</label>
              <input
                {...register("firstName", {
                  required: true,
                  pattern: /^[A-Za-z]+$/i,
                })}
                className="border-gray-500 border-2 rounded w-[300px] px-2 py-1"
                type="text"
              />
              {errors?.firstName?.type === "required" && (
                <p className="text-red-600">This field is required</p>
              )}
              <label>Middle name (if applicable)</label>
              <input
                {...register("middleName", {
                  pattern: /^[A-Za-z]+$/i,
                })}
                name="middle-name"
                className="border-gray-500 border-2 rounded w-[300px] px-2 py-1"
                type="text"
              />
              <label>Last name</label>
              <input
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
            </section>
            <section className="flex flex-col space-y-2">
              <h5 className="font-bold text-2xl">Contact details</h5>
              <label>Email address</label>
              <input
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
                <label>Mobile number</label>
                <div className="text-sm text-gray-400">
                  Must be an Australian number
                </div>
              </div>

              <div className="flex border-gray-500 border-2 rounded w-[300px] relative">
                <span className="bg-gray-300 flex justify-center items-center rounded-none px-2 py-1 absolute left-0 ">
                  +61
                </span>
                <input
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
                <label>Residential address</label>
                <div className="text-sm text-gray-400">
                  Start typing to search
                </div>
              </div>

              <input
                {...register("address", {
                  required: true,
                })}
                type="text"
                className="border-gray-500 border-2 rounded max-w-[600px] px-2 py-1"
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
                    {...register("startDateMonth", {
                      required: true,
                    })}
                    className="border-gray-500 border-2 rounded px-2 py-1"
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
                    {...register("endDateMonth", {
                      required: true,
                    })}
                    className="border-gray-500 border-2 rounded px-2 py-1"
                    name="end-month"
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
                  <label className="font-semibold" htmlFor="endDateYear">
                    Year
                  </label>
                  <input
                    {...register("endDateYear", {
                      min: getValues().startDateYear,
                      required: true,
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
              <div className="pl-2 pb-4 py-2">
                <input
                  {...register("onGoing")}
                  className="scale-[200%] mr-4 rounded-none"
                  type="checkbox"
                />
                <label>On goining</label>
              </div>
              <div className="space-y-2">
                <span className="font-semibold">
                  Is this on a ful-time or part-time basis?
                </span>
                <div>
                  <input
                    {...register("basis")}
                    className="scale-150 mr-2"
                    name="employee-basis"
                    type="radio"
                    value="Full-time"
                    defaultChecked
                  />
                  <label>Full-time</label>
                </div>
                <div>
                  <input
                    {...register("basis")}
                    className="scale-150 mr-2"
                    name="employee-basis"
                    type="radio"
                    value="Part-time"
                  />
                  <label>Part-time</label>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="hoursPerWeek" className="font-semibold">
                  Hours per week
                </label>
                <input
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

            <button className="text-white border-2 border-blue-700 bg-blue-700 px-16 py-2 mr-4 rounded-md">
              Save
            </button>
            <button>
              <Link
                to="/"
                className="bg-gray-300 border-2 border-gray-500 px-14 py-2 rounded-md"
              >
                Cancel
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAdd;
