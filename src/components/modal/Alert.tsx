import React from "react";
import { useNavigate } from "react-router-dom";

export default function Alert({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

Alert.Header = function AlertHeader({ header }: { header: string }) {
  return <div>{header}</div>;
};

Alert.Body = function AlertBody({ body }: { body: string }) {
  return <div>{body}</div>;
};

Alert.Footer = function AlertFooter({ path }: { path: string }) {
  const navigate = useNavigate();

  const ConfirmHandler = () => {
    navigate(path);
  };

  return <button onClick={ConfirmHandler}>Confirm</button>;
};
