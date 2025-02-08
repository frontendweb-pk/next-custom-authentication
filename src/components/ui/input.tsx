import clsx from "clsx";
import { EyeClosed, EyeIcon } from "lucide-react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  dark?: boolean;
  error?: string[] | undefined;
  onClick?: () => void;
  isPassword?: boolean;
};

export default function Input({
  label,
  dark,
  error,
  type = "text",
  placeholder = "Enter value",
  onClick,
  isPassword,
  ...rest
}: InputProps) {
  return (
    <div>
      {label && <label>{label}</label>}
      <div
        className={clsx(
          "ring-1 ring-gray-200 bg-white pr-2 rounded-md hover:ring-indigo-800 flex",
          {
            "bg-gray-100": !dark,
            "bg-gray-900 text-white": dark,
            "ring-red-600 placeholder:text-red-600": error,
          }
        )}
      >
        <input
          className="p-2 w-full bg-transparent outline-none rounded-md "
          placeholder={placeholder}
          type={type}
          {...rest}
        />
        {isPassword && (
          <button type="button" onClick={onClick}>
            {type === "password" ? (
              <EyeClosed size={20} />
            ) : (
              <EyeIcon size={20} />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-red-600 text-xs ">{error}</p>}
    </div>
  );
}
