export type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "error" | "errorHover" | "detail" | "update" | "delete";
    className?: string;
    disabled?: boolean;
  };