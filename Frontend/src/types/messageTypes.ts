export type SuccessMessageProps = {
  message: string;
  duration?: number;
  onClose?: () => void;
}

export type ErrorMessageProps = {
  message?: string | Error | unknown;
  duration?: number;
  onClose?: () => void;
}
