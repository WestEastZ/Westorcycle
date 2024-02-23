import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface FormLoginPropType {
  email: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  password: string;
  errorEmail: string | null;
  login: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function FormLogin({
  email,
  onChange,
  password,
  errorEmail,
  login,
}: FormLoginPropType) {
  return (
    <section className="">
      <form className="flex flex-col gap-5 mb-8">
        <div>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            name="email"
            onChange={onChange}
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            name="password"
            onChange={onChange}
          />
          {errorEmail === null ? null : (
            <div className="text-left mt-1 ml-2 text-xs text-red-500">
              {errorEmail}
            </div>
          )}
        </div>

        <Button onClick={login}>Login</Button>
      </form>
    </section>
  );
}
