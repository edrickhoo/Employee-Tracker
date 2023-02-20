import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
} from "react-hook-form";
import {
  canBeOnGoingHelper,
  isValidEndDateHelper,
} from "../../helper/validationHelper/validationHelper";
import { FormInput } from "../../interfaces/interfaces";

interface Props {
  isCreating: boolean;
  register: UseFormRegister<FormInput>;
  errors: FieldErrors<FormInput>;
  getValues: UseFormGetValues<FormInput>;
}

const EmployeeStatus = ({ isCreating, register, errors, getValues }: Props) => {
  const isValidEndDate = (): boolean => {
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
            defaultChecked={isCreating}
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
              Must be greater than {Number(getValues().startDateYear) - 1}
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
            defaultChecked={isCreating}
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
  );
};

export default EmployeeStatus;
