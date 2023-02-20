import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormInput } from "../../interfaces/interfaces";

interface Props {
  register: UseFormRegister<FormInput>;
  errors: FieldErrors<FormInput>;
}

const ContactDetails = ({ register, errors }: Props) => {
  return (
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
        <div className="text-sm text-gray-400">Start typing to search</div>
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
  );
};

export default ContactDetails;
