import React, { ReactNode } from "react";

interface LabelProps {
  id?: string;
  label: ReactNode|string;
}

const Label: React.FC<LabelProps> = ({ id, label }) => {
  return (
    <label htmlFor={id} className="block text-sm font-bold text-gray-700 mb-1">
      {label}
    </label>
  );
};

export default Label;
