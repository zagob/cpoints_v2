import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: "red" | "green" | "white";
}

export function Button({ children, color = "white", ...rest }: ButtonProps) {
  return (
    <button
      className={`h-[3rem] px-2 uppercase font-bold transition-all hover:brightness-75 rounded-md ${
        color === "white"
          ? "bg-white text-black"
          : color === "red"
          ? "bg-red-600"
          : color === "green"
          ? "bg-green-500"
          : ""
      }
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
