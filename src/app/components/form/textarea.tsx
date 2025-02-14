import React, { forwardRef, ChangeEvent } from "react";
import ErrorMessage from "./error.message";
import Label from "./label";

interface TextAreaProps {
  id: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  error?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const { id, placeholder, onChange, label, error } = props;
    return (
      <div className="relative">
        <div className="mb-2">{label && <Label id={id} label={label} />}</div>

        <textarea
          name={id}
          id={id}
          rows={4}
          ref={ref}
        
          className="relative resize-none block  w-full bg-transparent appearance-none rounded-lg  border border-gray-300  px-3 py-2 placeholder-gray-400  shadow-sm focus:border-primary focus:border-2 focus:outline-none focus:ring-primary sm:text-sm"
          placeholder={placeholder}
          onChange={onChange}
        />
        {error && <ErrorMessage msg={error} />}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
