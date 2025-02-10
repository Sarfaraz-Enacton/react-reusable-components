import { twMerge } from "tailwind-merge";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
const sizes = {
  lg: "text-2xl sm:text-3xl font-bold",
  md: "text-xl sm:text-2xl font-bold",
  sm: "text-xl font-medium",
  xs: "text-lg font-medium",
};
const Heading = ({
  className = "",
  title,
  as,
  size = "md",
}: {
  className?: string;
  title?: any;
  as?: HeadingLevel;
  size?: keyof typeof sizes;
}) => {
  const Tag = as || "h3";

  return <Tag className={twMerge(sizes[size], className)}>{title}</Tag>;
};

export default Heading;
