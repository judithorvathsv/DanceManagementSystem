import { ButtonProps } from "../types/buttonTypes";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
}: ButtonProps) => {
  const baseStyle =
    "font-bold py-2 px-4 rounded transition duration-300 ease-in-out";

  const variantStyles = {
    primary: "bg-prim hover:bg-prim-dark text-black transition-colors duration-300",
    secondary: "bg-third hover:bg-third-dark text-black transition-colors duration-300",
    error: "bg-error-dark hover:bg-error text-black transition-colors duration-300",
    errorHover:"bg-transparent hover:bg-error border border-error text-error hover:text-black transition-colors duration-300",
    detail:"bg-transparent hover:bg-third-dark border border-third text-white hover:text-black transition-colors duration-300",
    delete: "bg-error-dark hover:bg-error text-white hover:text-black border border-error-dark transition-colors duration-300",
    update: "bg-main hover:bg-third text-white hover:text-black border border-black transition-colors duration-300",  
  };

  const disabledStyle = "opacity-50 cursor-not-allowed";

  const buttonStyle = `${baseStyle} ${variantStyles[variant]} ${disabled ? disabledStyle : ""} ${className}`;

  return (
    <button
      type={type}
      className={buttonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
