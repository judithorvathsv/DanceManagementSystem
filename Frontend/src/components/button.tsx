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
    primary: "bg-prim hover:bg-prim-dark text-black",
    secondary: "bg-third hover:bg-third-dark text-black",
    error: "bg-error-dark hover:bg-error text-black" 
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
