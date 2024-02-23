import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Close from "../../assets/icon/Close.svg";
import { useUser } from "@/contexts/userContext";

interface ModalPasswordProps {
  onClose: () => void;
  onChangePassword: (newPassword: string) => void;
}

export default function ModalPassword({
  onClose,
  onChangePassword,
}: ModalPasswordProps) {
  const { user } = useUser() || {};
  const [newPassword, setNewPassword] = useState<string>("");
  const [prevPassword, setPrevPassword] = useState<string>("");

  const handleChangePassword = (event: React.FormEvent) => {
    event.preventDefault();
    onChangePassword(newPassword);
    setNewPassword("");
    onClose();
  };

  return (
    <div
      className="fixed top-0 right-0 left-0 bottom-0 w-full h-full bg-white bg-opacity-10 z-40 flex justify-center items-center"
      onClick={() => onClose()}
    >
      <section
        className="absolute w-[40rem] h-[40rem] z-50 bg-[#141414] rounded-3xl flex flex-col justify-evenly px-40"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleChangePassword} className="flex flex-col gap-10">
          <ModalPassword.UsernameInput />
          <ModalPassword.PrevPasswordInput
            prevPassword={prevPassword}
            setPrevPassword={setPrevPassword}
          />

          <ModalPassword.NewPasswordInput
            newPassword={newPassword}
            setNewPassword={setNewPassword}
          />
          <ModalPassword.SubmitButton
            userPassword={user?.password as string}
            newPassword={newPassword}
            prevPassword={prevPassword}
          />
        </form>
        <button onClick={() => onClose()} className="absolute top-6 right-6">
          <img src={Close} alt="Close" />
        </button>
      </section>
    </div>
  );
}

ModalPassword.UsernameInput = function UsernameInput() {
  return (
    <input type="text" style={{ display: "none" }} autoComplete="username" />
  );
};

ModalPassword.PrevPasswordInput = function PrevPasswordInput({
  prevPassword,
  setPrevPassword,
}: {
  prevPassword: string;
  setPrevPassword: (e: string) => void;
}) {
  return (
    <>
      <Input
        type="password"
        placeholder="Prev password"
        value={prevPassword}
        onChange={(e) => setPrevPassword(e.target.value)}
        autoComplete="new-password"
      />
    </>
  );
};

ModalPassword.NewPasswordInput = function NewPasswordInput({
  newPassword,
  setNewPassword,
}: {
  newPassword: string;
  setNewPassword: (e: string) => void;
}) {
  return (
    <Input
      type="password"
      placeholder="new password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      autoComplete="new-password"
    />
  );
};

ModalPassword.SubmitButton = function SubmitButton({
  userPassword,
  newPassword,
  prevPassword,
}: {
  userPassword: string;
  newPassword: string;
  prevPassword: string;
}) {
  return (
    <Button
      type="submit"
      disabled={
        userPassword !== prevPassword ||
        newPassword === "" ||
        prevPassword === ""
      }
    >
      Change Password
    </Button>
  );
};
