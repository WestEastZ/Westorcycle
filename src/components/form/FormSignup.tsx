import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { UserType } from "@/models/type";

interface FormSignupType {
  user: UserType;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorEmail: string | null;
  errorPassword: string | null;
  setUser: (value: UserType) => void;
  signup: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function FormSignup({
  user,
  onChange,
  errorEmail,
  errorPassword,
  setUser,
  signup,
}: FormSignupType) {
  return (
    <section>
      <form className="flex flex-col gap-5 mb-12">
        <div>
          <Input
            id="email-signup"
            type="email"
            placeholder="Email"
            value={user.email}
            name="email"
            onChange={onChange}
          />
          {errorEmail === null ? null : (
            <div className="text-left mt-1 ml-2 text-xs text-red-500 email-error">
              {errorEmail}
            </div>
          )}
        </div>
        <div>
          <Input
            id="password-signup"
            type="password"
            placeholder="Password"
            value={user.password}
            name="password"
            onChange={onChange}
          />
          {errorPassword === null ? null : (
            <div className="text-left mt-1 ml-2 text-xs text-red-500 password-error">
              {errorPassword}
            </div>
          )}
        </div>
        <div>
          <Input
            id="nickname-signup"
            type="text"
            placeholder="Nickname"
            value={user.nickname}
            name="nickname"
            onChange={onChange}
          />
        </div>
        <div className="flex justify-center items-center gap-2">
          <input
            type="checkbox"
            id="checkSeller"
            checked={user.isSeller}
            name="isSeller"
            onChange={(e) => setUser({ ...user, isSeller: e.target.checked })}
          />
          <label htmlFor="checkSeller">Sales Account</label>
        </div>
        <Button id="signUpButton" onClick={signup}>
          Sign Up
        </Button>
      </form>
    </section>
  );
}
