"use client";

import { login } from "@/app/utils/action";
import React, { useActionState } from "react";
import { signIn } from "next-auth/react";
import { IconGitHub, IconGoogle } from "./ui/icons";

export const LoginForm = ({ type = 'login' }: { type?: 'login' | 'signup'}) => {
  const initialState: LoginActionState = {
    data: {
      email: "",
      password: ""
    },
    errors: {},
  };

  const label = type === 'login' ? 'Sign in' : 'Sign Up';

  const [state, formAction, isPending] = useActionState(login, initialState);
  return (
    <div>
      <form
        action={formAction}
        className="mt-5 max-w-[24rem] w-[21rem] flex flex-col glassmorphism "
      >
        {state.errors?.general && (
          <p className="text-center font-normal bg-red-300 py-2 mb-4 mt-2 rounded-md">
            {state.errors.general.join(", ")}
          </p>
        )}
        <div className={`mb-2 mt-6`}>
          <input
            required
            type="email"
            name="email"
            defaultValue={String(state.data?.email)}
            placeholder="Email address"
            className="form_input"
          />
          {state.errors?.email && (
            <p className="text-sm text-red-500 mt-1">
              {state.errors.email.join(", ")}
            </p>
          )}
        </div>
        <div className="mb-6">
          <input
            required
            type="password"
            name="password"
            defaultValue={String(state.data?.password)}
            placeholder="Password"
            className="form_input"
          />
          {state.errors?.password && (
            <p className="text-sm text-red-500 mt-1">
              {state.errors.password.join(", ")}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="px-7 py-4 mb-3 blue_btn text-lg"
          style={{ backgroundColor: isPending ? "#ccc" : undefined }}
        >
          {isPending ? "loading..." : label}
        </button>

        {type === "login" && (
          <>
            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
              <p className="text-center font-semibold mx-4 mb-0">OR</p>
            </div>

            <div
              className="px-7 py-2 mb-3 outline_btn text-lg"
              onClick={() => signIn("google")}
              role="button"
            >
              <IconGoogle className=" w-8 h-8" />
              <span className="ml-6">Continue with Google</span>
            </div>

            <div
              className="px-7 py-2 outline_btn text-lg"
              onClick={() => signIn("github")}
              role="button"
            >
              <IconGitHub className="w-8 h-8" />
              <span className="ml-6">Continue with GitHub</span>
            </div>
          </>
        )}
      </form>
    </div>
  );
};
