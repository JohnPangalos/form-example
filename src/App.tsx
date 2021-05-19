/* global JSX */
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, object } from "zod";
import { TextInput } from "./Input";
import { Select } from "./Select";

const schema = object({
  name: string().nonempty({ message: "Required" }),
  email: string().email()
});

interface FormData {
  name: string;
  email: string;
}

function App(): JSX.Element {
  const [data, setData] = useState<FormData | undefined>();
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit: SubmitHandler<FormData> = (data, event) => {
    event?.preventDefault();
    setData(data);
  };

  return (
    <div className="p-6">
      <div className="font-bold text-2xl pb-2">React Hook Form</div>

      <div className="font-bold text-xl">Form</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          name="name"
          label="Name"
          placeholder="Name"
          register={register}
          error={formState.errors.name?.message}
        />

        <TextInput
          name="email"
          placeholder="Email"
          label="Email"
          register={register}
          error={formState.errors.email?.message}
        />
        <Select />

        <div className="pt-4">
          <button className="px-3 py-1 bg-blue-500 text-white" type="submit">
            Submit
          </button>
        </div>
      </form>
      {data && (
        <div className="pt-8">
          <div className="font-bold text-xl">Submitted Values</div>
          <div className="pt-4">
            <pre className="py-4 px-6 bg-gray-200 rounded">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
