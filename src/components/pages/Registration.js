import React from "react";
import { useForm } from "react-hook-form";

const Registration = () => {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (values) => console.log(values);

  //   pattern: {
  //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  //     message: "invalid email address",

  // validate: (value) => value !== "admin" || "Nice try!",
  //   }

  let content = (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="email"
          type="email"
          ref={register({
            required: true,
          })}
        />
        {errors.email && errors.email.message}

        <input
          name="username"
          ref={register({
            required: true,
            minLength: 2,
            maxLength: 16,
          })}
        />
        {errors.username && errors.username.message}
        <input
          name="password"
          type="password"
          ref={register({
            required: true,
            minLength: 2,
            maxLength: 16,
          })}
        />
        {errors.password && errors.password.message}

        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  );
  return content;
};

export default Registration;
