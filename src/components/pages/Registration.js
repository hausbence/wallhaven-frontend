import React from "react";
import { useForm } from "react-hook-form";

const Registration = () => {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (values) => console.log(values);

  let content = (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>E-mail</label>
        <input
          name="email"
          type="email"
          placeholder="example@example.com"
          ref={register({
            required: true,
          })}
        />
        {errors.email && "Invalid e-mail"}

        <label>Username</label>
        <input
          name="username"
          placeholder="username"
          ref={register({
            required: true,
            minLength: 2,
            maxLength: 16,
          })}
        />
        {errors.username && "Invalid username"}

        <label>Password</label>
        <input
          name="password"
          type="password"
          placeholder="password"
          ref={register({
            required: true,
            minLength: 2,
            maxLength: 16,
          })}
        />
        {errors.password && "Invalid password"}

        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  );
  return content;
};

export default Registration;
