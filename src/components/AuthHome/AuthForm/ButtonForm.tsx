import { Button } from "../../../@/components/ui/button";
import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled: boolean;
}

const ButtonForm: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}) => {
  return (
    <div>
      <Button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={clsx(
          `flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outlinefocus-visible:outline-2 foucus-visible:outline-offset-2
               `,
          disabled && "opacity-50 cursor-default",
          fullWidth && "w-full",
          secondary ? "text-gray-900" : "text-white",
          danger &&
            "bg-rose-900 hover:bg-rose-600 focus-visible:outline-rose-600",
          !secondary &&
            !danger &&
            "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600"
        )}
      >
        {children}
      </Button>
    </div>
  );
};

export default ButtonForm;
