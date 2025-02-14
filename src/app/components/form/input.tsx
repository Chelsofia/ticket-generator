"use client";
import { forwardRef, useState, ChangeEvent } from "react";
import Label from "./label";
import ErrorMessage from "./error.message";
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface InputProps {
  type?: string;
  name?: string;
  id: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  error?: any;
  value?: string;
  disabled?: boolean;
  readOnly?: boolean;
  borderNone?: boolean;
  defaultValue?: string;
  isIcon?: boolean;
  onKeyDown?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    type = "text",
    name,
    id,
    placeholder,
    onChange,
    label,
    error,
    value,
    disabled,
    defaultValue,
    readOnly,
    onKeyDown,
    isIcon = true,
  } = props;

  const [inputType, setInputType] = useState<string>(type);

  return (
    <div className="mt-1 relative">
      {label && <Label id={id} label={label} />}
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        ref={ref}
        onKeyDown={onKeyDown}
        defaultValue={defaultValue}
        readOnly={readOnly}
        type={inputType}
        className={`w-full p-3 border border-[#07363e] bg-[#042127] rounded-md ${
          disabled && "cursor-not-allowed"
        }`}
        onChange={onChange}
        value={value}
      />
      {type === "password" && (
        <>
          {isIcon ? (
            inputType === "password" ? (
              <button
                className="absolute text-gray-500 text-[15px] bottom-[13px] right-3"
                onClick={() => setInputType("text")}
                type="button"
              >
                
              </button>
            ) : (
              <button
                className="absolute text-gray-500 text-[15px] bottom-[13px] right-3"
                onClick={() => setInputType("password")}
                type="button"
              >
               
              </button>
            )
          ) : inputType === "password" ? (
            <button
              className="absolute text-gray-500 text-sm bottom-[13px] right-3"
              onClick={() => setInputType("text")}
              type="button"
            >
              SHOW
            </button>
          ) : (
            <button
              className="absolute text-gray-500 text-sm bottom-[13px] right-3"
              onClick={() => setInputType("password")}
              type="button"
            >
              HIDE
            </button>
          )}
        </>
      )}
      <span>{error && <ErrorMessage msg={error} />}</span>
    </div>
  );
});

Input.displayName = "Input";
