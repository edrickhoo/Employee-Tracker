import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormInput } from "../../interfaces/interfaces";

interface Props {
  register: UseFormRegister<FormInput>;
  errors: FieldErrors<FormInput>;
}

const PersonalInfo = ({ register, errors }: Props) => {
  return (
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
        name="middleName"
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
          pattern: /^[A-Za-z]+$/i,
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
  );
};

export default PersonalInfo;
