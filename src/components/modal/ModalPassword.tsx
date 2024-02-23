import React, { useState } from "react";

interface ModalPasswordProps {
  isOpen: boolean;
  onClose: () => void;
  onChangePassword: (newPassword: string) => void;
}

export default function ModalPassword({
  isOpen,
  onClose,
  onChangePassword,
}: ModalPasswordProps) {
  const [newPassword, setNewPassword] = useState<string>("");

  const handleChangePassword = (event: React.FormEvent) => {
    event.preventDefault();
    onChangePassword(newPassword);
    setNewPassword("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div>
      <form onSubmit={handleChangePassword}>
        <ModalPassword.UsernameInput />
        <ModalPassword.PasswordInput
          newPassword={newPassword}
          setNewPassword={setNewPassword}
        />
        <ModalPassword.SubmitButton />
      </form>
      <button onClick={() => onClose()}>닫기</button>
    </div>
  );
}

ModalPassword.UsernameInput = function UsernameInput() {
  return (
    <input type="text" style={{ display: "none" }} autoComplete="username" />
  );
};

ModalPassword.PasswordInput = function PasswordInput({
  newPassword,
  setNewPassword,
}: {
  newPassword: string;
  setNewPassword: (e: string) => void;
}) {
  return (
    <input
      type="password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      autoComplete="new-password"
    />
  );
};

ModalPassword.SubmitButton = function SubmitButton() {
  return <button type="submit">Change Password</button>;
};
