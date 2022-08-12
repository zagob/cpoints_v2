import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: "red" | "green" | "white";
  css?: string;
}

export function Button({
  children,
  color = "white",
  css,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`py-2 sm:h-[3rem] px-2 uppercase text-sm sm:text-1xl font-bold transition-all hover:brightness-75 rounded-md ${
        color === "white"
          ? "bg-white text-black"
          : color === "red"
          ? "bg-red-600"
          : color === "green"
          ? "bg-green-500"
          : ""
      }
      ${css}
        disabled:opacity-30
        disabled:cursor-not-allowed
        disabled:hover:brightness-100
      `}
      {...rest}
    >
      {children}
    </button>
  );
}
