import React from "react";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactNode;
  className?: string;
}

const Button = (props: ButtonProps) => {
  const { children, className, ...divProps } = props;
  return (
    <div
      className={
        "w-max flex items-center gap-2 px-2 py-1 bg-purple-600 rounded font-bold text-white text-[14px] shadow-lg hover:text-purple-300 cursor-pointer " +
        className
      }
      {...divProps}
    >
      {children}
    </div>
  );
};

export default Button;
