import { IconProps } from "phosphor-react";
import React, { InputHTMLAttributes } from "react";
import { Tooltip } from "./Tooltip";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ElementType<IconProps>;
  isError?: boolean;
  messageError?: string;
  hasFilled?: boolean;
  register?: InputHTMLAttributes<HTMLInputElement>;
}

export function Input({
  icon: Icon,
  isError,
  hasFilled,
  messageError,
  register,
  ...rest
}: InputProps) {
  return (
    <>
      <div className="relative">
        {Icon && (
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <Icon
              className={` ${
                hasFilled && !isError
                  ? "text-green-500"
                  : isError
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
              size={22}
            />
          </div>
        )}
        <input
          ref={null}
          className={`
            block 
            p-4 
           ${Icon && " pl-10 pr-10"} 
            w-full 
            text-sm 
            outline-none 
            rounded-lg
            border
            ${
              hasFilled && !isError
                ? "border-green-500 text-green-500"
                : isError
                ? "border-red-600"
                : "border-gray-600"
            }
            focus:border-green-400
            bg-gray-700 
            placeholder-gray-400 
            disabled:opacity-30
            disabled:focus:border-transparent
            transition-all duration-500
            `}
          // required
          {...register}
          {...rest}
        />
        {isError && (
          <div className="absolute right-2 inset-y-4">
            <Tooltip message={messageError} />
          </div>
        )}
      </div>
    </>
  );
}
