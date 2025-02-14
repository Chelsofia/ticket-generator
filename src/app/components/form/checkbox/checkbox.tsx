import { JSX, ReactNode, forwardRef } from "react";
import Label from "../label";
import ErrorMessage from "../error.message";

type CheckboxProps = Omit<JSX.IntrinsicElements["input"], "onChange"> & {
  label?:ReactNode|string;
  error: any;
  id: string;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({error, label, id, ...props }, ref) => {
    return (
      <div className="relative flex items-start">
        <div className="flex h-6 items-center">
          <input
            ref={ref}
            {...props}
            id={id}
            aria-describedby="comments-description"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
        </div>
        <div className="ml-3 text-sm text-primary leading-6">
          <label htmlFor={id}>{label}</label>
        </div>
        {error && <ErrorMessage msg={error} />}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
