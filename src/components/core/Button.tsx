import React from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const base =
  "inline-flex items-center gap-2 rounded-lg transition duration-300 ease-in-out active:opacity-85";
const variants = {
  primary: "bg-gray-600 hover:bg-gray-800 text-gray-50 focus:outline-gray-600",
  outline:
    "bg-transparent text-gray-600 border border-gray-600 hover:bg-gray-800 hover:text-gray-50 focus:outline-gray-600",
};
const sizes = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-8 py-4 text-lg",
};

const Button = ({
  role,
  variant,
  label,
  size = "md",
  className = "",
  icon,
  iconRight,
  iconLeft,
  link,
  onClick,
  ...rest
}: {
  role: "button" | "link";
  variant: keyof typeof variants;
  label: any;
  size: keyof typeof sizes;
  className?: string;
  icon?: React.ReactNode;
  iconRight?: boolean;
  iconLeft?: boolean;
  link?: any;
  onClick?: any;
}) => {
  return (
    <>
      {role === "link" ? (
        <Link
          className={twMerge(
            base,
            sizes[size],
            variants[variant],
            iconRight ? "flex-row-reverse" : iconLeft ? "flex-row" : "",
            className,
          )}
          to={link || ""}
          {...rest}
        >
          {icon && icon}
          {label && label}
        </Link>
      ) : (
        <button
          className={twMerge(
            base,
            sizes[size],
            variants[variant],
            iconRight ? "flex-row-reverse" : iconLeft ? "flex-row" : "",
            className,
          )}
          onClick={onClick}
          {...rest}
        >
          {icon && icon}
          {label && label}
        </button>
      )}
    </>
  );
};

export default Button;
