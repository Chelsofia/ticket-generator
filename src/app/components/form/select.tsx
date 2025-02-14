import React, { FC } from "react";
import { Controller} from "react-hook-form";
import ReactSelect, { components } from "react-select";
import ErrorMessage from "./error.message";
import { ArrowUpIcon,ArrowDownIcon } from "@heroicons/react/24/solid";

import Label from "./label";

interface SelectProps {
  control: any;
  options?: { label: string; value: string }[];
  isMulti?: boolean;
  name: string
  error?: string;
  label?: string;
  placeholder?: string;
  isDisabled?: boolean;
  defaultValue?:string
}

const CustomDropdownIndicator: React.FC<any> = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <div className="text-black">
        {props.selectProps.menuIsOpen ? (
          <ArrowUpIcon className="w-5 h-5" />
        ) : (
          <ArrowDownIcon  className="w-5 h-5" />
        )}
      </div>
    </components.DropdownIndicator>
  );
};

const style: object = {
  control: (base: React.CSSProperties, state: any) => ({
    ...base,
    border: state.isFocused ? 0 : 0,
    backgroundColor: "transparent",
    boxShadow: state.isFocused ? 0 : 0,
    paddingLeft: 4,
    "&:hover": {
      border: state.isFocused ? 0 : 0,
    },
  }),
};

export const Select: FC<SelectProps> = ({
  control,
  options = [],
  isMulti,
  name,
  error,
  label,
  placeholder,
  isDisabled,
  defaultValue
}) => {
  return (
    <div className="relative">
      {label && <Label label={label} />}
      <div className="mt-1">
        <Controller
          name={name}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <ReactSelect
              placeholder={placeholder}
              {...field}
              defaultValue={defaultValue}
              styles={style}
              components={{ DropdownIndicator: CustomDropdownIndicator }}
              options={options}
              isMulti={isMulti}
              isDisabled={isDisabled}
              className="text-sm  bg-transparent  font-inter  py-[6px]  border border-gray-300  rounded-md text-gray-600"
            />
          )}
        />
      </div>
      {error && <ErrorMessage msg={error} />}
    </div>
  );
};
