import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        autoComplete="off"
        type={type}
        className={cn(
          "flex w-full h-12 border-b px-5 py-5 text-sm focus:border-b-2 focus:border-blue-800 focus:outline-none bg-inherit disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-offset-2 placeholder:text-white",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
