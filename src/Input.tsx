/* global JSX */
import React from "react";
import { UseFormRegister, Path, RegisterOptions } from "react-hook-form";

interface TextInputProps<T> {
  placeholder: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  registerOptions?: RegisterOptions;
  label: string;
  error?: string;
}

export function TextInput<T>({
  register,
  placeholder,
  name,
  label,
  registerOptions,
  error
}: TextInputProps<T>): JSX.Element {
  return (
    <>
      <div className="flex flex-col py-1">
        <label className="font-bold text-sm pb-1" htmlFor={name}>
          {label}
        </label>
        <div>
          <input
            id={name}
            {...register(name, registerOptions)}
            type="text"
            placeholder={placeholder}
          />
        </div>
      </div>

      {error && <div className="text-sm text-red-700 pb-1">{error}</div>}
    </>
  );
}
