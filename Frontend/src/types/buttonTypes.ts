export type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "error" | "errorHover" | "detail" | "update" | "delete" | "primaryDark";
    className?: string;
    disabled?: boolean;
  };