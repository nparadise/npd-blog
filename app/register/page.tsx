"use client";

import { useFormState, useFormStatus } from "react-dom";
import { register } from "../lib/actions";
import { MouseEvent } from "react";

export default function RegisterPage() {
  const [errorMessage, dispatch] = useFormState(register, undefined);

  return (
    <div className="flex h-full items-center justify-center">
      <form action={dispatch} className="rounded-xl border border-blue-400 p-4">
        <label htmlFor="email-input">Email</label>
        <br />
        <input
          type="email"
          name="email"
          id="email-input"
          placeholder="Email"
          className="mb-1 border px-1"
          required
        />
        <br />
        <label htmlFor="password-input">Password</label>
        <br />
        <input
          type="password"
          name="password"
          id="password-input"
          placeholder="Password"
          className="mb-2 border px-1"
          required
        />
        <br />
        <label htmlFor="password-re-input">Password</label>
        <br />
        <input
          type="password"
          name="password-re"
          id="password-re-input"
          placeholder="Type Password Again"
          className="mb-2 border px-1"
          required
        />
        <div>{errorMessage && <p>{errorMessage}</p>}</div>
        <RegisterButton />
      </form>
    </div>
  );
}

function RegisterButton() {
  const { pending } = useFormStatus();

  const handleClick = (event: MouseEvent) => {
    if (pending) {
      event.preventDefault();
    }
  };

  return (
    <button
      aria-disabled={pending}
      type="submit"
      onClick={handleClick}
      className="mx-auto block h-fit w-fit rounded-sm bg-blue-400 px-2 py-1 text-white hover:bg-blue-600 active:bg-blue-800"
    >
      Register
    </button>
  );
}
