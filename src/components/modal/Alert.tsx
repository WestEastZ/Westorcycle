import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function Alert({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 w-full h-full z-40 ">
      {children}
    </div>
  );
}

Alert.Content = function AlertContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed top-28 left-1/2 -translate-x-1/2 border bg-black border-white rounded-3xl z-50 w-[26rem] h-[10rem] flex flex-col items-center justify-between py-3">
      {children}
    </div>
  );
};

Alert.Header = function AlertHeader({ header }: { header: string }) {
  return <div className="text-2xl">{header}</div>;
};

Alert.Body = function AlertBody({ bodyText }: { bodyText: string }) {
  return <div className="text-xl">{bodyText}</div>;
};

Alert.Footer = function AlertFooter({ pathUrl }: { pathUrl: string }) {
  const navigate = useNavigate();

  const ConfirmHandler = () => {
    navigate(pathUrl);
  };

  return (
    <Button className="w-1/2" onClick={ConfirmHandler}>
      Confirm
    </Button>
  );
};
